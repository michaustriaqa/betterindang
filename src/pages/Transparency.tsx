import {
  FileText,
  DollarSign,
  Eye,
  Download,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Reveal from '../components/ui/Reveal';
import { useTranslation } from '../hooks/useTranslation';

type Pair = [en: string, fil: string];

interface Resource {
  title: Pair;
  desc: Pair;
  href: string;
  external: boolean;
  icon: React.ComponentType<{ className?: string }>;
}

/**
 * Where the documents actually live. Indang does not host its own document
 * library yet, so each card points to the national portal that publishes it.
 */
const RESOURCES: Resource[] = [
  {
    title: ['Budget & Full Disclosure', 'Badyet at Full Disclosure'],
    desc: [
      'Annual budget, income and expenditure statements and other postings local governments must make public, on the DILG Full Disclosure Policy portal.',
      'Taunang badyet, ulat ng kita at gastos, at iba pang dapat isapubliko ng lokal na pamahalaan, sa portal ng DILG Full Disclosure Policy.',
    ],
    href: 'https://fdp.dilg.gov.ph',
    external: true,
    icon: DollarSign,
  },
  {
    title: [
      'Municipal data & statistics',
      'Datos at estadistika ng munisipalidad',
    ],
    desc: [
      'Population, income class, land area and data for all 36 barangays.',
      'Populasyon, uri ng bayan, lawak ng lupa at datos ng 36 barangay.',
    ],
    href: '/statistics',
    external: false,
    icon: FileText,
  },
  {
    title: ['Procurement & bids', 'Pagkuha at pag-bid'],
    desc: [
      'Procurement notices and bid results are published on PhilGEPS.',
      'Ang mga abiso sa pagkuha at resulta ng bid ay nakalathala sa PhilGEPS.',
    ],
    href: 'https://www.philgeps.gov.ph',
    external: true,
    icon: ShieldCheck,
  },
  {
    title: ['Freedom of Information', 'Freedom of Information'],
    desc: [
      'File a request for information with any government office.',
      'Maghain ng kahilingan ng impormasyon sa anumang tanggapan ng pamahalaan.',
    ],
    href: 'https://www.foi.gov.ph',
    external: true,
    icon: Eye,
  },
  {
    title: ['Local finance (BLGF)', 'Pananalapi ng lokal na pamahalaan (BLGF)'],
    desc: [
      'Finance reports and data from the Bureau of Local Government Finance.',
      'Mga ulat at datos sa pananalapi mula sa Bureau of Local Government Finance.',
    ],
    href: 'https://blgf.gov.ph',
    external: true,
    icon: Download,
  },
  {
    title: ['Audit reports (COA)', 'Mga ulat ng awdit (COA)'],
    desc: [
      'Annual audit reports on local governments from the Commission on Audit.',
      'Taunang ulat ng awdit sa mga lokal na pamahalaan mula sa Commission on Audit.',
    ],
    href: 'https://www.coa.gov.ph',
    external: true,
    icon: ShieldCheck,
  },
  {
    title: ['National budget (DBM)', 'Pambansang badyet (DBM)'],
    desc: [
      'Department of Budget and Management data on national transfers and budgets.',
      'Datos ng Department of Budget and Management sa pambansang badyet at ipinapadalang pondo.',
    ],
    href: 'https://www.dbm.gov.ph',
    external: true,
    icon: DollarSign,
  },
  {
    title: ['Open Data Philippines', 'Open Data Philippines'],
    desc: [
      'Government datasets published for public use.',
      'Mga dataset ng pamahalaan na inilathala para sa publiko.',
    ],
    href: 'https://data.gov.ph',
    external: true,
    icon: Download,
  },
  {
    title: ['News & announcements', 'Balita at anunsyo'],
    desc: [
      'Advisories and notices from the LGU and local offices, each linked to its original post.',
      'Mga abiso mula sa LGU at mga lokal na tanggapan, may link sa orihinal na post.',
    ],
    href: '/announcements',
    external: false,
    icon: FileText,
  },
];

export default function Transparency() {
  const { currentLanguage } = useTranslation();
  const isFil = currentLanguage === 'fil';

  return (
    <>
      <SEO
        title={isFil ? 'Katapatan at Transparency' : 'Transparency'}
        description={
          isFil
            ? 'Saan makikita ang badyet, abiso sa pagkuha, ulat ng awdit, at kung paano maghain ng FOI request para sa Munisipalidad ng Indang, Cavite.'
            : 'Where to find budget disclosures, procurement notices, audit reports and how to file an FOI request for the Municipality of Indang, Cavite.'
        }
        keywords="Indang transparency, budget, FOI, public documents, accountability, Cavite"
      />
      <main className="flex-grow">
        {/* Page Header */}
        <div className="relative bg-white border-b border-line py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-2">
              <Eye className="h-7 w-7 text-primary-700" />
              <span className="text-primary-700 text-sm font-medium uppercase tracking-widest">
                {isFil ? 'Bukas na Pamahalaan' : 'Open Government'}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-3">
              {isFil ? 'Katapatan at Transparency' : 'Transparency'}
            </h1>
            <p className="text-gray-600 text-lg max-w-xl">
              {isFil
                ? 'Saan makikita ang badyet, abiso sa pagkuha, ulat ng awdit, at kung paano humingi ng impormasyon mula sa Munisipalidad ng Indang.'
                : 'Where to find budget disclosures, procurement notices and audit reports, and how to request information from the Municipality of Indang.'}
            </p>
          </div>
        </div>

        {/* Commitment banner */}
        <Reveal
          as="section"
          className="bg-primary-50 border-b border-primary-100 py-8"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <ShieldCheck className="h-8 w-8 text-primary-600 shrink-0" />
            <div>
              <h2 className="font-black text-gray-900 text-base">
                {isFil
                  ? 'Ano ang Full Disclosure Policy'
                  : 'What the Full Disclosure Policy requires'}
              </h2>
              <p className="text-sm text-gray-600 mt-0.5">
                {isFil
                  ? 'Inaatasan ng DILG Full Disclosure Policy ang mga lokal na pamahalaan na isapubliko ang kanilang datos sa pananalapi at pagganap. Hindi pa nagho-host ng sariling aklatan ng dokumento ang Indang sa portal na ito, kaya itinuturo ng mga link sa ibaba ang mga pambansang portal kung saan ito nakalathala.'
                  : "The DILG Full Disclosure Policy requires local governments to make their financial and performance data public. This portal does not host Indang's own document library yet, so the links below point to the national portals where it is published."}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Where to find documents */}
        <Reveal as="section" className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">
              {isFil
                ? 'Saan makikita ang mga dokumento'
                : 'Where to find documents'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {RESOURCES.map(({ title, desc, href, external, icon: Icon }) => {
                const body = (
                  <>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-800">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-1.5 text-lg font-semibold leading-snug text-gray-900">
                        {title[isFil ? 1 : 0]}
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
                        {desc[isFil ? 1 : 0]}
                      </span>
                    </span>
                  </>
                );
                const cls =
                  'flex items-start gap-4 rounded-3xl border border-line bg-white p-5 transition-colors hover:border-primary-300';
                return external ? (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cls}
                  >
                    {body}
                  </a>
                ) : (
                  <Link key={href} to={href} className={cls}>
                    {body}
                  </Link>
                );
              })}
            </div>
          </div>
        </Reveal>
      </main>
    </>
  );
}
