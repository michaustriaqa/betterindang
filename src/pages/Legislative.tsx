import {
  Scale,
  FileText,
  BookOpen,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const SECTIONS = [
  {
    title: 'Ordinances',
    icon: Scale,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    desc: 'Municipal ordinances enacted by the Sangguniang Bayan of Indang, Cavite.',
    href: '/government/departments/legislative',
  },
  {
    title: 'Resolutions',
    icon: FileText,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    desc: 'Resolutions passed by the Sangguniang Bayan expressing the sense of the council.',
    href: '/government/departments/legislative',
  },
  {
    title: 'Committee Reports',
    icon: BookOpen,
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    desc: 'Reports submitted by standing committees of the Sangguniang Bayan.',
    href: '/government/departments/legislative',
  },
];

const EXTERNAL = [
  {
    label: 'DILG – Sangguniang Bayan Guidelines',
    href: 'https://dilg.gov.ph',
    desc: 'Department of the Interior and Local Government',
  },
  {
    label: 'Official Gazette – Local Legislation',
    href: 'https://www.officialgazette.gov.ph',
    desc: 'Philippine Official Gazette',
  },
  {
    label: 'Freedom of Information',
    href: 'https://www.foi.gov.ph',
    desc: 'Request legislative documents via FOI',
  },
];

export default function Legislative() {
  return (
    <>
      <SEO
        title="Legislative"
        description="Sangguniang Bayan ordinances, resolutions, and legislative documents for the Municipality of Indang, Cavite."
        keywords="Indang Sangguniang Bayan, ordinances, resolutions, legislative, municipal council"
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
              <Scale className="h-7 w-7 text-blue-200" />
              <span className="text-blue-200 text-sm font-medium uppercase tracking-widest">
                Sangguniang Bayan ng Indang
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black mb-3">
              Legislative
            </h1>
            <p className="text-blue-100 text-lg max-w-xl">
              Ordinances, resolutions, and legislative documents from the
              Municipal Council of Indang, Cavite.
            </p>
          </div>
        </div>

        {/* About */}
        <section className="bg-white py-12 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl">
              <h2 className="text-xl font-black text-gray-900 mb-3">
                About the Sangguniang Bayan
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                The Sangguniang Bayan is the legislative body of the
                Municipality of Indang. It enacts ordinances, approves
                resolutions, and exercises other legislative powers as provided
                under the Local Government Code of 1991 (RA 7160).
              </p>
              <p className="text-gray-600 leading-relaxed">
                The council is composed of elected municipal councilors who
                represent the interests of Indang's 36 barangays and over 68,000
                residents.
              </p>
            </div>
          </div>
        </section>

        {/* Document sections */}
        <section className="bg-gray-50 py-12 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-xl font-black text-gray-900 mb-6">
              Legislative Documents
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {SECTIONS.map(
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

        {/* External resources */}
        <section className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-xl font-black text-gray-900 mb-6">
              External Resources
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {EXTERNAL.map(r => (
                <a
                  key={r.label}
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 bg-gray-50 rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-primary-200 transition-all group"
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

        <div className="bg-gray-50 border-t border-gray-100 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Link
              to="/"
              className="text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
