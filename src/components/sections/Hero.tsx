import { useState, useRef, useEffect } from 'react';
import { Search, Phone, MapPin, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { serviceCategories, loadCategoryIndex } from '../../data/yamlLoader';
import { HOTLINES } from '../../data/hotlines';

interface SearchItem {
  id: string;
  name: string;
  slug: string;
  categorySlug: string;
  categoryName: string;
  type: 'service' | 'government' | 'tourism';
}

const YAKAP_PATH =
  '/services/health-services/access-free-check-ups-labs-and-medicines-through-philhealth-yakap';

const COMMON_REQUESTS = [
  {
    en: 'Free check-ups and medicines',
    fil: 'Libreng check-up at gamot',
    to: YAKAP_PATH,
  },
  {
    en: 'Business permits and clearances',
    fil: 'Permit at clearance sa negosyo',
    to: '/services/business',
  },
  {
    en: 'Help for seniors, PWDs, solo parents',
    fil: 'Tulong para sa senior, PWD, solo parent',
    to: '/services/social-welfare',
  },
  {
    en: 'Garbage collection schedules',
    fil: 'Iskedyul ng pangongolekta ng basura',
    to: '/services/garbage-waste-disposal',
  },
  {
    en: 'Report a damaged road',
    fil: 'Iulat ang sirang kalsada',
    to: '/services/infrastructure-public-works',
  },
  {
    en: 'Enroll in daycare or preschool',
    fil: 'Pag-enroll sa daycare o preschool',
    to: '/services/education',
  },
];

function highlight(text: string, query: string) {
  if (!query.trim()) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-yellow-200 text-gray-900 rounded px-0.5">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export default function Hero() {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [allSearchItems, setAllSearchItems] = useState<SearchItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { t, currentLanguage } = useTranslation('common');
  const isFil = currentLanguage === 'fil';

  useEffect(() => {
    const fetchAllData = async () => {
      const items: SearchItem[] = [];

      // 1. Fetch Services
      const serviceCats = serviceCategories.categories as {
        category: string;
        slug: string;
      }[];
      const serviceResults = await Promise.all(
        serviceCats.map(cat =>
          loadCategoryIndex(cat.slug).then(idx => ({
            cat,
            pages: idx.pages,
          }))
        )
      );

      for (const { cat, pages } of serviceResults) {
        for (const page of pages) {
          items.push({
            id: `service-${cat.slug}-${page.slug}`,
            name: page.name,
            slug: page.slug,
            categorySlug: cat.slug,
            categoryName: cat.category,
            type: 'service',
          });
        }
      }

      // 2. Fetch Government
      const govtCats = [
        { slug: 'departments', name: 'Departments' },
        { slug: 'legislative', name: 'Legislative' },
        { slug: 'reports-and-statistics', name: 'Reports & Stats' },
      ];
      const govtResults = await Promise.all(
        govtCats.map(cat =>
          loadCategoryIndex(cat.slug).then(idx => ({
            cat,
            pages: idx.pages,
          }))
        )
      );

      for (const { cat, pages } of govtResults) {
        for (const page of pages) {
          items.push({
            id: `govt-${cat.slug}-${page.slug}`,
            name: page.name,
            slug: page.slug,
            categorySlug: cat.slug,
            categoryName: cat.name,
            type: 'government',
          });
        }
      }

      // 3. Fetch Tourism (Static JSON)
      try {
        const tourismData =
          await import('../../../content/tourism/establishments.json');
        if (tourismData?.establishments) {
          for (const est of tourismData.establishments) {
            items.push({
              id: `tourism-${est.category}-${est.name.toLowerCase().replace(/\s+/g, '-')}`,
              name: est.name,
              slug: est.name.toLowerCase().replace(/\s+/g, '-'),
              categorySlug: est.category,
              categoryName: 'Tourism',
              type: 'tourism',
            });
          }
        }
      } catch (e) {
        console.warn('Failed to load tourism data for search', e);
      }

      setAllSearchItems(items);
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const results = query.trim()
    ? allSearchItems
        .filter(
          s =>
            s.name.toLowerCase().includes(query.toLowerCase()) ||
            s.categoryName.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 8)
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setShowDropdown(false);
      navigate(`/services?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSelect = (item: SearchItem) => {
    setShowDropdown(false);
    setQuery('');
    if (item.type === 'service') {
      navigate(`/services/${item.categorySlug}/${item.slug}`);
    } else if (item.type === 'government') {
      navigate(`/government/${item.categorySlug}/${item.slug}`);
    } else {
      navigate(`/tourism`);
    }
  };

  return (
    <div className="bg-ground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_24rem] gap-8 lg:gap-12 items-start">
          {/* Left: question, search, common requests */}
          <div>
            {import.meta.env.VITE_GOVERNMENT_NAME && (
              <p className="flex items-center gap-2.5 text-sm font-medium text-gray-600 mb-4">
                <span className="h-2.5 w-2.5 rounded-full bg-sun" aria-hidden />
                {import.meta.env.VITE_GOVERNMENT_NAME}
              </p>
            )}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] text-ink max-w-3xl mb-5">
              {t('hero.findTitle', 'What do you need from the municipality?')}
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mb-8">
              {t('hero.subtitle')}
            </p>

            <div className="relative max-w-2xl">
              <form
                onSubmit={handleSearch}
                className="flex items-center gap-2 rounded-full border border-line bg-white pl-6 pr-2 py-2 shadow-sm"
              >
                <Search
                  className="h-5 w-5 text-gray-400 shrink-0"
                  aria-hidden
                />
                <label htmlFor="hero-search" className="sr-only">
                  {t('hero.findService', 'Search Services')}
                </label>
                <input
                  id="hero-search"
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => {
                    setQuery(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  placeholder={t(
                    'hero.searchPlaceholder',
                    'Search for a service...'
                  )}
                  className="flex-1 min-w-0 h-11 bg-transparent text-base text-gray-900 placeholder-gray-500 outline-none"
                />
                <button
                  type="submit"
                  className="h-12 px-7 rounded-full bg-primary-800 text-white text-sm font-semibold hover:bg-primary-700 transition-colors"
                >
                  {isFil ? 'Maghanap' : 'Search'}
                </button>
              </form>

              {showDropdown && results.length > 0 && (
                <div
                  ref={dropdownRef}
                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-line rounded-3xl shadow-xl z-50 overflow-hidden p-2"
                >
                  {results.map(item => (
                    <button
                      key={item.id}
                      onMouseDown={e => {
                        e.preventDefault();
                        handleSelect(item);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm rounded-2xl hover:bg-primary-50 transition-colors flex items-center gap-2"
                    >
                      <Search className="h-3.5 w-3.5 text-primary-400 shrink-0" />
                      <div className="flex flex-col flex-1 leading-tight">
                        <span className="text-gray-800 font-medium">
                          {highlight(item.name, query)}
                        </span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider">
                          {item.categoryName}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
                          item.type === 'service'
                            ? 'bg-blue-100 text-blue-800'
                            : item.type === 'government'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {item.type}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <p className="mt-7 mb-2.5 text-sm font-semibold text-gray-600">
              {isFil ? 'Mga karaniwang hiling' : 'Common requests'}
            </p>
            <div className="flex flex-wrap gap-2.5 max-w-3xl">
              {COMMON_REQUESTS.map(r => (
                <Link
                  key={r.en}
                  to={r.to}
                  className="inline-flex items-center min-h-11 px-4 rounded-full border border-line bg-white text-sm font-medium text-gray-800 hover:border-primary-300 hover:bg-primary-50 transition-colors"
                >
                  {isFil ? r.fil : r.en}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: emergency card */}
          <aside className="rounded-3xl bg-ink text-white p-7">
            <p className="text-xs font-semibold text-sun">
              {isFil ? 'Kailangan ng tulong ngayon?' : 'Need help now?'}
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight leading-tight">
              {t('navbar.emergencyHotlines', 'Emergency Hotlines')}
            </h2>
            <ul className="mt-4">
              {HOTLINES.map(h => (
                <li key={h.labelKey} className="border-t border-white/15">
                  <a
                    href={`tel:${h.tel}`}
                    className="flex min-h-13 items-center justify-between gap-3 text-sm hover:underline"
                  >
                    <span className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 text-sun" aria-hidden />
                      {t(h.labelKey)}
                    </span>
                    <strong className="font-semibold">{h.number}</strong>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-3 border-t border-white/15 pt-4 text-sm text-blue-100 space-y-1.5">
              <p className="flex items-start gap-2">
                <MapPin
                  className="h-4 w-4 mt-0.5 shrink-0 text-sun"
                  aria-hidden
                />
                A. Mojica St., Poblacion 3, Indang
              </p>
              <p className="flex items-start gap-2">
                <Clock
                  className="h-4 w-4 mt-0.5 shrink-0 text-sun"
                  aria-hidden
                />
                {isFil ? 'Lun–Biy, 8AM–5PM' : 'Mon–Fri, 8AM–5PM'}
              </p>
              <Link
                to="/contact"
                className="inline-block pt-1 font-semibold text-white underline underline-offset-4"
              >
                {isFil ? 'Makipag-ugnayan' : 'Contact the municipality'} →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
