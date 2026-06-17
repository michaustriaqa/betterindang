import { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronRight,
  Landmark,
  Church,
  BookOpen,
  Scissors,
  Leaf,
  Droplets,
  Wheat,
  Calendar,
  MapPin,
  ArrowLeft,
} from 'lucide-react';
import SEO from '../components/SEO';
import { useTranslation } from '../hooks/useTranslation';
import { useScrollReveal } from '../hooks/useScrollReveal';

const EVENT_KEYS = [
  'precolonial',
  'spanish',
  'revolution',
  'american',
  'cvsu',
  'republic',
  'present',
] as const;

const HERITAGE_SITES = [
  {
    icon: MapPin,
    name: 'Bonifacio Shrine',
    location: 'Barangay Limbon',
    desc: 'The exact historical site where Andres Bonifacio was arrested in April 1897. A national historical marker stands here today.',
    tag: 'National Landmark',
    tagColor: 'bg-amber-100 text-amber-700',
  },
  {
    icon: Church,
    name: 'Saint Gregory the Great Parish',
    location: 'Poblacion III',
    desc: 'Established in 1611, one of the oldest churches in Cavite. Known for its distinctive rose-colored stone facade and sanctuary role during the revolution.',
    tag: 'Est. 1611',
    tagColor: 'bg-amber-100 text-amber-700',
  },
  {
    icon: Church,
    name: 'Saint Vincent Ferrer Parish',
    location: 'Lumampong Halayhay',
    desc: 'A key spiritual landmark serving the upland barangay communities of Indang.',
    tag: 'Heritage Church',
    tagColor: 'bg-stone-100 text-stone-700',
  },
  {
    icon: BookOpen,
    name: 'Indang Community Museum',
    location: 'Poblacion',
    desc: "Preserves artifacts, documents, and stories of Indang's revolutionary and agricultural past. Open Mon–Fri 8AM–5PM, Sat 8AM–4PM.",
    tag: 'Museum',
    tagColor: 'bg-blue-100 text-blue-700',
  },
];

const AGRICULTURE = [
  {
    name: 'Kalamay Indang',
    desc: "The town's signature sweet sticky rice cake — smooth texture, rich coconut milk flavor.",
    icon: Wheat,
  },
  {
    name: 'Coffee',
    desc: 'Top Cavite producer of Robusta, Arabica, and Barako beans from the cool highland farms.',
    icon: Leaf,
  },
  {
    name: 'Dragon Fruit',
    desc: 'Major plantations in Brgy. Calumpang and Buna Lejos make Indang a regional dragon fruit hub.',
    icon: Leaf,
  },
  {
    name: 'Kaong & Sasa',
    desc: 'A major source of sugar palm fruit (kaong) and organic palm vinegar (sasa).',
    icon: Droplets,
  },
];

function TimelineEvent({
  eventKey,
  index,
  isLast,
}: {
  eventKey: string;
  index: number;
  isLast: boolean;
}) {
  const { t } = useTranslation('common');
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative flex gap-6"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.5s ease ${index * 70}ms, transform 0.5s ease ${index * 70}ms`,
      }}
    >
      <div className="flex flex-col items-center shrink-0 pt-1">
        <div className="w-4 h-4 rounded-full bg-primary-700 border-2 border-white ring-2 ring-primary-200 z-10 shrink-0" />
        {!isLast && (
          <div className="w-0.5 flex-1 bg-gradient-to-b from-primary-300 to-primary-100 mt-1" />
        )}
      </div>
      <div className="pb-8 flex-1">
        <span className="inline-block text-xs font-black text-primary-700 bg-primary-50 px-3 py-0.5 rounded-full mb-2 border border-primary-100">
          {t(`history.events.${eventKey}.year`)}
        </span>
        <h3 className="font-bold text-gray-900 text-base mb-1">
          {t(`history.events.${eventKey}.title`)}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {t(`history.events.${eventKey}.text`)}
        </p>
      </div>
    </div>
  );
}

export default function IndangHistory() {
  const { t } = useTranslation('common');
  const location = useLocation();
  const pageUrl = `${import.meta.env.VITE_WEBSITE_URL || 'https://betterindang.org'}${location.pathname}`;

  const headRef = useScrollReveal<HTMLDivElement>();
  const heritageRef = useScrollReveal<HTMLDivElement>();
  const cultureRef = useScrollReveal<HTMLDivElement>();
  const agriRef = useScrollReveal<HTMLDivElement>();
  const springsRef = useScrollReveal<HTMLDivElement>();

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'History of Indang, Cavite',
    description:
      'The rich history, heritage, culture, and identity of Indang, Cavite — from pre-colonial settlements to the Philippine Revolution and modern day.',
    url: pageUrl,
    about: {
      '@type': 'Place',
      name: 'Indang, Cavite',
      description:
        '"Walang Tinag" — the immovable town that played a pivotal role in the Philippine Revolution.',
    },
  };

  return (
    <>
      <SEO
        title="History of Indang — The Town of Many Springs"
        description="Discover the rich history of Indang, Cavite — from pre-colonial Tagalog settlements and the Battle of Indang in 1897, to its identity as an educational and agricultural hub."
        keywords="Indang history, Cavite history, Bonifacio shrine, Battle of Indang, Walang Tinag, St Gregory Parish, heritage Indang"
        url={pageUrl}
        structuredData={structuredData}
      />
      <main className="flex-grow bg-white">
        {/* Hero band */}
        <div className="bg-primary-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
            <nav className="flex items-center gap-1.5 text-xs text-blue-200 mb-6">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3 w-3 opacity-50" />
              <Link
                to="/tourism"
                className="hover:text-white transition-colors"
              >
                Tourism
              </Link>
              <ChevronRight className="h-3 w-3 opacity-50" />
              <span className="text-white">History</span>
            </nav>
            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Landmark className="h-5 w-5 text-blue-300" />
                  <span className="text-xs font-bold text-blue-300 uppercase tracking-widest">
                    Heritage & Culture
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-4">
                  History of Indang
                </h1>
                <p className="text-blue-100 text-base sm:text-lg max-w-xl leading-relaxed">
                  <strong className="text-white">"Walang Tinag"</strong> — the
                  Immovable. From pre-colonial settlements to the front lines of
                  the Philippine Revolution, Indang's story is one of resilience
                  and identity.
                </p>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <div className="bg-white/10 border border-white/20 rounded-xl px-5 py-3 text-center">
                  <div className="text-3xl font-black">1655</div>
                  <div className="text-xs text-blue-200 mt-0.5">
                    Year of Municipal Founding
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          {/* Timeline + stat cards */}
          <div
            ref={headRef}
            className="reveal grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16"
          >
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-primary-600" />
                <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">
                  Timeline
                </span>
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-8">
                {t('history.title')}
              </h2>
              <div className="pl-2">
                {EVENT_KEYS.map((key, i) => (
                  <TimelineEvent
                    key={key}
                    eventKey={key}
                    index={i}
                    isLast={i === EVENT_KEYS.length - 1}
                  />
                ))}
              </div>
            </div>

            {/* Stat cards */}
            <div className="flex flex-col gap-4 lg:pt-16">
              <div className="bg-primary-700 rounded-2xl p-6 text-white">
                <div className="text-5xl font-black mb-2">1655</div>
                <div className="text-blue-100 font-semibold mb-1">
                  Separated from Silang
                </div>
                <p className="text-blue-200 text-sm leading-relaxed">
                  Indang became an independent municipality in 1655 after being
                  separated from Silang, Cavite.
                </p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                <div className="text-5xl font-black text-amber-700 mb-2">
                  1897
                </div>
                <div className="text-amber-800 font-semibold mb-1">
                  Battle of Indang
                </div>
                <p className="text-amber-700 text-sm leading-relaxed">
                  Katipunan forces and Spanish troops clashed here in one of the
                  pivotal battles of the Philippine Revolution in Cavite.
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
                <div className="text-5xl font-black text-primary-700 mb-2">
                  1906
                </div>
                <div className="text-gray-800 font-semibold mb-1">
                  {t('history.charteredYear')}
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {t('history.charteredDesc')}
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
                <div className="text-5xl font-black text-primary-700 mb-2">
                  299m
                </div>
                <div className="text-gray-800 font-semibold mb-1">
                  {t('history.elevationLabel')}
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {t('history.elevationDesc')}
                </p>
              </div>
            </div>
          </div>

          {/* Heritage sites */}
          <div ref={heritageRef} className="reveal mb-16">
            <div className="flex items-center gap-2 mb-2">
              <Landmark className="h-4 w-4 text-primary-600" />
              <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">
                Heritage Sites
              </span>
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-6">
              Historical Landmarks
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {HERITAGE_SITES.map(site => {
                const Icon = site.icon;
                return (
                  <div
                    key={site.name}
                    className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 w-10 h-10 bg-primary-50 text-primary-700 rounded-lg flex items-center justify-center">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="font-bold text-gray-900 text-sm">
                            {site.name}
                          </h3>
                          <span
                            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${site.tagColor}`}
                          >
                            {site.tag}
                          </span>
                        </div>
                        <p className="text-xs text-primary-600 font-semibold mb-2 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {site.location}
                        </p>
                        <p className="text-sm text-gray-500 leading-relaxed">
                          {site.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Culture & traditions */}
          <div ref={cultureRef} className="reveal mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Weaving */}
              <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 bg-rose-100 rounded-lg flex items-center justify-center">
                    <Scissors className="h-4.5 w-4.5 text-rose-700" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-rose-600 uppercase tracking-widest block">
                      Traditional Craft
                    </span>
                    <h2 className="font-black text-gray-900 text-lg leading-tight">
                      The Art of Weaving
                    </h2>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Indang is home to skilled weavers who use traditional looms to
                  create intricate fabrics. This craft is preserved by the{' '}
                  <strong>MKC Weavers Association</strong> and celebrated
                  through <strong>Yndan</strong> — a contemporary brand that
                  blends heritage weaving with modern design.
                </p>
                <a
                  href="https://www.yndan.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-700 hover:text-rose-900 transition-colors"
                >
                  Visit Yndan <ChevronRight className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* Irok Festival */}
              <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Calendar className="h-4.5 w-4.5 text-orange-700" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-orange-600 uppercase tracking-widest block">
                      Annual Festival
                    </span>
                    <h2 className="font-black text-gray-900 text-lg leading-tight">
                      Irok Festival
                    </h2>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  Celebrated every <strong>December 1st — Indang Day</strong>.
                  The festival honors the <strong>Sugar Palm (Irok)</strong>{' '}
                  tree, featuring street dancing with costumes crafted from irok
                  fibers and leaves.
                </p>
                <div className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">
                  <Calendar className="h-3 w-3" />
                  Every December 1st
                </div>
              </div>
            </div>
          </div>

          {/* Agriculture */}
          <div ref={agriRef} className="reveal mb-16">
            <div className="flex items-center gap-2 mb-2">
              <Wheat className="h-4 w-4 text-primary-600" />
              <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">
                Produce & Agriculture
              </span>
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">
              Indang's Signature Products
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              The fertile volcanic soil and cool highland climate make Indang a
              primary source of high-value agricultural goods.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {AGRICULTURE.map(item => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.name}
                    className="bg-green-50 border border-green-100 rounded-xl p-5"
                  >
                    <div className="w-9 h-9 bg-green-100 text-green-700 rounded-lg flex items-center justify-center mb-3">
                      <Icon className="h-4.5 w-4.5" />
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

          {/* Springs & rivers */}
          <div ref={springsRef} className="reveal mb-12">
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Droplets className="h-4.5 w-4.5 text-blue-700" />
                </div>
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block">
                    Natural Beauty
                  </span>
                  <h2 className="font-black text-gray-900 text-xl leading-tight">
                    Rivers & Springs
                  </h2>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                True to its nickname, Indang is characterized by its abundance
                of flowing water. The town is bounded by the{' '}
                <strong>Ik-ik, Banaba, and Labac Rivers</strong>, which provided
                natural defenses throughout history.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl border border-blue-100 p-4">
                  <h3 className="font-bold text-gray-900 text-sm mb-1">
                    Natural Spring Resorts
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Famous for cold, chemical-free spring water resorts (Villa
                    Colmenar, Rio Villa) diverted directly from the ground.
                  </p>
                </div>
                <div className="bg-white rounded-xl border border-blue-100 p-4">
                  <h3 className="font-bold text-gray-900 text-sm mb-1">
                    Pantihan Falls
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Located in Barangay Pantihan — one of the last remaining
                    wild waterfalls in Cavite, over natural volcanic rock.
                  </p>
                </div>
                <div className="bg-white rounded-xl border border-blue-100 p-4">
                  <h3 className="font-bold text-gray-900 text-sm mb-1">
                    299.5m Elevation
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Cooler climate and fertile highland terrain ideal for
                    diverse agriculture and spring formation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer nav */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
            <Link
              to="/tourism"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-primary-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Tourism
            </Link>
            <Link
              to="/tourism/heritage"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-900 transition-colors sm:ml-auto"
            >
              Explore Heritage Sites
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
