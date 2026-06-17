import { Link } from 'react-router-dom';
import {
  MapPin,
  Landmark,
  Waves,
  Tractor,
  BedDouble,
  Utensils,
  Zap,
  ArrowRight,
  Facebook,
} from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import establishmentsData from '../../../content/tourism/establishments.json';

const CATEGORIES = [
  {
    id: 'heritage',
    label: 'Heritage & History',
    icon: Landmark,
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-700',
    countBg: 'bg-amber-100 text-amber-700',
    hoverBorder: 'hover:border-amber-300',
  },
  {
    id: 'resorts',
    label: 'Resorts & Pools',
    icon: Waves,
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-700',
    countBg: 'bg-blue-100 text-blue-700',
    hoverBorder: 'hover:border-blue-300',
  },
  {
    id: 'farms',
    label: 'Farms & Agri-Tour',
    icon: Tractor,
    bg: 'bg-green-50',
    border: 'border-green-200',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-700',
    countBg: 'bg-green-100 text-green-700',
    hoverBorder: 'hover:border-green-300',
  },
  {
    id: 'events',
    label: 'Events & Glamping',
    icon: BedDouble,
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-700',
    countBg: 'bg-purple-100 text-purple-700',
    hoverBorder: 'hover:border-purple-300',
  },
  {
    id: 'restaurants',
    label: 'Cafés & Dining',
    icon: Utensils,
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-700',
    countBg: 'bg-orange-100 text-orange-700',
    hoverBorder: 'hover:border-orange-300',
  },
  {
    id: 'adventure',
    label: 'Adventure & Eco',
    icon: Zap,
    bg: 'bg-red-50',
    border: 'border-red-200',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-700',
    countBg: 'bg-red-100 text-red-700',
    hoverBorder: 'hover:border-red-300',
  },
];

export default function TourismSection() {
  const headingRef = useScrollReveal<HTMLDivElement>();
  const gridRef = useScrollReveal<HTMLDivElement>();

  const total = establishmentsData.establishments.length;

  return (
    <section className="bg-white border-b border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
              "Ang Bayan ng Maraming Bukal" &middot; {total} registered
              establishments across {CATEGORIES.length} categories
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

        <div
          ref={gridRef}
          className="reveal-stagger grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
        >
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            const count = establishmentsData.establishments.filter(
              e => e.category === cat.id
            ).length;
            return (
              <Link
                key={cat.id}
                to={`/tourism/${cat.id}`}
                className={`group flex flex-col items-center text-center gap-3 rounded-2xl border p-5 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${cat.bg} ${cat.border} ${cat.hoverBorder}`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${cat.iconBg} ${cat.iconColor} group-hover:scale-110 transition-transform duration-200`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <p className="text-xs font-bold text-gray-800 leading-snug">
                  {cat.label}
                </p>
                <span
                  className={`text-xs font-black px-2.5 py-0.5 rounded-full ${cat.countBg}`}
                >
                  {count} places
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
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
