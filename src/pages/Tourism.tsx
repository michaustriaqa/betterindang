import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Facebook,
  Waves,
  Utensils,
  Landmark,
  Tractor,
  BedDouble,
  Search,
  ExternalLink,
  Tent,
  Wheat,
  Droplets,
  Star,
  ChevronRight,
} from 'lucide-react';
import SEO from '../components/SEO';
import { useScrollReveal } from '../hooks/useScrollReveal';
import establishmentsData from '../../content/tourism/establishments.json';

interface Establishment {
  name: string;
  category: string;
  address?: string;
  contact?: string;
  facebook?: string;
  description?: string;
  tags?: string[];
}

interface Category {
  id: string;
  label: string;
  icon: string;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Waves,
  Utensils,
  Landmark,
  Tractor,
  BedDouble,
  MapPin,
};

const CATEGORY_COLORS: Record<string, { pill: string }> = {
  heritage: { pill: 'bg-amber-100 text-amber-700' },
  resorts: { pill: 'bg-blue-100 text-blue-700' },
  farms: { pill: 'bg-green-100 text-green-700' },
  events: { pill: 'bg-purple-100 text-purple-700' },
  restaurants: { pill: 'bg-orange-100 text-orange-700' },
  adventure: { pill: 'bg-red-100 text-red-700' },
  others: { pill: 'bg-gray-100 text-gray-600' },
};

const CULTURE_HIGHLIGHTS = [
  {
    icon: Landmark,
    color: 'bg-amber-50 border-amber-200 text-amber-800',
    iconColor: 'bg-amber-100 text-amber-700',
    title: 'Historical Identity',
    subtitle: '"Walang Tinag" — Immovable',
    body: 'Indang was a Katipunan stronghold during the Philippine Revolution. Andres Bonifacio was arrested in Barangay Limbon in April 1897. Established as an independent municipality in 1655.',
  },
  {
    icon: Landmark,
    color: 'bg-stone-50 border-stone-200 text-stone-800',
    iconColor: 'bg-stone-100 text-stone-700',
    title: 'Heritage & Architecture',
    subtitle: 'Churches · Museum · Chapels',
    body: 'St. Gregory the Great Parish (est. 1611), St. Vincent Ferrer Parish, Seven Archangels Chapel, and the Indang Community Museum preserving artifacts and revolutionary documents.',
  },
  {
    icon: Tent,
    color: 'bg-green-50 border-green-200 text-green-800',
    iconColor: 'bg-green-100 text-green-700',
    title: 'Culture & Weaving',
    subtitle: 'MKC Weavers · Yndan · Irok Festival',
    body: 'Traditional loom weaving preserved by MKC Weavers Association and modernized by Yndan (@yndanph). The Irok Festival (Dec. 1) celebrates the Sugar Palm tree with street dancing.',
  },
  {
    icon: Wheat,
    color: 'bg-orange-50 border-orange-200 text-orange-800',
    iconColor: 'bg-orange-100 text-orange-700',
    title: 'Local Produce',
    subtitle: 'Kalamay · Coffee · Dragon Fruit · Kaong',
    body: 'Famous for Kalamay Indang, Robusta/Arabica/Barako coffee, dragon fruit (Brgy. Calumpang & Buna Lejos), and kaong with organic sasa vinegar.',
  },
  {
    icon: Droplets,
    color: 'bg-blue-50 border-blue-200 text-blue-800',
    iconColor: 'bg-blue-100 text-blue-700',
    title: 'Natural Springs & Falls',
    subtitle: 'The Town of Many Springs',
    body: 'Cold, chemical-free spring resorts (Villa Colmenar, Rio Villa) fed by natural ground springs. Pantihan (Balayungan) Falls is one of the last wild waterfalls in the province.',
  },
];

// ── Index Page ────────────────────────────────────────────────────────────────

function TourismIndex() {
  const heroRef = useScrollReveal<HTMLDivElement>();
  const cultureRef = useScrollReveal<HTMLDivElement>();
  const catsRef = useScrollReveal<HTMLDivElement>();
  const catsGridRef = useScrollReveal<HTMLDivElement>();

  const categories: Category[] = establishmentsData.categories;
  const establishments: Establishment[] = establishmentsData.establishments;

  const CATEGORY_DESCS: Record<string, string> = {
    heritage:
      'Historical shrines, colonial churches, a community museum, and living craft traditions.',
    resorts:
      'Spring-fed pools and private resorts using cold, chemical-free natural water.',
    farms:
      'Agri-eco parks, farmstays, orchards, and farm-to-table experiences.',
    events: 'Function halls, glamping cabins, and vacation home rentals.',
    restaurants:
      'Cafés, restaurants, and catering services featuring local Cavite cuisine.',
    adventure: 'Outdoor adventure parks and eco-nature activities.',
  };

  return (
    <>
      <SEO
        title="Tourism"
        description="Discover the Town of Many Springs — heritage, spring resorts, farms, and cultural landmarks in Indang, Cavite."
        keywords="Indang tourism, Cavite tourism, spring resorts, Bonifacio Shrine, Irok Festival, CvSU, agri-tourism"
      />

      {/* Hero */}
      <div
        className="relative text-white py-20 overflow-hidden"
        style={{
          backgroundColor: '#003087',
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-3">
            <MapPin className="h-6 w-6 text-blue-300" />
            <span className="text-blue-300 text-sm font-semibold uppercase tracking-widest">
              Indang, Cavite
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-black mb-2 leading-tight">
            Tourism
          </h1>
          <p className="text-2xl font-bold text-blue-200 mb-2 italic">
            "Ang Bayan ng Maraming Bukal"
          </p>
          <p className="text-blue-100 text-lg max-w-2xl mb-4">
            The Town of Many Springs — known for natural spring resorts,
            revolutionary history, heritage churches, agri-tourism farms, and
            the Irok Festival.
          </p>
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="bg-white/10 border border-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
              "Walang Tinag" — Immovable
            </span>
            <span className="bg-white/10 border border-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
              Est. 1655
            </span>
            <span className="bg-white/10 border border-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
              {establishments.length} Establishments
            </span>
          </div>
          <a
            href="https://www.facebook.com/TourismIndang"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-primary-700 font-bold text-sm rounded-lg hover:bg-blue-50 transition-colors"
          >
            <Facebook className="h-4 w-4" />
            Follow @TourismIndang
          </a>
        </div>
      </div>

      {/* Culture Highlights */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div ref={heroRef} className="reveal mb-8">
            <div className="flex items-center gap-2 mb-1">
              <Star className="h-4 w-4 text-amber-500" />
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
                Culture & Identity
              </span>
            </div>
            <h2 className="text-2xl font-black text-gray-900">
              What Makes Indang Unique
            </h2>
          </div>
          <div
            ref={cultureRef}
            className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
          >
            {CULTURE_HIGHLIGHTS.map(
              ({ icon: Icon, color, iconColor, title, subtitle, body }) => (
                <div key={title} className={`rounded-xl border p-5 ${color}`}>
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${iconColor}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="font-black text-sm mb-0.5">{title}</h3>
                  <p className="text-xs font-semibold opacity-70 mb-2">
                    {subtitle}
                  </p>
                  <p className="text-xs leading-relaxed opacity-80">{body}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div ref={catsRef} className="reveal mb-8">
            <h2 className="text-2xl font-black text-gray-900">
              Browse by Category
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Source: Indang Tourism Office — 2026 Official List
            </p>
          </div>
          <div
            ref={catsGridRef}
            className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {categories.map(cat => {
              const count = establishments.filter(
                e => e.category === cat.id
              ).length;
              const colors = CATEGORY_COLORS[cat.id] ?? CATEGORY_COLORS.others;
              const IconComp = ICON_MAP[cat.icon] ?? MapPin;
              return (
                <Link
                  key={cat.id}
                  to={`/tourism/${cat.id}`}
                  className="group bg-white rounded-xl border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all duration-200 p-6 flex items-start gap-4"
                >
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                    <IconComp className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-black text-base text-gray-900">
                        {cat.label}
                      </h3>
                      <ChevronRight className="h-4 w-4 shrink-0 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      {CATEGORY_DESCS[cat.id] ?? ''}
                    </p>
                    <span
                      className={`inline-block mt-3 text-xs font-bold px-2 py-0.5 rounded-full ${colors.pill}`}
                    >
                      {count} listing{count !== 1 ? 's' : ''}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

// ── Category Page ─────────────────────────────────────────────────────────────

function TourismCategory() {
  const { category } = useParams<{ category: string }>();
  const [search, setSearch] = useState('');
  const gridRef = useScrollReveal<HTMLDivElement>();

  const categories: Category[] = establishmentsData.categories;
  const establishments: Establishment[] = establishmentsData.establishments;

  const cat = categories.find(c => c.id === category);
  const colors = CATEGORY_COLORS[category ?? ''] ?? CATEGORY_COLORS.others;
  const IconComp = cat ? (ICON_MAP[cat.icon] ?? MapPin) : MapPin;

  const filtered = establishments.filter(item => {
    if (item.category !== category) return false;
    const q = search.toLowerCase();
    return (
      !q ||
      item.name.toLowerCase().includes(q) ||
      (item.description ?? '').toLowerCase().includes(q) ||
      (item.address ?? '').toLowerCase().includes(q) ||
      (item.tags ?? []).some(t => t.toLowerCase().includes(q))
    );
  });

  if (!cat) {
    return (
      <main className="flex-grow flex items-center justify-center py-20">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Category not found.</p>
          <Link
            to="/tourism"
            className="text-sm font-semibold text-primary-700 hover:text-primary-800"
          >
            View all tourism categories
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <SEO
        title={`${cat.label} — Tourism`}
        description={`${cat.label} listings in Indang, Cavite. Official 2026 tourism establishments.`}
        keywords={`Indang ${cat.label.toLowerCase()}, Cavite tourism, ${cat.id}`}
      />
      <main className="flex-grow">
        {/* Breadcrumb + Header */}
        <div className="bg-white border-b border-gray-100 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <Link to="/" className="hover:text-primary-700 transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link
                to="/tourism"
                className="hover:text-primary-700 transition-colors"
              >
                Tourism
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="font-semibold text-primary-700">
                {cat.label}
              </span>
            </nav>

            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-50 text-primary-700 mb-4">
              <IconComp className="h-6 w-6" />
            </div>
            <h1 className="text-4xl font-black text-gray-900 mb-2">
              {cat.label}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full ${colors.pill}`}
              >
                {cat.label}
              </span>
              <span className="text-gray-400 text-sm">
                {filtered.length} establishment
                {filtered.length !== 1 ? 's' : ''} · Indang, Cavite 2026
              </span>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={`Search ${cat.label.toLowerCase()}...`}
                className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Listings */}
        <section className="bg-gray-50 py-8 min-h-[400px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <MapPin className="h-10 w-10 mx-auto mb-3 opacity-40" />
                <p className="font-semibold">No results found.</p>
                <p className="text-sm mt-1">Try a different search term.</p>
              </div>
            ) : (
              <div
                ref={gridRef}
                className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filtered.map(item => (
                  <EstablishmentCard
                    key={item.name}
                    item={item}
                    cat={cat}
                    colors={colors}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        <div className="bg-white border-t border-gray-100 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-end">
            <a
              href="https://www.facebook.com/TourismIndang"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
            >
              <Facebook className="h-4 w-4" />
              Contact Tourism Office
            </a>
          </div>
        </div>
      </main>
    </>
  );
}

// ── Establishment Card ────────────────────────────────────────────────────────

function EstablishmentCard({
  item,
  cat,
  colors,
}: {
  item: Establishment;
  cat: Category;
  colors: (typeof CATEGORY_COLORS)[string];
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary-200 transition-all duration-200 overflow-hidden flex flex-col">
      {/* Placeholder image */}
      <div className="w-full h-40 bg-gray-50 flex items-center justify-center border-b border-gray-100">
        <img
          src="/vite.svg"
          alt={item.name}
          className="h-16 w-16 opacity-20 object-contain"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div>
          <span
            className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-2 ${colors.pill}`}
          >
            {cat.label}
          </span>
          <h3 className="font-black text-sm leading-snug text-gray-900">
            {item.name}
          </h3>
        </div>

        {item.description && (
          <p className="text-xs text-gray-600 leading-relaxed">
            {item.description}
          </p>
        )}

        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {item.tags.map(tag => (
              <span
                key={tag}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-1.5 pt-2 border-t border-gray-100 mt-auto">
          {item.address && (
            <span className="flex items-start gap-2 text-xs text-gray-500">
              <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5 text-gray-400" />
              {item.address}
            </span>
          )}
          {item.contact && (
            <a
              href={`tel:${item.contact.replace(/\D/g, '')}`}
              className="flex items-center gap-2 text-xs text-primary-600 hover:text-primary-800 font-semibold transition-colors"
            >
              <Phone className="h-3.5 w-3.5 shrink-0" />
              {item.contact}
            </a>
          )}
          {item.facebook && (
            <a
              href={item.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-blue-600 hover:text-blue-800 font-semibold transition-colors"
            >
              <Facebook className="h-3.5 w-3.5 shrink-0" />
              Facebook Page
              <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Router ────────────────────────────────────────────────────────────────────

export default function Tourism() {
  const { category } = useParams<{ category: string }>();
  return category ? <TourismCategory /> : <TourismIndex />;
}
