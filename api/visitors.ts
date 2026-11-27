/**
 * Vercel serverless function: GET /api/visitors
 *
 * Reads visit counts from the site's Google Analytics 4 property through the
 * GA4 Data API and returns them as JSON. The browser never sees credentials;
 * responses are cached at the edge for 24 hours so the API quota is not hit.
 *
 * Environment variables (set in Vercel, never committed):
 *   GA_PROPERTY_ID            Numeric GA4 property ID (not the G-XXXX tag)
 *   GA_SERVICE_ACCOUNT_JSON   Full JSON key of a service account that has
 *                             Viewer access on the property
 */
import { createSign } from 'node:crypto';

interface Req {
  method?: string;
}
interface Res {
  status: (code: number) => Res;
  setHeader: (name: string, value: string) => void;
  json: (body: unknown) => void;
}

const SCOPE = 'https://www.googleapis.com/auth/analytics.readonly';
const TOKEN_URL = 'https://oauth2.googleapis.com/token';
// Everything GA has recorded for the property, including pre-redesign data.
const ALL_TIME_START = '2015-08-14';

const b64url = (input: string | Buffer) =>
  Buffer.from(input).toString('base64url');

async function getAccessToken(clientEmail: string, privateKey: string) {
  const now = Math.floor(Date.now() / 1000);
  const unsigned = `${b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))}.${b64url(
    JSON.stringify({
      iss: clientEmail,
      scope: SCOPE,
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    })
  )}`;
  const signature = createSign('RSA-SHA256').update(unsigned).sign(privateKey);
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${unsigned}.${b64url(signature)}`,
    }),
  });
  if (!res.ok) throw new Error(`token ${res.status}`);
  return (await res.json()).access_token as string;
}

export default async function handler(req: Req, res: Res) {
  if (req.method && req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const propertyId = process.env.GA_PROPERTY_ID;
  const keyJson = process.env.GA_SERVICE_ACCOUNT_JSON;
  if (!propertyId || !keyJson) {
    res.status(503).json({ error: 'Visitor counter is not configured' });
    return;
  }

  try {
    const key = JSON.parse(keyJson) as {
      client_email: string;
      private_key: string;
    };
    const token = await getAccessToken(key.client_email, key.private_key);
    const report = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${encodeURIComponent(propertyId)}:runReport`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dateRanges: [
            { name: 'allTime', startDate: ALL_TIME_START, endDate: 'today' },
            { name: 'last30', startDate: '30daysAgo', endDate: 'today' },
          ],
          metrics: [{ name: 'sessions' }, { name: 'activeUsers' }],
        }),
      }
    );
    if (!report.ok) throw new Error(`report ${report.status}`);

    const data = (await report.json()) as {
      rows?: {
        dimensionValues?: { value: string }[];
        metricValues: { value: string }[];
      }[];
    };
    // With several date ranges GA adds a "dateRange" dimension to each row.
    const byRange: Record<string, { visits: number; visitors: number }> = {};
    for (const row of data.rows ?? []) {
      const name = row.dimensionValues?.[0]?.value ?? '';
      byRange[name] = {
        visits: Number(row.metricValues[0]?.value ?? 0),
        visitors: Number(row.metricValues[1]?.value ?? 0),
      };
    }

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=86400, stale-while-revalidate=604800'
    );
    res.status(200).json({
      allTime: byRange.allTime ?? { visits: 0, visitors: 0 },
      last30Days: byRange.last30 ?? { visits: 0, visitors: 0 },
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error('visitors api failed', err);
    res.status(502).json({ error: 'Could not load visitor count' });
  }
}
