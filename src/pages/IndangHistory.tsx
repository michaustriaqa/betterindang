import { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Landmark, Calendar, ArrowLeft } from 'lucide-react';
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
  const timelineRef = useScrollReveal<HTMLDivElement>();

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'History of Indang, Cavite',
    description:
      'The history of Indang, Cavite — from pre-colonial settlements and the Battle of Indang in 1897 to modern day.',
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
        title="History of Indang — Walang Tinag"
        description="The history of Indang, Cavite — from pre-colonial Tagalog settlements and the Battle of Indang in 1897 to its founding as Don Severino Agricultural College and modern-day municipality."
        keywords="Indang history, Cavite history, Bonifacio shrine, Battle of Indang, Walang Tinag, Don Severino Agricultural College, CvSU"
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
              <div className="shrink-0">
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
            ref={timelineRef}
            className="reveal grid grid-cols-1 lg:grid-cols-3 gap-12"
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

          {/* Footer nav */}
          <div className="flex flex-col sm:flex-row gap-3 mt-12 pt-6 border-t border-gray-100">
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
