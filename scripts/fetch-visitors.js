/**
 * Build-time visit counter snapshot.
 *
 * Reads visit counts from the site's Google Analytics 4 property (GA4 Data
 * API) and writes public/visitors.json, which the footer displays. Runs at the
 * start of `npm run build`, so the figure refreshes whenever the site is
 * rebuilt (see docs/DEPLOYMENT-GUIDE.md for a daily rebuild).
 *
 * Environment variables (set in the hosting build settings, never committed;
 * do not prefix with VITE_ or they would be exposed to browsers):
 *   GA_PROPERTY_ID            Numeric GA4 property ID (not the G-XXXX tag)
 *   GA_SERVICE_ACCOUNT_JSON   Full JSON key of a service account with Viewer
 *                             access on the property
 *
 * This script never fails the build: without credentials, or if Google
 * returns an error, it removes any stale file and exits 0, and the footer
 * simply hides the counter.
 */
import { createSign } from 'node:crypto';
import { rmSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../public/visitors.json'
);
const SCOPE = 'https://www.googleapis.com/auth/analytics.readonly';
const TOKEN_URL = 'https://oauth2.googleapis.com/token';
// Everything GA has recorded for the property, including older data.
const ALL_TIME_START = '2015-08-14';

const b64url = input => Buffer.from(input).toString('base64url');

async function getAccessToken(clientEmail, privateKey) {
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
  if (!res.ok) throw new Error(`token request failed (${res.status})`);
  return (await res.json()).access_token;
}

async function main() {
  const propertyId = process.env.GA_PROPERTY_ID;
  const keyJson = process.env.GA_SERVICE_ACCOUNT_JSON;
  rmSync(OUT, { force: true });
  if (!propertyId || !keyJson) {
    console.log('[visitors] GA credentials not set, skipping counter.');
    return;
  }

  const key = JSON.parse(keyJson);
  const token = await getAccessToken(key.client_email, key.private_key);
  const res = await fetch(
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
  if (!res.ok) throw new Error(`report request failed (${res.status})`);

  const data = await res.json();
  // With several date ranges GA adds a "dateRange" dimension to each row.
  const byRange = {};
  for (const row of data.rows ?? []) {
    byRange[row.dimensionValues?.[0]?.value ?? ''] = {
      visits: Number(row.metricValues?.[0]?.value ?? 0),
      visitors: Number(row.metricValues?.[1]?.value ?? 0),
    };
  }
  const empty = { visits: 0, visitors: 0 };
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(
    OUT,
    JSON.stringify({
      allTime: byRange.allTime ?? empty,
      last30Days: byRange.last30 ?? empty,
      updatedAt: new Date().toISOString(),
    })
  );
  console.log('[visitors] wrote public/visitors.json');
}

main().catch(err => {
  // Log the reason only, never credentials.
  console.warn(`[visitors] skipped: ${err.message}`);
  rmSync(OUT, { force: true });
});
