import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import AddViaEmail from '../components/ui/AddViaEmail';
import { useTranslation } from '../hooks/useTranslation';
import { cn } from '../lib/utils';
import {
  SOURCES,
  loadEvents,
  toDateKey,
  type EventItem,
  type UpdateSource,
} from '../data/updates';

const pad = (n: number) => String(n).padStart(2, '0');
const keyOf = (y: number, m: number, d: number) =>
  `${y}-${pad(m + 1)}-${pad(d)}`;

/** Build a calendar file the visitor can import into any calendar app. */
function downloadIcs(events: EventItem[]) {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//BetterIndang//Events//EN',
    ...events.flatMap(e => {
      const start = toDateKey(e.start).replace(/-/g, '');
      // ICS all-day end dates are exclusive, so add a day.
      const endDate = new Date(`${toDateKey(e.end ?? e.start)}T00:00:00Z`);
      endDate.setUTCDate(endDate.getUTCDate() + 1);
      const end = endDate.toISOString().slice(0, 10).replace(/-/g, '');
      return [
        'BEGIN:VEVENT',
        `UID:${e.id}@betterindang.org`,
        `DTSTAMP:${new Date().toISOString().replace(/[-:]|\.\d{3}/g, '')}`,
        `DTSTART;VALUE=DATE:${start}`,
        `DTEND;VALUE=DATE:${end}`,
        `SUMMARY:${e.title.replace(/[,;\\]/g, ' ')}`,
        ...(e.place ? [`LOCATION:${e.place.replace(/[,;\\]/g, ' ')}`] : []),
        `URL:${e.url}`,
        'END:VEVENT',
      ];
    }),
    'END:VCALENDAR',
  ];
  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'indang-events.ics';
  a.click();
  URL.revokeObjectURL(a.href);
}

export default function EventsCalendar() {
  const { currentLanguage } = useTranslation();
  const isFil = currentLanguage === 'fil';
  const locale = isFil ? 'fil-PH' : 'en-PH';
  const all = useMemo(() => loadEvents(), []);
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [view, setView] = useState<'month' | 'list'>('month');
  const [source, setSource] = useState<UpdateSource | 'all'>('all');

  const events = all.filter(e => source === 'all' || e.source === source);

  const move = (delta: number) => {
    const d = new Date(year, month + delta, 1);
    setYear(d.getFullYear());
    setMonth(d.getMonth());
  };

  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const eventsOn = (d: number) => {
    const k = keyOf(year, month, d);
    return events.filter(
      e => toDateKey(e.start) <= k && k <= toDateKey(e.end ?? e.start)
    );
  };

  const monthLabel = new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
  }).format(new Date(year, month, 1));
  const weekdays = Array.from({ length: 7 }, (_, i) =>
    new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(
      new Date(2026, 0, 4 + i)
    )
  );

  const upcoming = events
    .filter(
      e =>
        toDateKey(e.end ?? e.start) >=
        keyOf(today.getFullYear(), today.getMonth(), today.getDate())
    )
    .slice(0, 5);

  const chip = (active: boolean) =>
    cn(
      'inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-colors',
      active
        ? 'bg-primary-800 text-white'
        : 'bg-white border border-line text-gray-700 hover:bg-gray-50'
    );

  const title = isFil ? 'Kalendaryo ng mga Kaganapan' : 'Events Calendar';
  const text = (e: EventItem) => (isFil && e.titleFil ? e.titleFil : e.title);

  return (
    <>
      <SEO
        title={title}
        description={
          isFil
            ? 'Mga pista, misyong pangkalusugan, drill, at pagkaantala ng serbisyo sa Indang.'
            : 'Festivals, health missions, drills and service interruptions in Indang.'
        }
        keywords="Indang events, calendar, festival, Irok Festival, Indang Day"
      />
      <main className="flex-grow bg-ground">
        <div className="bg-white border-b border-line">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900">
                {title}
              </h1>
              <p className="mt-3 text-lg text-gray-600">
                {isFil
                  ? 'Mga pista, misyong pangkalusugan, drill, at pagkaantala ng serbisyo mula sa mga tanggapan ng Indang, may link sa orihinal na post.'
                  : "Festivals, health missions, drills and service interruptions from Indang's offices, each linked to its original post."}
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                disabled={events.length === 0}
                onClick={() => downloadIcs(events)}
                className="inline-flex items-center min-h-12 px-6 rounded-full bg-white border border-line text-sm font-semibold text-gray-900 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isFil
                  ? 'Idagdag sa aking kalendaryo (.ics)'
                  : 'Add to my calendar (.ics)'}
              </button>
              <AddViaEmail kind="event" />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_21rem] items-start">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-gray-600 mr-1">
                {isFil ? 'Ipakita' : 'Show'}
              </span>
              <button
                type="button"
                onClick={() => setSource('all')}
                className={chip(source === 'all')}
              >
                {isFil ? 'Lahat' : 'All'}
              </button>
              {(Object.keys(SOURCES) as UpdateSource[])
                .filter(s => s !== 'other')
                .map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSource(s)}
                    className={chip(source === s)}
                  >
                    <span
                      aria-hidden
                      className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary-800 text-[8px] font-bold text-accent-300"
                    >
                      {SOURCES[s].short}
                    </span>
                    {isFil ? SOURCES[s].labelFil : SOURCES[s].label}
                  </button>
                ))}
            </div>

            <div className="mt-5 rounded-3xl border border-line bg-white p-5">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label={isFil ? 'Nakaraang buwan' : 'Previous month'}
                    onClick={() => move(-1)}
                    className="h-11 w-11 rounded-full border border-line flex items-center justify-center hover:bg-gray-50"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden />
                  </button>
                  <div className="min-w-44 text-center text-xl font-bold tracking-tight">
                    {monthLabel}
                  </div>
                  <button
                    type="button"
                    aria-label={isFil ? 'Susunod na buwan' : 'Next month'}
                    onClick={() => move(1)}
                    className="h-11 w-11 rounded-full border border-line flex items-center justify-center hover:bg-gray-50"
                  >
                    <ChevronRight className="h-4 w-4" aria-hidden />
                  </button>
                </div>
                <div
                  role="group"
                  aria-label={isFil ? 'Tingin' : 'View'}
                  className="flex rounded-full bg-gray-100 p-1"
                >
                  {(['month', 'list'] as const).map(v => (
                    <button
                      key={v}
                      type="button"
                      aria-pressed={view === v}
                      onClick={() => setView(v)}
                      className={cn(
                        'min-h-10 min-w-20 rounded-full px-4 text-sm font-semibold',
                        view === v
                          ? 'bg-primary-800 text-white'
                          : 'text-gray-900'
                      )}
                    >
                      {v === 'month'
                        ? isFil
                          ? 'Buwan'
                          : 'Month'
                        : isFil
                          ? 'Listahan'
                          : 'List'}
                    </button>
                  ))}
                </div>
              </div>

              {view === 'month' ? (
                <div className="overflow-x-auto">
                  <div className="min-w-[40rem]">
                    <div className="grid grid-cols-7 gap-1.5 pb-1.5">
                      {weekdays.map(w => (
                        <div
                          key={w}
                          className="px-2 py-1.5 text-xs font-semibold text-gray-600"
                        >
                          {w}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1.5">
                      {cells.map((d, i) => {
                        if (d === null)
                          return (
                            <div
                              key={i}
                              className="min-h-28 rounded-2xl bg-gray-50"
                            />
                          );
                        const isToday =
                          d === today.getDate() &&
                          month === today.getMonth() &&
                          year === today.getFullYear();
                        const list = eventsOn(d);
                        return (
                          <div
                            key={i}
                            className={cn(
                              'min-h-28 rounded-2xl border bg-white p-2 overflow-hidden',
                              isToday
                                ? 'border-accent-300 ring-2 ring-accent-300'
                                : 'border-line'
                            )}
                          >
                            <div
                              className={cn(
                                'text-sm font-semibold',
                                isToday && 'text-primary-800'
                              )}
                            >
                              {d}
                            </div>
                            {list.map(e => (
                              <a
                                key={e.id}
                                href={e.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-1 flex items-center gap-1 rounded-lg bg-primary-50 px-1.5 py-1 text-[11px] font-semibold leading-tight text-primary-800"
                              >
                                <span className="shrink-0 rounded bg-primary-800 px-1 text-[9px] text-accent-300">
                                  {SOURCES[e.source]?.short ?? '...'}
                                </span>
                                <span className="truncate">{text(e)}</span>
                              </a>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {events.length === 0 && (
                    <li className="py-6 text-sm text-gray-600">
                      {isFil ? 'Wala pang kaganapan.' : 'No events yet.'}
                    </li>
                  )}
                  {events.map(e => (
                    <li key={e.id} className="py-3.5">
                      <a
                        href={e.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-gray-900 hover:underline"
                      >
                        {text(e)}
                      </a>
                      <p className="text-sm text-gray-600">
                        {toDateKey(e.start)}
                        {e.end &&
                          e.end !== e.start &&
                          ` – ${toDateKey(e.end)}`}{' '}
                        ·{' '}
                        {isFil
                          ? SOURCES[e.source].labelFil
                          : SOURCES[e.source].label}
                        {e.place && ` · ${e.place}`}
                      </p>
                    </li>
                  ))}
                </ul>
              )}

              {all.length === 0 && (
                <p className="mt-4 rounded-2xl bg-gray-50 p-4 text-sm text-gray-600">
                  {isFil
                    ? 'Wala pang naidagdag na kaganapan. Para sa mga pista at balita, bisitahin ang Facebook page ng LGU Indang.'
                    : 'No events have been added yet. For festivals and news, visit the LGU Indang Facebook page.'}
                </p>
              )}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-line bg-white p-5">
              <h2 className="text-lg font-bold text-gray-900">
                {isFil ? 'Susunod na mga kaganapan' : 'Coming up'}
              </h2>
              {upcoming.length === 0 ? (
                <p className="mt-2 text-sm text-gray-600">
                  {isFil
                    ? 'Walang paparating na kaganapan.'
                    : 'No upcoming events.'}
                </p>
              ) : (
                <ul className="mt-2 divide-y divide-gray-100">
                  {upcoming.map(e => (
                    <li key={e.id} className="py-3">
                      <a
                        href={e.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-gray-900 hover:underline"
                      >
                        {text(e)}
                      </a>
                      <p className="text-xs text-gray-600">
                        {toDateKey(e.start)} ·{' '}
                        {isFil
                          ? SOURCES[e.source].labelFil
                          : SOURCES[e.source].label}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="rounded-3xl bg-primary-50 p-5">
              <h2 className="text-base font-bold text-gray-900">
                {isFil ? 'May alam kang kaganapan?' : 'Know about an event?'}
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                {isFil
                  ? 'Maaaring idagdag ito ng mga kawani ng tanggapan at boluntaryo kasama ang link sa orihinal na post.'
                  : 'Agency staff and volunteers can add it with a link to the original post.'}
              </p>
              <div className="mt-3">
                <AddViaEmail kind="event" />
              </div>
            </div>
            <Link
              to="/announcements"
              className="block rounded-3xl border border-line bg-white p-5 text-sm font-semibold text-primary-700 hover:underline"
            >
              {isFil
                ? 'Tingnan ang mga balita at anunsiyo →'
                : 'See news & announcements →'}
            </Link>
          </aside>
        </div>
      </main>
    </>
  );
}
