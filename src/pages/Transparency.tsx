import {
  FileText,
  DollarSign,
  Eye,
  Download,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const CATEGORIES = [
  {
    title: 'Budget & Finance',
    icon: DollarSign,
    color: 'text-green-700',
    bg: 'bg-green-50',
    border: 'border-green-400',
    desc: 'Annual budgets, financial statements, and expenditure reports of the Municipality of Indang.',
    href: '/government/transparency-documents',
  },
  {
    title: 'Annual Reports',
    icon: FileText,
    color: 'text-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-400',
    desc: 'Accomplishment reports, state of the municipality addresses, and performance assessments.',
    href: '/government/reports-and-statistics',
  },
  {
    title: 'Procurement & Bids',
    icon: ShieldCheck,
    color: 'text-indigo-700',
    bg: 'bg-indigo-50',
    border: 'border-indigo-400',
    desc: 'Notices of procurement, bid results, and PhilGEPS-related announcements.',
    href: '/government/transparency-documents',
  },
  {
    title: 'FOI Releases',
    icon: Eye,
    color: 'text-purple-700',
    bg: 'bg-purple-50',
    border: 'border-purple-400',
    desc: 'Documents released under the Freedom of Information program for public accountability.',
    href: '/government/transparency-documents',
  },
  {
    title: 'DBM / BLGF Reports',
    icon: Download,
    color: 'text-orange-700',
    bg: 'bg-orange-50',
    border: 'border-orange-400',
    desc: 'Submissions to the Department of Budget and Management and Bureau of Local Government Finance.',
    href: '/government/transparency-documents',
  },
  {
    title: 'DILG Compliance',
    icon: ShieldCheck,
    color: 'text-teal-700',
    bg: 'bg-teal-50',
    border: 'border-teal-400',
    desc: 'Full Disclosure Policy (FDP) submissions and DILG compliance documents.',
    href: '/government/transparency-documents',
  },
];

const EXTERNAL = [
  {
    label: 'Freedom of Information',
    href: 'https://www.foi.gov.ph',
    desc: 'File an FOI request',
  },
  {
    label: 'PhilGEPS',
    href: 'https://www.philgeps.gov.ph',
    desc: 'Government procurement portal',
  },
  {
    label: 'Open Data Philippines',
    href: 'https://data.gov.ph',
    desc: 'Government datasets',
  },
  {
    label: 'BLGF – Local Finance',
    href: 'https://blgf.gov.ph',
    desc: 'Bureau of Local Government Finance',
  },
  {
    label: 'COA – Audit Reports',
    href: 'https://www.coa.gov.ph',
    desc: 'Commission on Audit',
  },
  {
    label: 'DBM – Budget',
    href: 'https://www.dbm.gov.ph',
    desc: 'Department of Budget and Management',
  },
];

export default function Transparency() {
  return (
    <>
      <SEO
        title="Transparency"
        description="Transparency documents, budget reports, and FOI releases for the Municipality of Indang, Cavite."
        keywords="Indang transparency, budget, FOI, public documents, accountability, Cavite"
      />
      <main className="flex-grow">
        {/* Page Header */}
        <div
          className="relative text-white py-16 overflow-hidden"
          style={{
            backgroundColor: '#003087',
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-2">
              <Eye className="h-7 w-7 text-blue-200" />
              <span className="text-blue-200 text-sm font-medium uppercase tracking-widest">
                Open Government
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black mb-3">
              Transparency
            </h1>
            <p className="text-blue-100 text-lg max-w-xl">
              Public documents, budget disclosures, and accountability reports
              for the Municipality of Indang, Cavite.
            </p>
          </div>
        </div>

        {/* Commitment banner */}
        <section className="bg-primary-50 border-b border-primary-100 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <ShieldCheck className="h-8 w-8 text-primary-600 shrink-0" />
            <div>
              <h2 className="font-black text-gray-900 text-base">
                Full Disclosure Policy Commitment
              </h2>
              <p className="text-sm text-gray-600 mt-0.5">
                The Municipality of Indang is committed to the DILG Full
                Disclosure Policy, making all financial and performance data
                available to the public in accordance with Republic Act 7160 and
                Executive Order 2.
              </p>
            </div>
          </div>
        </section>

        {/* Document categories */}
        <section className="bg-white py-12 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-xl font-black text-gray-900 mb-6">
              Transparency Documents
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {CATEGORIES.map(
                ({ title, icon: Icon, color, bg, border, desc, href }) => (
                  <Link
                    key={title}
                    to={href}
                    className={`group block bg-white rounded-xl border-t-4 ${border} border border-gray-100 p-6 hover:shadow-md transition-all`}
                  >
                    <div
                      className={`${bg} ${color} w-11 h-11 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className={`font-black text-base mb-2 ${color}`}>
                      {title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">
                      {desc}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary-700 group-hover:gap-2 transition-all">
                      View Documents <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                )
              )}
            </div>
          </div>
        </section>

        {/* External links */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-xl font-black text-gray-900 mb-6">
              External Accountability Resources
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {EXTERNAL.map(r => (
                <a
                  key={r.label}
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-primary-200 transition-all group"
                >
                  <ExternalLink className="h-4 w-4 text-primary-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-gray-900 group-hover:text-primary-700 transition-colors">
                      {r.label}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">{r.desc}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
