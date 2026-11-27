import {
  BedDouble,
  CalendarDays,
  ChartColumn,
  Landmark,
  MapPin,
  Newspaper,
  ScrollText,
  Tractor,
  Utensils,
  Waves,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../ui/Breadcrumbs';
import Reveal from '../ui/Reveal';
import { useTranslation } from '../../hooks/useTranslation';
import establishmentsData from '../../../content/tourism/establishments.json';

type Icon = React.ComponentType<{ className?: string }>;
type Pair = [en: string, fil: string];

interface Establishment {
  name: string;
  category: string;
  address?: string;
  image?: string;
}

const CATEGORY_COPY: Record<string, { icon: Icon; desc: Pair }> = {
  heritage: {
    icon: Landmark,
    desc: [
      'Shrines, colonial churches, a community museum and living craft traditions.',
      'Mga dambana, simbahang kolonyal, museo ng pamayanan at buhay na tradisyon ng sining.',
    ],
  },
  resorts: {
    icon: Waves,
    desc: [
      'Spring-fed pools and private resorts with cold, natural water.',
      'Mga spring-fed na pool at pribadong resort na may malamig at likas na tubig.',
    ],
  },
  farms: {
    icon: Tractor,
    desc: [
      'Agri-eco parks, farmstays, orchards and farm-to-table experiences.',
      'Mga agri-eco park, farmstay, taniman at karanasang bukid-tungo-sa-lamesa.',
    ],
  },
  events: {
    icon: BedDouble,
    desc: [
      'Function halls, glamping cabins and vacation home rentals.',
      'Mga bulwagan, glamping cabin at paupahang bahay-bakasyunan.',
    ],
  },
  restaurants: {
    icon: Utensils,
    desc: [
      'Cafés, restaurants and caterers serving local Cavite cuisine.',
      'Mga café, kainan at caterer na naghahain ng lutuing Cavite.',
    ],
  },
  adventure: {
    icon: MapPin,
    desc: [
      'Outdoor parks with adventure and eco activities.',
      'Mga parkeng panlabas na may pakikipagsapalaran at gawaing pang-ekolohiya.',
    ],
  },
};

const MORE: {
  to: string;
  icon: Icon;
  title: Pair;
  desc: Pair;
}[] = [
  {
    to: '/tourism/history',
    icon: ScrollText,
    title: ['History of Indang', 'Kasaysayan ng Indang'],
    desc: [
      'From pre-colonial settlement to today, in one timeline.',
      'Mula sa sinaunang pamayanan hanggang ngayon, sa iisang timeline.',
    ],
  },
  {
    to: '/statistics',
    icon: ChartColumn,
    title: ['Municipal profile & data', 'Profile at datos ng munisipalidad'],
    desc: [
      'Population, land area and data for all 36 barangays.',
      'Populasyon, lawak ng lupa at datos ng 36 barangay.',
    ],
  },
  {
    to: '/calendar',
    icon: CalendarDays,
    title: ['Events calendar', 'Kalendaryo ng mga kaganapan'],
    desc: [
      'Festivals, health missions, drills and service interruptions.',
      'Mga pista, medical mission, drill at pagkaantala ng serbisyo.',
    ],
  },
  {
    to: '/announcements',
    icon: Newspaper,
    title: ['News & announcements', 'Balita at anunsyo'],
    desc: [
      'Advisories from the LGU and local offices, linked to the original post.',
      'Mga abiso mula sa LGU at mga lokal na tanggapan, may link sa orihinal.',
    ],
  },
];

/** Explore Indang: places to visit, a few featured spots, and local context. */
export default function ExploreHub() {
  const { currentLanguage } = useTranslation();
  const isFil = currentLanguage === 'fil';
  const i = isFil ? 1 : 0;

  const establishments = establishmentsData.establishments as Establishment[];
  const categories = establishmentsData.categories as {
    id: string;
    label: string;
  }[];
  const countFor = (id: string) =>
    establishments.filter(e => e.category === id).length;
  const featured = establishments.filter(e => e.image).slice(0, 3);

  return (
    <main className="flex-grow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        <Breadcrumbs />
        <div className="mt-6 max-w-2xl">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900">
            {isFil ? 'Tuklasin ang Indang' : 'Explore Indang'}
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            {isFil
              ? 'Mga lugar na bibisitahin, kasaysayan ng bayan, at kung ano ang nangyayari ngayon.'
              : 'Places to visit, the story of the town, and what is happening now.'}
          </p>
          <Link
            to="/tourism"
            className="mt-5 inline-flex min-h-12 items-center rounded-full bg-primary-800 px-7 text-sm font-semibold text-white hover:bg-primary-700"
          >
            {isFil
              ? `Tingnan ang lahat ng ${establishments.length} lugar`
              : `Browse all ${establishments.length} places`}
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        <section aria-labelledby="explore-places">
          <h2
            id="explore-places"
            className="border-b border-line pb-3 text-2xl font-bold tracking-tight text-gray-900"
          >
            {isFil ? 'Mga lugar na bibisitahin' : 'Places to visit'}
          </h2>
          <Reveal
            stagger
            className="mt-4 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {categories.map(cat => {
              const copy = CATEGORY_COPY[cat.id];
              const Icon = copy?.icon ?? MapPin;
              const count = countFor(cat.id);
              return (
                <Link
                  key={cat.id}
                  to={`/tourism/${cat.id}`}
                  className="flex items-start gap-4 rounded-3xl border border-line bg-white p-5 transition-colors hover:border-primary-300"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-800">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-lg font-semibold leading-snug text-gray-900">
                      {cat.label}
                    </span>
                    {copy && (
                      <span className="mt-1 block text-sm text-gray-600">
                        {copy.desc[i]}
                      </span>
                    )}
                    {count > 0 && (
                      <span className="mt-2 inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-800">
                        {count}{' '}
                        {isFil ? 'lugar' : count === 1 ? 'place' : 'places'}
                      </span>
                    )}
                  </span>
                </Link>
              );
            })}
          </Reveal>
        </section>

        {featured.length > 0 && (
          <section aria-labelledby="explore-featured">
            <h2
              id="explore-featured"
              className="border-b border-line pb-3 text-2xl font-bold tracking-tight text-gray-900"
            >
              {isFil ? 'Magandang simulan dito' : 'A good place to start'}
            </h2>
            <Reveal stagger className="mt-4 grid gap-3.5 md:grid-cols-3">
              {featured.map(place => (
                <Link
                  key={place.name}
                  to={`/tourism/${place.category}`}
                  className="group overflow-hidden rounded-3xl border border-line bg-white transition-colors hover:border-primary-300"
                >
                  <img
                    src={place.image}
                    alt={place.name}
                    loading="lazy"
                    className="h-44 w-full object-cover"
                  />
                  <span className="block p-5">
                    <span className="block text-lg font-semibold leading-snug text-gray-900">
                      {place.name}
                    </span>
                    {place.address && (
                      <span className="mt-1 block text-sm text-gray-600">
                        {place.address}
                      </span>
                    )}
                  </span>
                </Link>
              ))}
            </Reveal>
          </section>
        )}

        <section aria-labelledby="explore-more">
          <h2
            id="explore-more"
            className="border-b border-line pb-3 text-2xl font-bold tracking-tight text-gray-900"
          >
            {isFil ? 'Kilalanin ang Indang' : 'Know Indang'}
          </h2>
          <Reveal stagger className="mt-4 grid gap-3.5 md:grid-cols-2">
            {MORE.map(({ to, icon: Icon, title, desc }) => (
              <Link
                key={to}
                to={to}
                className="flex items-start gap-4 rounded-3xl border border-line bg-white p-5 transition-colors hover:border-primary-300"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-800">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-lg font-semibold leading-snug text-gray-900">
                    {title[i]}
                  </span>
                  <span className="mt-1 block text-sm text-gray-600">
                    {desc[i]}
                  </span>
                </span>
              </Link>
            ))}
          </Reveal>
        </section>
      </div>
    </main>
  );
}
