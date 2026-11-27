import { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../ui/Breadcrumbs';
import Reveal from '../ui/Reveal';
import { useTranslation } from '../../hooks/useTranslation';
import { serviceCategories } from '../../data/yamlLoader';
import { serviceGroups } from '../../data/serviceGroups';
import { HOTLINES } from '../../data/hotlines';

interface Category {
  category: string;
  slug: string;
  description: string;
  icon: string;
}

const YAKAP_PATH =
  '/services/health-services/access-free-check-ups-labs-and-medicines-through-philhealth-yakap';

/**
 * Services index: the ten categories in four groups, with a jump rail,
 * a featured service and a help card.
 */
export default function ServicesHub() {
  const { t, currentLanguage } = useTranslation();
  const isFil = currentLanguage === 'fil';
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const categories = serviceCategories.categories as Category[];

  const iconFor = (name: string) => {
    const Icon = LucideIcons[name as keyof typeof LucideIcons] as
      | React.ComponentType<{ className?: string }>
      | undefined;
    return Icon ? <Icon className="h-5 w-5" /> : null;
  };

  const groups = serviceGroups.map(g => ({
    ...g,
    items: g.slugs
      .map(slug => categories.find(c => c.slug === slug))
      .filter((c): c is Category => Boolean(c)),
  }));

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim())
      navigate(`/services?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <main className="flex-grow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        <Breadcrumbs />
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900">
              {isFil ? 'Mga Serbisyo' : 'Services'}
            </h1>
            <p className="mt-3 text-lg text-gray-600">
              {isFil
                ? 'Sampung serbisyo mula sa Munisipalidad ng Indang, pinagsama ayon sa kung ano ang nais mong gawin.'
                : 'Ten services from the Municipality of Indang, grouped by what you are trying to do.'}
            </p>
          </div>
          <form
            onSubmit={onSearch}
            className="flex w-full max-w-md items-center gap-2 rounded-full border border-line bg-white pl-5 pr-1.5 py-1.5"
          >
            <label htmlFor="services-q" className="sr-only">
              {isFil ? 'Maghanap ng serbisyo' : 'Search services'}
            </label>
            <input
              id="services-q"
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={
                isFil ? 'Maghanap ng serbisyo...' : 'Search for a service...'
              }
              className="flex-1 min-w-0 h-11 bg-transparent text-base outline-none placeholder-gray-500"
            />
            <button
              type="submit"
              className="h-11 px-6 rounded-full bg-primary-800 text-white text-sm font-semibold hover:bg-primary-700 transition-colors"
            >
              {isFil ? 'Maghanap' : 'Search'}
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid gap-10 lg:grid-cols-[14rem_1fr] items-start">
        <aside className="lg:sticky lg:top-44 space-y-4">
          <nav
            aria-label={isFil ? 'Mga grupo ng serbisyo' : 'Service groups'}
            className="rounded-3xl border border-line bg-white p-3"
          >
            <p className="px-3 py-2 text-xs font-semibold text-gray-600">
              {isFil ? 'Pumunta sa' : 'Jump to'}
            </p>
            <a
              href="#featured"
              className="block rounded-2xl bg-primary-50 px-3.5 py-3 text-sm font-semibold text-primary-800"
            >
              {isFil ? 'Tampok' : 'Featured'}
            </a>
            {groups.map(g => (
              <a
                key={g.id}
                href={`#${g.id}`}
                className="flex items-center justify-between gap-2 rounded-2xl px-3.5 py-3 text-sm text-gray-800 hover:bg-primary-50"
              >
                <span>{t(g.labelKey, g.label)}</span>
                <span className="text-xs text-gray-600">{g.items.length}</span>
              </a>
            ))}
          </nav>
          <div className="rounded-3xl bg-ink p-5 text-white">
            <p className="text-xs font-semibold text-sun">
              {isFil ? 'Kailangan ng tulong ngayon?' : 'Need help now?'}
            </p>
            <p className="mt-1 text-sm text-blue-100">
              {isFil
                ? 'Tumawag sa MDRRMO para sa emergency.'
                : 'Call MDRRMO for an emergency.'}
            </p>
            <a
              href={`tel:${HOTLINES[0].tel}`}
              className="mt-3 inline-flex min-h-11 items-center rounded-full bg-sun px-5 text-sm font-semibold text-ink"
            >
              {HOTLINES[0].number}
            </a>
          </div>
        </aside>

        <div className="space-y-12 min-w-0">
          <section id="featured" className="scroll-mt-44">
            <Link
              to={YAKAP_PATH}
              className="flex flex-wrap items-center gap-x-6 gap-y-3 rounded-3xl bg-success-50 px-7 py-5 text-success-900 hover:bg-success-100 transition-colors"
            >
              <span className="rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-success-700">
                {isFil ? 'Tampok' : 'Featured'}
              </span>
              <span className="flex-1 min-w-[16rem]">
                <strong className="block text-lg font-semibold">
                  PhilHealth YAKAP
                </strong>
                <span className="text-sm">
                  {isFil
                    ? 'Libreng check-up, hanggang 13 uri ng laboratory tests, at hanggang ₱20,000 na libreng gamot taun-taon.'
                    : 'Free check-ups, up to 13 types of laboratory tests, and up to ₱20,000 in free medicines every year.'}
                </span>
              </span>
              <span className="text-sm font-semibold text-success-700">
                {isFil ? 'Tingnan kung paano mag-avail' : 'See how to avail'} →
              </span>
            </Link>
          </section>

          {groups.map(g => (
            <section key={g.id} id={g.id} className="scroll-mt-44">
              <div className="flex items-baseline justify-between gap-3 border-b border-line pb-3">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                  {t(g.labelKey, g.label)}
                </h2>
                <span className="text-sm text-gray-600">
                  {g.items.length}{' '}
                  {isFil
                    ? 'serbisyo'
                    : g.items.length === 1
                      ? 'service'
                      : 'services'}
                </span>
              </div>
              <Reveal stagger className="mt-4 grid gap-3.5 md:grid-cols-2">
                {g.items.map(c => (
                  <Link
                    key={c.slug}
                    to={`/services/${c.slug}`}
                    className="flex items-start gap-4 rounded-3xl border border-line bg-white p-5 transition-colors hover:border-primary-300"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-800">
                      {iconFor(c.icon)}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-lg font-semibold leading-snug text-gray-900">
                        {t(`services.categories.${c.slug}.name`, c.category)}
                      </span>
                      <span className="mt-1 block text-sm text-gray-600">
                        {t(
                          `services.categories.${c.slug}.description`,
                          c.description
                        )}
                      </span>
                    </span>
                  </Link>
                ))}
              </Reveal>
            </section>
          ))}

          <section className="rounded-3xl bg-warning-50 p-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xl font-semibold text-gray-900">
                {isFil
                  ? 'Hindi mahanap ang kailangan mo?'
                  : "Can't find what you need?"}
              </p>
              <p className="text-gray-700">
                {isFil
                  ? 'Makipag-ugnayan sa Munisipyo, Lunes hanggang Biyernes, 8AM hanggang 5PM.'
                  : 'Contact the Municipal Hall, Monday to Friday, 8AM to 5PM.'}
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex min-h-12 items-center rounded-full bg-primary-800 px-7 text-sm font-semibold text-white hover:bg-primary-700"
            >
              {isFil ? 'Makipag-ugnayan' : 'Contact us'}
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}
