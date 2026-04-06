import { Link } from 'react-router-dom';
import {
  MapPin,
  Landmark,
  Waves,
  Tractor,
  BedDouble,
  Utensils,
  Zap,
  ChevronRight,
  Facebook,
  ArrowRight,
} from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import establishmentsData from '../../../content/tourism/establishments.json';

const CATEGORY_NAV = [
  {
    id: 'heritage',
    label: 'Heritage & History',
    icon: Landmark,
    pill: 'bg-amber-100 text-amber-700',
  },
  {
    id: 'resorts',
    label: 'Resorts & Pools',
    icon: Waves,
    pill: 'bg-blue-100 text-blue-700',
  },
  {
    id: 'farms',
    label: 'Farms & Agri-Tour',
    icon: Tractor,
    pill: 'bg-green-100 text-green-700',
  },
  {
    id: 'events',
    label: 'Events & Glamping',
    icon: BedDouble,
    pill: 'bg-purple-100 text-purple-700',
  },
  {
    id: 'restaurants',
    label: 'Cafés & Dining',
    icon: Utensils,
    pill: 'bg-orange-100 text-orange-700',
  },
  {
    id: 'adventure',
    label: 'Adventure & Eco',
    icon: Zap,
    pill: 'bg-red-100 text-red-700',
  },
];

const HIGHLIGHTS = [
  {
    emoji: '⛪',
    title: 'St. Gregory the Great Parish',
    desc: 'Built in 1611 — one of the oldest churches in Cavite with a rose-colored stone facade.',
    tag: 'Heritage',
    tagColor: 'bg-amber-100 text-amber-700',
    href: '/tourism/heritage',
  },
  {
    emoji: '🗿',
    title: 'Bonifacio Shrine',
    desc: 'The exact site where Andres Bonifacio was arrested in April 1897, now a national historical marker.',
    tag: 'History',
    tagColor: 'bg-amber-100 text-amber-700',
    href: '/tourism/heritage',
  },
  {
    emoji: '💧',
    title: 'Natural Spring Resorts',
    desc: 'Cold, chemical-free flowing spring water resorts — the signature experience of the Town of Many Springs.',
    tag: 'Resorts',
    tagColor: 'bg-blue-100 text-blue-700',
    href: '/tourism/resorts',
  },
  {
    emoji: '🌿',
    title: 'Agri-Eco Tourism',
    desc: 'Farm stays, orchards, and the CvSU Agri-Eco Tourism Park — unique farm-to-table experiences.',
    tag: 'Farms',
    tagColor: 'bg-green-100 text-green-700',
    href: '/tourism/farms',
  },
];

export default function TourismSection() {
  const headingRef = useScrollReveal<HTMLDivElement>();
  const highlightRef = useScrollReveal<HTMLDivElement>();
  const navRef = useScrollReveal<HTMLDivElement>();

  const total = establishmentsData.establishments.length;

  return (
    <section className="bg-gray-50 border-b border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div
          ref={headingRef}
          className="reveal flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="h-4 w-4 text-primary-600" />
              <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">
                Tourism
              </span>
            </div>
            <h2 className="text-2xl font-black text-gray-900">
              Discover Indang
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              "Ang Bayan ng Maraming Bukal" · {total} registered tourism
              establishments
            </p>
          </div>
          <Link
            to="/tourism"
            className="shrink-0 inline-flex items-center gap-1.5 text-sm font-bold text-primary-700 hover:text-primary-900 transition-colors"
          >
            View all tourism
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Highlight cards */}
        <div
          ref={highlightRef}
          className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {HIGHLIGHTS.map(h => (
            <Link
              key={h.title}
              to={h.href}
              className="group bg-white rounded-xl border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all duration-200 p-5 flex flex-col gap-3"
            >
              <div className="text-3xl">{h.emoji}</div>
              <div>
                <span
                  className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-2 ${h.tagColor}`}
                >
                  {h.tag}
                </span>
                <h3 className="font-black text-sm text-gray-900 leading-snug">
                  {h.title}
                </h3>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed flex-1">
                {h.desc}
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-primary-600 group-hover:text-primary-800 transition-colors">
                Explore <ChevronRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>

        {/* Category navigation row */}
        <div ref={navRef} className="reveal">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
            Browse by category
          </p>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_NAV.map(({ id, label, icon: Icon, pill }) => {
              const count = establishmentsData.establishments.filter(
                e => e.category === id
              ).length;
              return (
                <Link
                  key={id}
                  to={`/tourism/${id}`}
                  className="group inline-flex items-center gap-2 bg-white border border-gray-100 hover:border-primary-200 hover:shadow-sm rounded-lg px-4 py-2.5 transition-all duration-200"
                >
                  <div className="bg-primary-50 text-primary-700 w-6 h-6 rounded-md flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800">
                    {label}
                  </span>
                  <span
                    className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${pill}`}
                  >
                    {count}
                  </span>
                </Link>
              );
            })}
            <Link
              to="/tourism"
              className="inline-flex items-center gap-2 bg-primary-700 hover:bg-primary-800 text-white rounded-lg px-4 py-2.5 text-sm font-bold transition-colors"
            >
              <MapPin className="h-3.5 w-3.5" />
              All {total}
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Tourism Office link */}
        <div className="mt-6 pt-5 border-t border-gray-200 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            Source: Indang Tourism Office — 2026 Official List
          </p>
          <a
            href="https://www.facebook.com/TourismIndang"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
          >
            <Facebook className="h-3.5 w-3.5" />
            @TourismIndang
          </a>
        </div>
      </div>
    </section>
  );
}
