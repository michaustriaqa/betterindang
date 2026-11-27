import {
  Building2,
  CalendarDays,
  ChartColumn,
  ExternalLink,
  Landmark,
  Newspaper,
  Phone,
  Scale,
  Users,
  Wallet,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../ui/Breadcrumbs';
import Reveal from '../ui/Reveal';
import { useTranslation } from '../../hooks/useTranslation';

type Icon = React.ComponentType<{ className?: string }>;

interface Item {
  to: string;
  icon: Icon;
  title: [string, string];
  desc: [string, string];
}

interface Group {
  id: string;
  title: [string, string];
  items: Item[];
}

const GROUPS: Group[] = [
  {
    id: 'people',
    title: ['People & offices', 'Mga tao at tanggapan'],
    items: [
      {
        to: '/government/departments/officials',
        icon: Users,
        title: ['Local officials', 'Mga lokal na opisyal'],
        desc: [
          'Who sits in the Sangguniang Bayan and who leads the municipality.',
          'Sino ang nasa Sangguniang Bayan at sino ang namumuno sa munisipalidad.',
        ],
      },
      {
        to: '/government/departments/executive',
        icon: Building2,
        title: ['Office directory', 'Direktoryo ng mga tanggapan'],
        desc: [
          'Department contacts, national agencies and emergency hotlines.',
          'Mga contact ng departamento, ahensiya ng pambansang pamahalaan at hotline.',
        ],
      },
      {
        to: '/government/legislative',
        icon: Scale,
        title: ['Municipal Council', 'Sangguniang Bayan'],
        desc: [
          'Ordinances and resolutions passed for the municipality.',
          'Mga ordinansa at resolusyong ipinasa para sa munisipalidad.',
        ],
      },
    ],
  },
  {
    id: 'accountability',
    title: ['Money & accountability', 'Pondo at pananagutan'],
    items: [
      {
        to: '/transparency',
        icon: Wallet,
        title: ['Budget & transparency', 'Badyet at transparency'],
        desc: [
          'Where to find budget disclosures, procurement notices, audit reports and how to file an FOI request.',
          'Saan makikita ang badyet, abiso sa pagkuha, ulat ng awdit at kung paano maghain ng FOI request.',
        ],
      },
      {
        to: '/statistics',
        icon: ChartColumn,
        title: ['Data & statistics', 'Datos at estadistika'],
        desc: [
          'Population, income class, land area and data for all 36 barangays.',
          'Populasyon, uri ng bayan, lawak ng lupa at datos ng 36 barangay.',
        ],
      },
    ],
  },
  {
    id: 'updates',
    title: ['Stay informed', 'Manatiling may alam'],
    items: [
      {
        to: '/announcements',
        icon: Newspaper,
        title: ['News & announcements', 'Balita at anunsyo'],
        desc: [
          'Advisories from the LGU, MDRRMO, RHU, Police and Water District.',
          'Mga abiso mula sa LGU, MDRRMO, RHU, Pulisya at Water District.',
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
        to: '/contact',
        icon: Phone,
        title: ['Contact the Municipal Hall', 'Makipag-ugnayan sa Munisipyo'],
        desc: [
          'Address, phone, office hours and emergency hotlines.',
          'Address, telepono, oras ng opisina at mga hotline.',
        ],
      },
    ],
  },
];

const NATIONAL = [
  { label: 'Freedom of Information', href: 'https://www.foi.gov.ph' },
  { label: 'PhilGEPS', href: 'https://www.philgeps.gov.ph' },
  { label: 'COA', href: 'https://www.coa.gov.ph' },
  { label: 'DILG', href: 'https://dilg.gov.ph' },
];

/**
 * Government index: everything about how Indang is run, in three groups,
 * replacing the old flat grid of mostly empty categories.
 */
export default function GovernmentHub() {
  const { currentLanguage } = useTranslation();
  const isFil = currentLanguage === 'fil';
  const i = isFil ? 1 : 0;

  return (
    <main className="flex-grow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        <Breadcrumbs />
        <div className="mt-6 max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3.5 py-1.5 text-xs font-semibold text-primary-800">
            <Landmark className="h-4 w-4" aria-hidden />
            {isFil ? 'Munisipalidad ng Indang' : 'Municipality of Indang'}
          </span>
          <h1 className="mt-4 text-3xl sm:text-5xl font-bold tracking-tight text-gray-900">
            {isFil ? 'Pamahalaan' : 'Government'}
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            {isFil
              ? 'Sino ang namumuno, saan napupunta ang pondo, at paano malalaman ang nangyayari sa Indang.'
              : 'Who runs Indang, where the money goes, and how to keep up with what is happening.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        {GROUPS.map(g => (
          <section key={g.id} aria-labelledby={`gov-${g.id}`}>
            <h2
              id={`gov-${g.id}`}
              className="border-b border-line pb-3 text-2xl font-bold tracking-tight text-gray-900"
            >
              {g.title[i]}
            </h2>
            <Reveal stagger className="mt-4 grid gap-3.5 md:grid-cols-3">
              {g.items.map(({ to, icon: Icon, title, desc }) => (
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
        ))}

        <section className="rounded-3xl bg-white border border-line p-6 sm:p-8">
          <h2 className="text-xl font-bold tracking-tight text-gray-900">
            {isFil ? 'Mga pambansang mapagkukunan' : 'National resources'}
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            {isFil
              ? 'Mga opisyal na website ng pambansang pamahalaan na may kaugnayan sa pananagutan ng LGU.'
              : 'Official national sites related to local government accountability.'}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {NATIONAL.map(n => (
              <li key={n.href}>
                <a
                  href={n.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-ground px-5 text-sm font-semibold text-gray-900 hover:bg-primary-50"
                >
                  {n.label}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
