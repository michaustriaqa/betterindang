import yaml from 'js-yaml';
import announcementsYaml from '../../content/updates/announcements.yaml?raw';
import eventsYaml from '../../content/updates/events.yaml?raw';

export type UpdateSource =
  | 'lgu'
  | 'mdrrmo'
  | 'police'
  | 'rhu'
  | 'water'
  | 'other';

export const SOURCES: Record<
  UpdateSource,
  { label: string; labelFil: string; short: string }
> = {
  lgu: { label: 'LGU Indang', labelFil: 'LGU Indang', short: 'LGU' },
  mdrrmo: { label: 'MDRRMO', labelFil: 'MDRRMO', short: 'DRR' },
  police: { label: 'Police', labelFil: 'Pulisya', short: 'PNP' },
  rhu: {
    label: 'Rural Health Unit',
    labelFil: 'Rural Health Unit',
    short: 'RHU',
  },
  water: {
    label: 'Water District',
    labelFil: 'Distrito ng Tubig',
    short: 'WD',
  },
  other: { label: 'Other', labelFil: 'Iba pa', short: '...' },
};

export const ANNOUNCEMENT_CATEGORIES: Record<
  string,
  { label: string; labelFil: string }
> = {
  advisory: { label: 'Advisory', labelFil: 'Paalala' },
  traffic: { label: 'Traffic & roads', labelFil: 'Trapiko at kalsada' },
  health: { label: 'Health', labelFil: 'Kalusugan' },
  'water-power': { label: 'Water & power', labelFil: 'Tubig at kuryente' },
  safety: { label: 'Safety', labelFil: 'Kaligtasan' },
  program: { label: 'Program', labelFil: 'Programa' },
  festival: { label: 'Festival', labelFil: 'Pista' },
};

export interface Announcement {
  id: string;
  source: UpdateSource;
  category: string;
  urgent?: boolean;
  relayedBy?: 'office' | 'volunteer';
  postedAt: string;
  addedAt?: string;
  url: string;
  title: string;
  titleFil?: string;
  summary?: string;
  summaryFil?: string;
}

export interface EventItem {
  id: string;
  source: UpdateSource;
  category: string;
  relayedBy?: 'office' | 'volunteer';
  start: string;
  end?: string;
  place?: string;
  url: string;
  title: string;
  titleFil?: string;
  summary?: string;
  summaryFil?: string;
}

/** Parse a YAML file with a top-level `items` list. Bad input gives []. */
function parseItems<T>(raw: string): T[] {
  try {
    const doc = yaml.load(raw) as { items?: unknown } | null;
    return Array.isArray(doc?.items) ? (doc.items as T[]) : [];
  } catch {
    return [];
  }
}

const isHttpUrl = (u: unknown): u is string =>
  typeof u === 'string' && /^https?:\/\//i.test(u);

/** Entries without a working link to the original post are never shown. */
export function loadAnnouncements(): Announcement[] {
  return parseItems<Announcement>(announcementsYaml)
    .filter(a => a && a.title && a.postedAt && isHttpUrl(a.url))
    .sort((a, b) => String(b.postedAt).localeCompare(String(a.postedAt)));
}

export function loadEvents(): EventItem[] {
  return parseItems<EventItem>(eventsYaml)
    .filter(e => e && e.title && e.start && isHttpUrl(e.url))
    .sort((a, b) => String(a.start).localeCompare(String(b.start)));
}

/** YAML dates may parse as Date objects; normalise to YYYY-MM-DD. */
export function toDateKey(value: string | Date): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).slice(0, 10);
}

export function daysSince(dateKey: string, now = new Date()): number {
  const then = new Date(`${toDateKey(dateKey)}T00:00:00`);
  return Math.floor((now.getTime() - then.getTime()) / 86_400_000);
}
