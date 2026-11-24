import { useMemo, useState } from 'react';
import { ExternalLink, Megaphone, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Reveal from '../components/ui/Reveal';
import AddViaEmail from '../components/ui/AddViaEmail';
import { useTranslation } from '../hooks/useTranslation';
import { cn } from '../lib/utils';
import {
  ANNOUNCEMENT_CATEGORIES,
  SOURCES,
  daysSince,
  loadAnnouncements,
  toDateKey,
  type UpdateSource,
} from '../data/updates';

const FACEBOOK_URL = 'https://www.facebook.com/LGUIndangCavite';

export default function Announcements() {
  const { currentLanguage } = useTranslation();
  const isFil = currentLanguage === 'fil';
  const all = useMemo(() => loadAnnouncements(), []);
  const [query, setQuery] = useState('');
  const [source, setSource] = useState<UpdateSource | 'all'>('all');
  const [category, setCategory] = useState<string>('all');

  const urgent = all.find(a => a.urgent && daysSince(a.postedAt) <= 1);

  const items = all.filter(a => {
    if (source !== 'all' && a.source !== source) return false;
    if (category !== 'all' && a.category !== category) return false;
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return [a.title, a.titleFil, a.summary, a.summaryFil]
      .filter(Boolean)
      .some(s => String(s).toLowerCase().includes(q));
  });

  const chip = (active: boolean) =>
    cn(
      'px-4 py-2.5 rounded-full text-sm font-medium transition-colors',
      active
        ? 'bg-primary-800 text-white'
        : 'bg-white border border-line text-gray-700 hover:bg-gray-50'
    );

  const title = isFil ? 'Balita at Anunsiyo' : 'News & Announcements';

  return (
    <>
      <SEO
        title={title}
        description={
          isFil
            ? 'Mga paalala at balita mula sa mga tanggapan ng Indang, may link sa orihinal na post.'
            : 'Advisories and updates from Indang offices, each linked to the original post.'
        }
        keywords="Indang announcements, advisories, class suspension, MDRRMO, news"
      />
      <main className="flex-grow bg-ground">
        <div className="bg-white border-b border-line">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900">
                  {title}
                </h1>
                <p className="mt-3 text-lg text-gray-600">
                  {isFil
                    ? 'Mga paalala at balita mula sa mga tanggapan ng Indang, kinalap mula sa kanilang opisyal na Facebook page. May link sa orihinal na post ang bawat item.'
                    : "Advisories and updates from Indang's offices, collected from their official Facebook pages. Every item links to the original post."}
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <Link
                  to="/calendar"
                  className="inline-flex items-center min-h-12 px-6 rounded-full bg-white border border-line text-sm font-semibold text-gray-900 hover:bg-gray-50"
                >
                  {isFil ? 'Kalendaryo ng kaganapan' : 'Events calendar'}
                </Link>
                <AddViaEmail kind="announcement" />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid gap-8 lg:grid-cols-[1fr_20rem] items-start">
          <div>
            {urgent && (
              <div className="mb-6 rounded-3xl border border-red-200 bg-red-50 p-5 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-red-800 px-3.5 py-1.5 text-xs font-bold text-white">
                  {isFil ? 'Madalian' : 'Urgent'}
                </span>
                <div className="flex-1 min-w-[16rem]">
                  <p className="font-bold text-red-950">
                    {isFil && urgent.titleFil ? urgent.titleFil : urgent.title}
                  </p>
                  <p className="text-sm text-red-900">
                    {isFil
                      ? SOURCES[urgent.source].labelFil
                      : SOURCES[urgent.source].label}
                  </p>
                </div>
                <a
                  href={urgent.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center min-h-11 px-5 rounded-full bg-red-800 text-white text-sm font-semibold"
                >
                  {isFil
                    ? 'Buksan ang orihinal na post'
                    : 'Open the original post'}
                </a>
              </div>
            )}

            <form
              onSubmit={e => e.preventDefault()}
              className="flex items-center gap-2 rounded-full border border-line bg-white pl-5 pr-1.5 py-1.5"
            >
              <Search className="h-4 w-4 text-gray-400 shrink-0" aria-hidden />
              <label htmlFor="announce-q" className="sr-only">
                {isFil ? 'Maghanap ng anunsiyo' : 'Search announcements'}
              </label>
              <input
                id="announce-q"
                type="search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={
                  isFil ? 'Maghanap ng anunsiyo...' : 'Search announcements...'
                }
                className="flex-1 min-w-0 h-11 bg-transparent outline-none text-base"
              />
            </form>

            <p className="mt-5 text-xs font-semibold text-gray-600">
              {isFil ? 'Pinagmulan' : 'Source'}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
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
                    {isFil ? SOURCES[s].labelFil : SOURCES[s].label}
                  </button>
                ))}
            </div>

            <p className="mt-4 text-xs font-semibold text-gray-600">
              {isFil ? 'Uri' : 'Type'}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setCategory('all')}
                className={chip(category === 'all')}
              >
                {isFil ? 'Lahat' : 'All'}
              </button>
              {Object.entries(ANNOUNCEMENT_CATEGORIES).map(([key, c]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setCategory(key)}
                  className={chip(category === key)}
                >
                  {isFil ? c.labelFil : c.label}
                </button>
              ))}
            </div>

            <Reveal stagger className="mt-6 space-y-3.5">
              {items.map(a => {
                const stale = daysSince(a.postedAt) > 7;
                const cat = ANNOUNCEMENT_CATEGORIES[a.category];
                const src = SOURCES[a.source] ?? SOURCES.other;
                return (
                  <article
                    key={a.id}
                    className="rounded-3xl border border-line bg-white p-6"
                  >
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                      <span className="inline-flex items-center gap-2 text-sm">
                        <span
                          aria-hidden
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary-800 text-[10px] font-bold text-accent-300"
                        >
                          {src.short}
                        </span>
                        {isFil ? src.labelFil : src.label}
                      </span>
                      {cat && (
                        <span className="rounded-full bg-primary-50 px-2.5 py-1 text-primary-800">
                          {isFil ? cat.labelFil : cat.label}
                        </span>
                      )}
                      {stale && (
                        <span className="rounded-full bg-warning-100 px-2.5 py-1 text-warning-900">
                          {isFil
                            ? 'Mahigit 7 araw na: tingnan ang orihinal'
                            : 'Older than 7 days: check the original'}
                        </span>
                      )}
                      {a.relayedBy === 'volunteer' && (
                        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-gray-600">
                          {isFil
                            ? 'Ibinahagi ng boluntaryo'
                            : 'Relayed by a volunteer'}
                        </span>
                      )}
                    </div>
                    <h2 className="mt-3 text-xl font-semibold tracking-tight text-gray-900">
                      {isFil && a.titleFil ? a.titleFil : a.title}
                    </h2>
                    {(isFil && a.summaryFil ? a.summaryFil : a.summary) && (
                      <p className="mt-1.5 text-gray-600">
                        {isFil && a.summaryFil ? a.summaryFil : a.summary}
                      </p>
                    )}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs text-gray-600">
                        {isFil ? 'Ipinost' : 'Posted'} {toDateKey(a.postedAt)}
                        {a.addedAt &&
                          ` · ${isFil ? 'idinagdag' : 'added'} ${toDateKey(a.addedAt)}`}
                      </span>
                      <a
                        href={a.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 min-h-11 text-sm font-semibold text-primary-700 hover:underline"
                      >
                        {isFil
                          ? 'Basahin ang orihinal sa Facebook'
                          : 'Read the original on Facebook'}
                        <ExternalLink className="h-4 w-4" aria-hidden />
                      </a>
                    </div>
                  </article>
                );
              })}
            </Reveal>

            {items.length === 0 && (
              <div className="mt-6 rounded-3xl border border-dashed border-gray-300 bg-white p-10 text-center">
                <Megaphone
                  className="mx-auto h-8 w-8 text-primary-700"
                  aria-hidden
                />
                <p className="mt-3 font-semibold text-gray-900">
                  {all.length === 0
                    ? isFil
                      ? 'Wala pang anunsiyo dito'
                      : 'No announcements here yet'
                    : isFil
                      ? 'Walang tugma sa iyong mga filter'
                      : 'Nothing matches your filters'}
                </p>
                <p className="mt-1 text-sm text-gray-600 max-w-md mx-auto">
                  {isFil
                    ? 'Para sa pinakabagong balita, bisitahin ang opisyal na Facebook page ng LGU Indang.'
                    : 'For the latest news, visit the official LGU Indang Facebook page.'}
                </p>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center min-h-11 px-5 rounded-full bg-primary-800 text-white text-sm font-semibold"
                >
                  {isFil
                    ? 'Buksan ang Facebook page'
                    : 'Open the Facebook page'}
                </a>
              </div>
            )}
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-line bg-white p-5">
              <h2 className="text-lg font-bold text-gray-900">
                {isFil ? 'Mga opisyal na page' : 'Official pages'}
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                {isFil
                  ? 'Sundan ang pinagmulan para sa real-time na balita.'
                  : 'Follow the source for real-time updates.'}
              </p>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex min-h-12 items-center justify-between border-t border-line text-sm font-medium text-gray-900 hover:underline"
              >
                LGU Indang
                <span className="text-xs text-gray-600">Facebook</span>
              </a>
            </div>
            <div className="rounded-3xl bg-warning-50 p-5">
              <h2 className="text-lg font-bold text-gray-900">
                {isFil ? 'Paano ito gumagana' : 'How this works'}
              </h2>
              <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm text-gray-700">
                <li>
                  {isFil
                    ? 'Magpapadala ang tanggapan o boluntaryo ng mga pangunahing detalye at link.'
                    : 'An office or volunteer sends the key facts and a link.'}
                </li>
                <li>
                  {isFil
                    ? 'Sinusuri ng tagasuri ito laban sa orihinal na post.'
                    : 'A reviewer checks it against the original post.'}
                </li>
                <li>
                  {isFil
                    ? 'Lalabas ito rito kasama ang pinagmulan at mga petsa.'
                    : 'It appears here with its source and dates.'}
                </li>
              </ol>
              <div className="mt-4">
                <AddViaEmail kind="announcement" />
              </div>
            </div>
            <p className="rounded-3xl border border-line bg-white p-5 text-sm text-gray-600">
              <strong className="font-semibold text-gray-900">
                {isFil
                  ? 'Pinapatakbo ng komunidad ang BetterIndang.'
                  : 'BetterIndang is community-run.'}
              </strong>{' '}
              {isFil
                ? 'Hindi ito opisyal na website ng pamahalaan. Sa emergency, tawagan ang mga hotline.'
                : 'It is not an official government website. In an emergency, call the hotlines.'}
            </p>
          </aside>
        </div>
      </main>
    </>
  );
}
