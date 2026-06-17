import { useState, useRef, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
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
  Wheat,
  Droplets,
  ChevronRight,
  Scissors,
  Leaf,
  Calendar,
  SlidersHorizontal,
  ArrowUpDown,
  Check,
} from 'lucide-react';
import SEO from '../components/SEO';
import { useScrollReveal } from '../hooks/useScrollReveal';
import establishmentsData from '../../content/tourism/establishments.json';
import { useTranslation } from '../hooks/useTranslation';

interface Establishment {
  name: string;
  category: string;
  address?: string;
  contact?: string;
  facebook?: string;
  image?: string;
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

const CATEGORY_COLORS: Record<
  string,
  { pill: string; placeholder: string; icon: string }
> = {
  heritage: {
    pill: 'bg-amber-100 text-amber-700',
    placeholder: 'bg-amber-50',
    icon: 'text-amber-300',
  },
  resorts: {
    pill: 'bg-blue-100 text-blue-700',
    placeholder: 'bg-blue-50',
    icon: 'text-blue-300',
  },
  farms: {
    pill: 'bg-green-100 text-green-700',
    placeholder: 'bg-green-50',
    icon: 'text-green-300',
  },
  events: {
    pill: 'bg-purple-100 text-purple-700',
    placeholder: 'bg-purple-50',
    icon: 'text-purple-300',
  },
  restaurants: {
    pill: 'bg-orange-100 text-orange-700',
    placeholder: 'bg-orange-50',
    icon: 'text-orange-300',
  },
  adventure: {
    pill: 'bg-red-100 text-red-700',
    placeholder: 'bg-red-50',
    icon: 'text-red-300',
  },
  others: {
    pill: 'bg-gray-100 text-gray-600',
    placeholder: 'bg-gray-50',
    icon: 'text-gray-300',
  },
};

// ── Index Page ────────────────────────────────────────────────────────────────

function TourismIndex() {
  const { currentLanguage } = useTranslation();
  const isFil = currentLanguage === 'fil';
  const location = useLocation();
  const catsRef = useScrollReveal<HTMLDivElement>();
  const catsGridRef = useScrollReveal<HTMLDivElement>();

  const categories: Category[] = establishmentsData.categories;
  const establishments: Establishment[] = establishmentsData.establishments;

  const siteBase = (import.meta.env.VITE_WEBSITE_URL ?? '').replace(/\/$/, '');
  const pageUrl = `${siteBase}${location.pathname}`;

  const CATEGORY_DESCS: Record<string, string> = isFil
    ? {
        heritage:
          'Mga makasaysayang dambana, simbahang kolonyal, museo ng pamayanan, at buhay na tradisyon ng sining.',
        resorts:
          'Mga spring-fed na pool at pribadong resort na gumagamit ng malamig at walang kemikal na likas na tubig.',
        farms:
          'Mga parkeng agri-ekolohikal, farmstays, at mga karanasan mula sa bukid tungo sa lamesa.',
        events:
          'Mga bulwagan para sa okasyon, glamping cabins, at paupahang bahay-bakasyunan.',
        restaurants:
          'Mga café, kainan, at serbisyo sa catering na nagtatampok ng lokal na lutuing Cavite.',
        adventure:
          'Mga parkeng panlabas na may pakikipagsapalaran at mga gawaing pang-ekolohiya.',
      }
    : {
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

  const translateCategoryLabel = (label: string, id: string) => {
    if (!isFil) return label;
    const mapping: Record<string, string> = {
      heritage: 'Makasaysayang Pamana',
      resorts: 'Mga Spring Resort',
      farms: 'Mga Sakahan (Farms)',
      events: 'Mga Kaganapan at Okasyon',
      restaurants: 'Mga Restaurant at Café',
      adventure: 'Pakikipagsapalaran (Adventure)',
    };
    return mapping[id] || label;
  };

  const indexStructuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: isFil ? 'Turismo — Indang, Cavite' : 'Tourism — Indang, Cavite',
      url: pageUrl,
      description: isFil
        ? 'Tuklasin ang Bayan ng Maraming Bukal — pamana, spring resorts, bukid, at makasaysayang dambana sa Indang, Cavite.'
        : 'Discover the Town of Many Springs — heritage, spring resorts, farms, and cultural landmarks in Indang, Cavite.',
      about: {
        '@type': 'TouristDestination',
        name: 'Indang',
        description: 'The Town of Many Springs, Cavite, Philippines',
        containedInPlace: {
          '@type': 'AdministrativeArea',
          name: 'Cavite, Philippines',
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: isFil ? 'Tahanan' : 'Home',
          item: siteBase || '/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: isFil ? 'Turismo' : 'Tourism',
          item: pageUrl,
        },
      ],
    },
  ];

  return (
    <main className="flex-grow">
      <SEO
        title={isFil ? 'Turismo' : 'Tourism'}
        description={
          isFil
            ? 'Tuklasin ang Bayan ng Maraming Bukal — pamana, spring resorts, bukid, at makasaysayang dambana sa Indang, Cavite.'
            : 'Discover the Town of Many Springs — heritage, spring resorts, farms, and cultural landmarks in Indang, Cavite.'
        }
        keywords="Indang tourism, Cavite tourism, spring resorts, Bonifacio Shrine, Irok Festival, CvSU, agri-tourism"
        url={pageUrl}
        lang={currentLanguage}
        structuredData={indexStructuredData}
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
              {isFil ? 'Indang, Cavite' : 'Indang, Cavite'}
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-black mb-2 leading-tight">
            {isFil ? 'Turismo' : 'Tourism'}
          </h1>
          <p className="text-2xl font-bold text-blue-200 mb-2 italic">
            "Ang Bayan ng Maraming Bukal"
          </p>
          <p className="text-blue-100 text-lg max-w-2xl mb-4">
            {isFil
              ? 'Ang Bayan ng Maraming Bukal — kilala sa mga natural spring resort, makasaysayang himagsikan, mga pamanang simbahan, sakahang pang-agrikultura, at ang Irok Festival.'
              : 'The Town of Many Springs — known for natural spring resorts, revolutionary history, heritage churches, agri-tourism farms, and the Irok Festival.'}
          </p>
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="bg-white/10 border border-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
              "Walang Tinag" — Immovable
            </span>
            <span className="bg-white/10 border border-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
              Est. 1655
            </span>
            <span className="bg-white/10 border border-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
              {isFil
                ? `${establishments.length} na Establisimyento`
                : `${establishments.length} Establishments`}
            </span>
          </div>
          <a
            href="https://www.facebook.com/TourismIndang"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-primary-700 font-bold text-sm rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
          >
            <Facebook className="h-4 w-4" />
            {isFil ? 'Sundan ang @TourismIndang' : 'Follow @TourismIndang'}
          </a>
        </div>
      </div>

      {/* Category Cards */}
      <section className="bg-gray-50 py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div ref={catsRef} className="reveal mb-8">
            <h2 className="text-2xl font-black text-gray-900">
              {isFil ? 'Tingnan ayon sa Kategorya' : 'Browse by Category'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {isFil
                ? 'Pinagmulan: Tanggapan ng Turismo ng Indang — Opisyal na Listahan ng 2026'
                : 'Source: Indang Tourism Office — 2026 Official List'}
            </p>
          </div>
          <div
            ref={catsGridRef}
            className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {[...categories]
              .sort((a, b) => {
                const ca = establishments.filter(
                  e => e.category === a.id
                ).length;
                const cb = establishments.filter(
                  e => e.category === b.id
                ).length;
                return cb - ca;
              })
              .map(cat => {
                const count = establishments.filter(
                  e => e.category === cat.id
                ).length;
                const colors =
                  CATEGORY_COLORS[cat.id] ?? CATEGORY_COLORS.others;
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
                          {translateCategoryLabel(cat.label, cat.id)}
                        </h3>
                        <ChevronRight className="h-4 w-4 shrink-0 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                        {CATEGORY_DESCS[cat.id] ?? ''}
                      </p>
                      <span
                        className={`inline-block mt-3 text-xs font-bold px-2 py-0.5 rounded-full ${colors.pill}`}
                      >
                        {isFil
                          ? `${count} na establisimyento`
                          : `${count} listing${count !== 1 ? 's' : ''}`}
                      </span>
                    </div>
                  </Link>
                );
              })}
          </div>

          {/* History page link */}
          <div className="mt-6 pt-5 border-t border-gray-200 flex items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              {isFil
                ? 'Naghahanap ng kasaysayan, pamana, at kultura ng Indang?'
                : "Looking for Indang's history, heritage, and culture?"}
            </p>
            <Link
              to="/tourism/history"
              className="shrink-0 inline-flex items-center gap-1.5 text-sm font-bold text-primary-700 hover:text-primary-900 transition-colors"
            >
              {isFil ? 'Kasaysayan ng Indang' : 'Indang History'}
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      {/* Culture & Traditions */}
      <section className="bg-gray-50 py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-2">
            <Scissors className="h-4 w-4 text-primary-600" />
            <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">
              {isFil ? 'Kultura at Tradisyon' : 'Culture & Traditions'}
            </span>
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-6">
            {isFil ? 'Mga Lokal na Tradisyon' : 'Living Traditions'}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-rose-100 rounded-lg flex items-center justify-center">
                  <Scissors className="h-4 w-4 text-rose-700" />
                </div>
                <div>
                  <span className="text-xs font-bold text-rose-600 uppercase tracking-widest block">
                    {isFil ? 'Tradisyonal na Gawain' : 'Traditional Craft'}
                  </span>
                  <h3 className="font-black text-gray-900 text-lg leading-tight">
                    {isFil ? 'Sining ng Paghahabi' : 'The Art of Weaving'}
                  </h3>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {isFil
                  ? 'Ang Indang ay tahanan ng mga bihasang mananahi na gumagamit ng tradisyonal na habihan. Pinapanatili ng MKC Weavers Association at ginawang makabago ng Yndan — isang brand na pinagsama ang pamana at modernong disenyo.'
                  : 'Indang is home to skilled weavers who use traditional looms to create intricate fabrics. Preserved by the MKC Weavers Association and modernized by Yndan — blending heritage weaving with contemporary design.'}
              </p>
              <a
                href="https://www.yndan.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-700 hover:text-rose-900 transition-colors"
              >
                {isFil ? 'Bisitahin ang Yndan' : 'Visit Yndan'}
                <ChevronRight className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-orange-700" />
                </div>
                <div>
                  <span className="text-xs font-bold text-orange-600 uppercase tracking-widest block">
                    {isFil ? 'Taunang Pagdiriwang' : 'Annual Festival'}
                  </span>
                  <h3 className="font-black text-gray-900 text-lg leading-tight">
                    Irok Festival
                  </h3>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                {isFil
                  ? 'Ipinagdiriwang tuwing Disyembre 1 — Araw ng Indang. Pinagpaparangalan ang puno ng Irok (Sugar Palm) sa pamamagitan ng street dancing na may mga kostumeng gawa sa hibla at dahon ng irok.'
                  : 'Celebrated every December 1st — Indang Day. Honors the Sugar Palm (Irok) tree with street dancing in costumes crafted from irok fibers and leaves.'}
              </p>
              <div className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">
                <Calendar className="h-3 w-3" />
                {isFil ? 'Bawat Disyembre 1' : 'Every December 1st'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Products */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-2">
            <Wheat className="h-4 w-4 text-primary-600" />
            <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">
              {isFil ? 'Mga Lokal na Produkto' : 'Local Produce'}
            </span>
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">
            {isFil
              ? 'Mga Piling Produkto ng Indang'
              : "Indang's Signature Products"}
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            {isFil
              ? 'Ang mayamang bulkanikong lupa at malamig na klima ng bundok ay nagdudulot ng mataas na kalidad na mga produktong pangkultura at pangsaka.'
              : 'Fertile volcanic soil and a cool highland climate yield high-value agricultural and artisanal goods.'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: Wheat,
                name: 'Kalamay Indang',
                desc: isFil
                  ? 'Piling matamis na suman ng bayan — makinis na texture, mayamang lasa ng gatas ng niyog.'
                  : "The town's signature sweet sticky rice cake — smooth texture, rich coconut milk flavor.",
              },
              {
                icon: Leaf,
                name: isFil ? 'Kape' : 'Coffee',
                desc: isFil
                  ? 'Nangungunang prodyuser ng Robusta, Arabica, at Barako beans sa Cavite mula sa mga malamig na kabundukan.'
                  : 'Top Cavite producer of Robusta, Arabica, and Barako beans from cool highland farms.',
              },
              {
                icon: Leaf,
                name: 'Dragon Fruit',
                desc: isFil
                  ? 'Malalaking taniman sa Brgy. Calumpang at Buna Lejos ang nagpapakilala sa Indang bilang sentro ng dragon fruit sa rehiyon.'
                  : 'Major plantations in Brgy. Calumpang and Buna Lejos make Indang a regional dragon fruit hub.',
              },
              {
                icon: Droplets,
                name: 'Kaong & Sasa',
                desc: isFil
                  ? 'Pangunahing pinagkukunan ng prutas ng kaong at organikong suka ng palma (sasa).'
                  : 'A major source of sugar palm fruit (kaong) and organic palm vinegar (sasa).',
              },
            ].map(item => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  className="bg-green-50 border border-green-100 rounded-xl p-5"
                >
                  <div className="w-9 h-9 bg-green-100 text-green-700 rounded-lg flex items-center justify-center mb-3">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Rivers & Springs */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
                <Droplets className="h-4 w-4 text-blue-700" />
              </div>
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block">
                  {isFil ? 'Likas na Kagandahan' : 'Natural Beauty'}
                </span>
                <h2 className="font-black text-gray-900 text-xl leading-tight">
                  {isFil ? 'Mga Ilog at Bukal' : 'Rivers & Springs'}
                </h2>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-5">
              {isFil
                ? 'Totoo sa palayaw nito, ang Indang ay nailalarawan sa kasaganaan ng dumadaloy na tubig. Ang bayan ay napalilibutan ng mga Ilog na Ik-ik, Banaba, at Labac, na nagbigay ng natural na depensa sa buong kasaysayan.'
                : 'True to its nickname, Indang is characterized by an abundance of flowing water. The town is bounded by the Ik-ik, Banaba, and Labac Rivers — natural defenses throughout its history.'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl border border-blue-100 p-4">
                <h3 className="font-bold text-gray-900 text-sm mb-1">
                  {isFil
                    ? 'Mga Natural Spring Resort'
                    : 'Natural Spring Resorts'}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {isFil
                    ? 'Kilala sa mga malamig at natural na resort (Villa Colmenar, Rio Villa) na tumatanggap ng tubig direkta mula sa lupa.'
                    : 'Cold, chemical-free spring resorts (Villa Colmenar, Rio Villa) fed directly from natural ground springs.'}
                </p>
              </div>
              <div className="bg-white rounded-xl border border-blue-100 p-4">
                <h3 className="font-bold text-gray-900 text-sm mb-1">
                  Pantihan Falls
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {isFil
                    ? 'Nasa Barangay Pantihan — isa sa mga huling ligaw na talon sa Cavite, nagbubuhos sa natural na bato ng bulkan.'
                    : 'Located in Barangay Pantihan — one of the last wild waterfalls in Cavite, cascading over natural volcanic rock.'}
                </p>
              </div>
              <div className="bg-white rounded-xl border border-blue-100 p-4">
                <h3 className="font-bold text-gray-900 text-sm mb-1">
                  {isFil ? '299.5m Taas' : '299.5m Elevation'}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {isFil
                    ? 'Mas malamig na klima at mayamang kabundukan — perpekto para sa agrikultura at pagbuo ng mga bukal.'
                    : 'Cooler climate and fertile highland terrain — ideal for diverse agriculture and natural spring formation.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

const CAT_HERO: Record<string, { accent: string; badge: string }> = {
  heritage: {
    accent: 'text-amber-200',
    badge: 'bg-amber-500/20 border border-amber-400/30 text-amber-100',
  },
  resorts: {
    accent: 'text-blue-200',
    badge: 'bg-blue-400/20 border border-blue-300/30 text-blue-100',
  },
  farms: {
    accent: 'text-green-200',
    badge: 'bg-green-500/20 border border-green-400/30 text-green-100',
  },
  events: {
    accent: 'text-purple-200',
    badge: 'bg-purple-400/20 border border-purple-300/30 text-purple-100',
  },
  restaurants: {
    accent: 'text-orange-200',
    badge: 'bg-orange-400/20 border border-orange-300/30 text-orange-100',
  },
  adventure: {
    accent: 'text-red-200',
    badge: 'bg-red-400/20 border border-red-300/30 text-red-100',
  },
};

const CATEGORY_DESCS_EN: Record<string, string> = {
  heritage:
    'Historical shrines, colonial churches, a community museum, and living craft traditions.',
  resorts:
    'Spring-fed pools and private resorts using cold, chemical-free natural water.',
  farms: 'Agri-eco parks, farmstays, orchards, and farm-to-table experiences.',
  events: 'Function halls, glamping cabins, and vacation home rentals.',
  restaurants:
    'Cafés, restaurants, and catering services featuring local Cavite cuisine.',
  adventure: 'Outdoor adventure parks and eco-nature activities.',
};

const CATEGORY_DESCS_FIL: Record<string, string> = {
  heritage:
    'Mga makasaysayang dambana, simbahang kolonyal, museo ng pamayanan, at buhay na tradisyon ng sining.',
  resorts:
    'Mga spring-fed na pool at pribadong resort na gumagamit ng malamig at walang kemikal na likas na tubig.',
  farms:
    'Mga parkeng agri-ekolohikal, farmstays, at mga karanasan mula sa bukid tungo sa lamesa.',
  events:
    'Mga bulwagan para sa okasyon, glamping cabins, at paupahang bahay-bakasyunan.',
  restaurants:
    'Mga café, kainan, at serbisyo sa catering na nagtatampok ng lokal na lutuing Cavite.',
  adventure:
    'Mga parkeng panlabas na may pakikipagsapalaran at mga gawaing pang-ekolohiya.',
};

// ── Category Page ─────────────────────────────────────────────────────────────

const SCHEMA_TYPE: Record<string, string> = {
  heritage: 'TouristAttraction',
  resorts: 'Resort',
  farms: 'TouristAttraction',
  events: 'EventVenue',
  restaurants: 'FoodEstablishment',
  adventure: 'TouristAttraction',
};

function TourismCategory() {
  const { currentLanguage } = useTranslation();
  const isFil = currentLanguage === 'fil';
  const { category } = useParams<{ category: string }>();
  const location = useLocation();
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'az' | 'za'>('az');
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  const gridRef = useScrollReveal<HTMLDivElement>();

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node))
        setFilterOpen(false);
      if (sortRef.current && !sortRef.current.contains(e.target as Node))
        setSortOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const categories: Category[] = establishmentsData.categories;
  const establishments: Establishment[] = establishmentsData.establishments;

  const siteBase = (import.meta.env.VITE_WEBSITE_URL ?? '').replace(/\/$/, '');
  const pageUrl = `${siteBase}${location.pathname}`;

  const cat = categories.find(c => c.id === category);
  const colors = CATEGORY_COLORS[category ?? ''] ?? CATEGORY_COLORS.others;
  const heroStyle = CAT_HERO[category ?? ''] ?? {
    accent: 'text-blue-200',
    badge: 'bg-white/10 border border-white/20 text-white',
  };
  const IconComp = cat ? (ICON_MAP[cat.icon] ?? MapPin) : MapPin;

  const allTags = Array.from(
    new Set(
      establishments
        .filter(e => e.category === category)
        .flatMap(e => e.tags ?? [])
    )
  ).sort();

  const toggleTag = (tag: string) =>
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );

  const translateCategoryLabel = (label: string, id: string) => {
    if (!isFil) return label;
    const mapping: Record<string, string> = {
      heritage: 'Makasaysayang Pamana',
      resorts: 'Mga Spring Resort',
      farms: 'Mga Sakahan (Farms)',
      events: 'Mga Kaganapan at Okasyon',
      restaurants: 'Mga Restaurant at Café',
      adventure: 'Pakikipagsapalaran (Adventure)',
    };
    return mapping[id] || label;
  };

  const filtered = establishments
    .filter(item => {
      if (item.category !== category) return false;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        (item.description ?? '').toLowerCase().includes(q) ||
        (item.address ?? '').toLowerCase().includes(q) ||
        (item.tags ?? []).some(t => t.toLowerCase().includes(q));
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every(tag => (item.tags ?? []).includes(tag));
      return matchesSearch && matchesTags;
    })
    .sort((a, b) =>
      sortBy === 'za'
        ? b.name.localeCompare(a.name)
        : a.name.localeCompare(b.name)
    );

  if (!cat) {
    return (
      <main className="flex-grow flex items-center justify-center py-20">
        <div className="text-center">
          <p className="text-gray-500 mb-4">
            {isFil ? 'Hindi nahanap ang kategorya.' : 'Category not found.'}
          </p>
          <Link
            to="/tourism"
            className="text-sm font-semibold text-primary-700 hover:text-primary-800"
          >
            {isFil
              ? 'Tingnan ang lahat ng kategorya ng turismo'
              : 'View all tourism categories'}
          </Link>
        </div>
      </main>
    );
  }

  const catLabel = translateCategoryLabel(cat.label, cat.id);
  const catEstablishments = establishments.filter(e => e.category === category);
  const catStructuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: isFil
        ? `${catLabel} sa Indang, Cavite`
        : `${catLabel} in Indang, Cavite`,
      url: pageUrl,
      itemListElement: catEstablishments.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': SCHEMA_TYPE[category ?? ''] ?? 'LocalBusiness',
          name: item.name,
          ...(item.description ? { description: item.description } : {}),
          ...(item.contact ? { telephone: item.contact } : {}),
          ...(item.facebook ? { sameAs: item.facebook } : {}),
          address: {
            '@type': 'PostalAddress',
            ...(item.address ? { streetAddress: item.address } : {}),
            addressLocality: 'Indang',
            addressRegion: 'Cavite',
            addressCountry: 'PH',
          },
        },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: isFil ? 'Tahanan' : 'Home',
          item: siteBase || '/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: isFil ? 'Turismo' : 'Tourism',
          item: `${siteBase}/tourism`,
        },
        { '@type': 'ListItem', position: 3, name: catLabel, item: pageUrl },
      ],
    },
  ];

  return (
    <>
      <SEO
        title={`${catLabel} — ${isFil ? 'Turismo' : 'Tourism'}`}
        description={
          isFil
            ? `Mga ${catLabel} sa Indang, Cavite. Opisyal na listahan ng 2026.`
            : `${catLabel} listings in Indang, Cavite. Official 2026 tourism establishments.`
        }
        keywords={`Indang ${cat.label.toLowerCase()}, Cavite tourism, ${cat.id}`}
        url={pageUrl}
        lang={currentLanguage}
        structuredData={catStructuredData}
      />
      <main className="flex-grow">
        {/* Hero header */}
        <div
          className="relative text-white overflow-hidden"
          style={{
            backgroundColor: '#003087',
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
            <nav className="flex items-center gap-1.5 text-xs text-blue-200 mb-6">
              <Link to="/" className="hover:text-white transition-colors">
                {isFil ? 'Tahanan' : 'Home'}
              </Link>
              <ChevronRight className="h-3 w-3 opacity-50" />
              <Link
                to="/tourism"
                className="hover:text-white transition-colors"
              >
                {isFil ? 'Turismo' : 'Tourism'}
              </Link>
              <ChevronRight className="h-3 w-3 opacity-50" />
              <span className="text-white">{catLabel}</span>
            </nav>
            <div
              className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${heroStyle.badge}`}
            >
              <IconComp className="h-6 w-6" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black leading-tight mb-2">
              {catLabel}
            </h1>
            <p
              className={`text-sm sm:text-base mb-4 max-w-xl leading-relaxed ${heroStyle.accent}`}
            >
              {isFil
                ? (CATEGORY_DESCS_FIL[category ?? ''] ?? '')
                : (CATEGORY_DESCS_EN[category ?? ''] ?? '')}
            </p>
            <span
              className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${heroStyle.badge}`}
            >
              {isFil
                ? `${catEstablishments.length} na establisimyento · Indang, Cavite`
                : `${catEstablishments.length} establishment${catEstablishments.length !== 1 ? 's' : ''} · Indang, Cavite`}
            </span>
          </div>
        </div>

        {/* Search · Filters · Sort */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative flex-1 sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder={
                    isFil
                      ? `Maghanap sa ${catLabel.toLowerCase()}...`
                      : `Search ${cat.label.toLowerCase()}...`
                  }
                  className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Filters | Sort pill group */}
              <div className="ml-auto flex items-stretch border border-gray-200 rounded-lg overflow-visible divide-x divide-gray-200">
                {/* Filters dropdown */}
                <div className="relative" ref={filterRef}>
                  <button
                    type="button"
                    onClick={() => {
                      setFilterOpen(o => !o);
                      setSortOpen(false);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors rounded-l-lg ${
                      filterOpen || selectedTags.length > 0
                        ? 'text-primary-700 bg-primary-50'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    {isFil ? 'Filter' : 'Filters'}
                    {selectedTags.length > 0 && (
                      <span className="bg-primary-700 text-white text-[10px] font-bold min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full">
                        {selectedTags.length}
                      </span>
                    )}
                  </button>

                  {filterOpen && allTags.length > 0 && (
                    <div className="absolute left-0 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-30 min-w-[200px] py-1.5">
                      {allTags.map(tag => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors"
                        >
                          <span
                            className={`w-4 h-4 shrink-0 flex items-center justify-center rounded border transition-colors ${
                              selectedTags.includes(tag)
                                ? 'bg-primary-700 border-primary-700'
                                : 'border-gray-300'
                            }`}
                          >
                            {selectedTags.includes(tag) && (
                              <Check className="h-2.5 w-2.5 text-white" />
                            )}
                          </span>
                          <span
                            className={
                              selectedTags.includes(tag)
                                ? 'font-semibold text-primary-700'
                                : 'text-gray-700'
                            }
                          >
                            {tag}
                          </span>
                        </button>
                      ))}
                      {selectedTags.length > 0 && (
                        <div className="border-t border-gray-100 mt-1 pt-1 px-4">
                          <button
                            type="button"
                            onClick={() => setSelectedTags([])}
                            className="w-full text-xs text-gray-400 hover:text-gray-700 py-1.5 text-left transition-colors"
                          >
                            {isFil ? 'I-clear lahat' : 'Clear all'}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Sort dropdown */}
                <div className="relative" ref={sortRef}>
                  <button
                    type="button"
                    onClick={() => {
                      setSortOpen(o => !o);
                      setFilterOpen(false);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors rounded-r-lg ${
                      sortOpen
                        ? 'text-primary-700 bg-primary-50'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <ArrowUpDown className="h-4 w-4" />
                    {isFil ? 'Ayos' : 'Sort'}
                  </button>

                  {sortOpen && (
                    <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-30 min-w-[210px] py-1.5">
                      {(
                        [
                          {
                            value: 'az',
                            label: isFil
                              ? 'Alpabeto (A–Z)'
                              : 'Alphabetically (A–Z)',
                          },
                          {
                            value: 'za',
                            label: isFil
                              ? 'Alpabeto (Z–A)'
                              : 'Alphabetically (Z–A)',
                          },
                        ] as { value: 'az' | 'za'; label: string }[]
                      ).map(opt => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => {
                            setSortBy(opt.value);
                            setSortOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors"
                        >
                          <span
                            className={`w-4 h-4 shrink-0 flex items-center justify-center rounded-full border transition-colors ${
                              sortBy === opt.value
                                ? 'bg-primary-700 border-primary-700'
                                : 'border-gray-300'
                            }`}
                          >
                            {sortBy === opt.value && (
                              <span className="w-1.5 h-1.5 bg-white rounded-full" />
                            )}
                          </span>
                          <span
                            className={
                              sortBy === opt.value
                                ? 'font-semibold text-primary-700'
                                : 'text-gray-700'
                            }
                          >
                            {opt.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Listings */}
        <section className="bg-gray-50 py-8 min-h-[400px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <MapPin className="h-10 w-10 mx-auto mb-3 opacity-40" />
                <p className="font-semibold">
                  {isFil
                    ? 'Walang nahanap na mga resulta.'
                    : 'No results found.'}
                </p>
                <p className="text-sm mt-1">
                  {isFil
                    ? 'Subukan ang ibang salita ng paghahanap.'
                    : 'Try a different search term.'}
                </p>
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
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
            >
              <Facebook className="h-4 w-4" />
              {isFil
                ? 'Makipag-ugnayan sa Tanggapan ng Turismo'
                : 'Contact Tourism Office'}
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
  const { currentLanguage } = useTranslation();
  const isFil = currentLanguage === 'fil';

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary-200 transition-all duration-200 overflow-hidden flex flex-col">
      {/* Thumbnail */}
      {item.image ? (
        <div className="w-full h-40 overflow-hidden border-b border-gray-100">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div
          className={`w-full h-40 flex items-center justify-center border-b border-gray-100 ${colors.placeholder}`}
        >
          {(() => {
            const IconComp = ICON_MAP[cat.icon] ?? MapPin;
            return <IconComp className={`h-14 w-14 ${colors.icon}`} />;
          })()}
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div>
          {item.tags && item.tags.length > 0 && (
            <span
              className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-2 ${colors.pill}`}
            >
              {item.tags[0]}
            </span>
          )}
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
              className="flex items-center gap-2 text-xs text-blue-600 hover:text-blue-800 font-semibold transition-colors cursor-pointer"
            >
              <Facebook className="h-3.5 w-3.5 shrink-0" />
              {isFil ? 'Pahina sa Facebook' : 'Facebook Page'}
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
