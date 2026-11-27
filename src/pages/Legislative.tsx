import {
  BookOpen,
  ExternalLink,
  FileSearch,
  Megaphone,
  Scale,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Reveal from '../components/ui/Reveal';
import SEO from '../components/SEO';
import { useTranslation } from '../hooks/useTranslation';

type Pair = [en: string, fil: string];

interface Action {
  to: string;
  external: boolean;
  icon: React.ComponentType<{ className?: string }>;
  title: Pair;
  desc: Pair;
}

const ACTIONS: Action[] = [
  {
    to: '/government/departments/officials',
    external: false,
    icon: Users,
    title: ['Councilors & committees', 'Mga konsehal at komite'],
    desc: [
      'Who sits in the council and which committees each councilor serves on.',
      'Sino ang nasa konseho at sa anong mga komite naglilingkod ang bawat konsehal.',
    ],
  },
  {
    to: 'https://lawphil.net/statutes/repacts/ra1991/ra_7160_1991.html',
    external: true,
    icon: BookOpen,
    title: [
      'Local Government Code (RA 7160)',
      'Local Government Code (RA 7160)',
    ],
    desc: [
      'The law that sets the council’s powers, from ordinances to the budget.',
      'Ang batas na nagtatakda ng kapangyarihan ng konseho, mula sa ordinansa hanggang sa badyet.',
    ],
  },
  {
    to: 'https://www.foi.gov.ph',
    external: true,
    icon: FileSearch,
    title: ['File an FOI request', 'Maghain ng FOI request'],
    desc: [
      'Ask for copies of ordinances, resolutions and session records.',
      'Humingi ng kopya ng ordinansa, resolusyon at tala ng sesyon.',
    ],
  },
  {
    to: '/announcements',
    external: false,
    icon: Megaphone,
    title: ['News & announcements', 'Balita at anunsyo'],
    desc: [
      'Notices from the LGU and local offices, linked to the original post.',
      'Mga abiso mula sa LGU at mga lokal na tanggapan, may link sa orihinal.',
    ],
  },
];

/** Sangguniang Bayan overview: who sits on it, what it does, how to get documents. */
export default function Legislative() {
  const { currentLanguage } = useTranslation();
  const isFil = currentLanguage === 'fil';
  const i = isFil ? 1 : 0;

  const facts: { value: string; label: Pair }[] = [
    { value: '8', label: ['Elected councilors', 'Inihalal na konsehal'] },
    {
      value: '36',
      label: ['Barangays represented', 'Barangay na kinakatawan'],
    },
  ];

  return (
    <>
      <SEO
        title={isFil ? 'Pambatas — Sangguniang Bayan' : 'Legislative'}
        description="The Sangguniang Bayan of Indang, Cavite: who sits on the council, what it does, and how to get ordinances and resolutions."
        keywords="Indang Sangguniang Bayan, ordinances, resolutions, legislative, municipal council"
      />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
          <Breadcrumbs />
          <div className="mt-6 max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3.5 py-1.5 text-xs font-semibold text-primary-800">
              <Scale className="h-4 w-4" aria-hidden />
              Sangguniang Bayan ng Indang
            </span>
            <h1 className="mt-4 text-3xl sm:text-5xl font-bold tracking-tight text-gray-900">
              {isFil ? 'Pambatas' : 'Legislative'}
            </h1>
            <p className="mt-3 text-lg text-gray-600">
              {isFil
                ? 'Ang Konseho ng Munisipyo ng Indang: sino ang bumubuo rito, ano ang ginagawa nito, at paano makakakuha ng mga ordinansa at resolusyon.'
                : 'The Municipal Council of Indang: who sits on it, what it does, and how to get its ordinances and resolutions.'}
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <Link
                to="/government/departments/officials"
                className="inline-flex min-h-12 items-center rounded-full bg-primary-800 px-7 text-sm font-semibold text-white hover:bg-primary-700"
              >
                {isFil ? 'Kilalanin ang mga konsehal' : 'Meet the councilors'}
              </Link>
              <Link
                to="/contact"
                className="inline-flex min-h-12 items-center rounded-full border border-line bg-white px-7 text-sm font-semibold text-gray-900 hover:bg-primary-50"
              >
                {isFil ? 'Humingi ng dokumento' : 'Request a document'}
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
          <section className="grid gap-5 lg:grid-cols-[1.4fr_1fr] items-start">
            <div className="rounded-3xl border border-line bg-white p-6 sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                {isFil
                  ? 'Tungkol sa Sangguniang Bayan'
                  : 'About the Sangguniang Bayan'}
              </h2>
              <p className="mt-3 text-[1.0625rem] leading-8 text-gray-700">
                {isFil
                  ? 'Ang Sangguniang Bayan ang pambatasang lupon ng Munisipalidad ng Indang. Ito ay nagpapatupad ng mga ordinansa, nagpapasya ng mga resolusyon, at nagsasagawa ng iba pang pambatasang kapangyarihan gaya ng itinatakda ng Local Government Code of 1991 (RA 7160).'
                  : 'The Sangguniang Bayan is the legislative body of the Municipality of Indang. It enacts ordinances, approves resolutions, and exercises other legislative powers as provided under the Local Government Code of 1991 (RA 7160).'}
              </p>
              <p className="mt-3 text-[1.0625rem] leading-8 text-gray-700">
                {isFil
                  ? 'Binubuo ito ng mga inihalal na konsehal na kumakatawan sa 36 na barangay ng Indang at sa mahigit 68,000 residente nito (senso ng 2020).'
                  : 'It is made up of elected councilors who represent Indang’s 36 barangays and its more than 68,000 residents (2020 census).'}
              </p>
            </div>
            <ul className="grid grid-cols-2 gap-3.5 lg:grid-cols-1">
              {facts.map(f => (
                <li
                  key={f.label[0]}
                  className="rounded-3xl border border-line bg-white p-5"
                >
                  <span className="block text-3xl font-bold tracking-tight text-primary-800">
                    {f.value}
                  </span>
                  <span className="mt-1 block text-sm text-gray-600">
                    {f.label[i]}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="leg-actions">
            <h2
              id="leg-actions"
              className="border-b border-line pb-3 text-2xl font-bold tracking-tight text-gray-900"
            >
              {isFil ? 'Ano ang magagawa mo rito' : 'What you can do here'}
            </h2>
            <Reveal stagger className="mt-4 grid gap-3.5 sm:grid-cols-2">
              {ACTIONS.map(({ to, external, icon: Icon, title, desc }) => {
                const body = (
                  <>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-800">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-1.5 text-lg font-semibold leading-snug text-gray-900">
                        {title[i]}
                        {external && (
                          <ExternalLink
                            className="h-3.5 w-3.5 text-gray-500"
                            aria-label={
                              isFil ? 'panlabas na link' : 'external link'
                            }
                          />
                        )}
                      </span>
                      <span className="mt-1 block text-sm text-gray-600">
                        {desc[i]}
                      </span>
                    </span>
                  </>
                );
                const cls =
                  'flex items-start gap-4 rounded-3xl border border-line bg-white p-5 transition-colors hover:border-primary-300';
                return external ? (
                  <a
                    key={to}
                    href={to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cls}
                  >
                    {body}
                  </a>
                ) : (
                  <Link key={to} to={to} className={cls}>
                    {body}
                  </Link>
                );
              })}
            </Reveal>
          </section>

          <section className="rounded-3xl bg-warning-50 p-6 sm:p-8">
            <h2 className="text-xl font-bold tracking-tight text-gray-900">
              {isFil
                ? 'Wala pa rito ang mga ordinansa at resolusyon'
                : 'Ordinances and resolutions are not published here yet'}
            </h2>
            <p className="mt-2 max-w-3xl text-gray-700">
              {isFil
                ? 'Hindi pa naglalathala ang portal na ito ng mga dokumento ng Sangguniang Bayan. Para humingi ng kopya, makipag-ugnayan sa Munisipyo o maghain ng FOI request.'
                : 'This portal does not publish Sangguniang Bayan documents yet. To get a copy, contact the Municipal Hall or file an FOI request.'}
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
