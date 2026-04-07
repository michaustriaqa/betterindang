import { useState } from 'react';
import { Landmark, List, Table2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import data from '../../content/government/departments/legislative/legislative.json';

type ViewMode = 'table' | 'list';

function ViewToggle({
  mode,
  onChange,
}: {
  mode: ViewMode;
  onChange: (m: ViewMode) => void;
}) {
  return (
    <div className="flex items-center border border-gray-200 rounded-md overflow-hidden shrink-0">
      <button
        type="button"
        onClick={() => onChange('table')}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold transition-colors ${
          mode === 'table'
            ? 'bg-primary-700 text-white'
            : 'bg-white text-gray-600 hover:bg-gray-50'
        }`}
      >
        <Table2 className="h-3.5 w-3.5" />
        Table
      </button>
      <button
        type="button"
        onClick={() => onChange('list')}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border-l border-gray-200 transition-colors ${
          mode === 'list'
            ? 'bg-primary-700 text-white'
            : 'bg-white text-gray-600 hover:bg-gray-50'
        }`}
      >
        <List className="h-3.5 w-3.5" />
        List
      </button>
    </div>
  );
}

export default function SangguniangBayan() {
  const [officerView, setOfficerView] = useState<ViewMode>('table');
  const [councilView, setCouncilView] = useState<ViewMode>('table');
  const [exofficioView, setExofficioView] = useState<ViewMode>('table');

  return (
    <>
      <SEO
        title="Sangguniang Bayan"
        description={`Members of the Sangguniang Bayan (Municipal Council) of the ${data.GOVERNMENT_NAME} for the ${data.TERM} term.`}
        keywords="Indang Sangguniang Bayan, municipal council, councilors, legislative, committees"
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
              <Landmark className="h-7 w-7 text-blue-200" />
              <span className="text-blue-200 text-sm font-medium uppercase tracking-widest">
                {data.GOVERNMENT_NAME}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black mb-3">
              Sangguniang Bayan
            </h1>
            <p className="text-blue-100 text-lg max-w-xl">
              This page lists all elected members of the{' '}
              <strong>Municipal Council of {data.GOVERNMENT_NAME}</strong> for
              the <strong>{data.TERM} term</strong>.
            </p>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b border-gray-100 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <nav className="flex items-center gap-1.5 text-xs text-gray-500">
              <Link to="/" className="hover:text-primary-700 transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link
                to="/government"
                className="hover:text-primary-700 transition-colors"
              >
                Government
              </Link>
              <span>/</span>
              <Link
                to="/government/departments"
                className="hover:text-primary-700 transition-colors"
              >
                Departments
              </Link>
              <span>/</span>
              <span className="text-gray-700 font-medium">
                Sangguniang Bayan
              </span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
          {/* Elected Officials */}
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-6">
              Elected Officials
            </h2>

            {/* Presiding Officer */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-gray-800">
                  Executive Branch
                </h3>
                <ViewToggle mode={officerView} onChange={setOfficerView} />
              </div>

              {officerView === 'table' ? (
                <div className="rounded-xl border border-gray-200 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left px-4 py-3 font-semibold text-gray-600 w-64">
                          Position
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-600">
                          Name
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.presiding_officer.map((officer, i) => (
                        <tr
                          key={i}
                          className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                        >
                          <td className="px-4 py-3 font-semibold text-gray-700">
                            {officer.position}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {officer.name}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="space-y-2">
                  {data.presiding_officer.map((officer, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-lg border border-gray-200 px-4 py-3"
                    >
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">
                        {officer.position}
                      </div>
                      <div className="text-sm font-bold text-gray-800">
                        {officer.name}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sangguniang Bayan */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-base font-bold text-gray-800">
                  Sangguniang Bayan (Municipal Council)
                </h3>
                <ViewToggle mode={councilView} onChange={setCouncilView} />
              </div>
              <p className="text-sm text-gray-500 mb-3">
                The Municipal Council is composed of{' '}
                <strong>{data.councilors.length} elected councilors</strong> and
                is presided over by the Vice Mayor.
              </p>

              {councilView === 'table' ? (
                <div className="rounded-xl border border-gray-200 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left px-4 py-3 font-semibold text-gray-600 w-12">
                          #
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-600 w-56">
                          Councilor
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-600">
                          Committee Assignments
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.councilors.map(row => (
                        <tr
                          key={row.no}
                          className={
                            row.no % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'
                          }
                        >
                          <td className="px-4 py-3 text-gray-500 font-medium">
                            {row.no}
                          </td>
                          <td className="px-4 py-3 font-semibold text-gray-800">
                            {row.name}
                          </td>
                          <td className="px-4 py-3 text-gray-600 text-xs leading-relaxed">
                            {row.committees}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="space-y-2">
                  {data.councilors.map(row => (
                    <div
                      key={row.no}
                      className="bg-white rounded-lg border border-gray-200 px-4 py-3"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-xs font-bold text-gray-400 w-5 shrink-0 mt-0.5">
                          {row.no}
                        </span>
                        <div>
                          <div className="text-sm font-bold text-gray-800">
                            {row.name}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                            {row.committees}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Ex-Officio Members */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-gray-800">
                  Ex-Officio Members
                </h3>
                <ViewToggle mode={exofficioView} onChange={setExofficioView} />
              </div>

              {exofficioView === 'table' ? (
                <div className="rounded-xl border border-gray-200 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left px-4 py-3 font-semibold text-gray-600 w-64">
                          Position
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-600">
                          Name
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.ex_officio.map((row, i) => (
                        <tr
                          key={i}
                          className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                        >
                          <td className="px-4 py-3 font-semibold text-gray-700 whitespace-pre-line leading-snug">
                            {row.position}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {row.name || '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="space-y-2">
                  {data.ex_officio.map((row, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-lg border border-gray-200 px-4 py-3"
                    >
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5 whitespace-pre-line leading-snug">
                        {row.position}
                      </div>
                      <div className="text-sm font-bold text-gray-800">
                        {row.name || '—'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Contact */}
          <section className="bg-gray-50 rounded-xl border border-gray-200 p-6">
            <h2 className="text-base font-black text-gray-900 mb-2">Contact</h2>
            <p className="text-sm text-gray-700">
              <strong>Sangguniang Bayan Hall</strong> · {data.contact.address}
              {data.contact.telephone && (
                <span>
                  {' '}
                  · Tel:{' '}
                  <a
                    href={`tel:${data.contact.telephone.replace(/[^0-9+]/g, '')}`}
                    className="text-primary-700 font-semibold hover:underline"
                  >
                    {data.contact.telephone}
                  </a>
                </span>
              )}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              For legislative documents and records, file a request under the{' '}
              <a
                href="https://www.foi.gov.ph"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-700 font-semibold hover:underline inline-flex items-center gap-0.5"
              >
                Freedom of Information
                <ExternalLink className="h-3 w-3" />
              </a>{' '}
              policy.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
