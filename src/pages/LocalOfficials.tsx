import { useState } from 'react';
import { Users, List, Table2, ExternalLink, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

type ViewMode = 'table' | 'list';

const EXECUTIVE = [
  { position: 'Municipal Mayor', name: 'Hon. Virgilio "Boying" Fidel' },
  { position: 'Municipal Vice Mayor', name: 'Hon. Ferdinand Papa' },
];

const COUNCILORS = [
  { no: 1, name: 'Hon. [Councilor 1]' },
  { no: 2, name: 'Hon. [Councilor 2]' },
  { no: 3, name: 'Hon. [Councilor 3]' },
  { no: 4, name: 'Hon. [Councilor 4]' },
  { no: 5, name: 'Hon. [Councilor 5]' },
  { no: 6, name: 'Hon. [Councilor 6]' },
  { no: 7, name: 'Hon. [Councilor 7]' },
  { no: 8, name: 'Hon. [Councilor 8]' },
];

const EX_OFFICIO = [
  {
    position: 'ABC President\n(Association of Barangay Captains)',
    name: 'Hon. [ABC President]',
  },
  {
    position: 'SK Federation President\n(Sangguniang Kabataan)',
    name: 'Hon. [SK Federation President]',
  },
];

const DEPARTMENTS = [
  { office: 'Office of the Mayor', contact: '(046) 460-4708' },
  { office: 'Sangguniang Bayan', contact: '(046) 460-4708' },
  {
    office: 'Office of the Municipal Administrator',
    contact: '(046) 460-4708',
  },
  { office: 'Municipal Health Office (MHO)', contact: '(046) 840-1705' },
  {
    office: 'Municipal Disaster Risk Reduction and Management Office (MDRRMO)',
    contact: '0961-992-1998',
  },
  { office: 'Bureau of Fire Protection (BFP)', contact: '(046) 415-1217' },
  { office: 'Indang Municipal Police Station (PNP)', contact: '0949-184-9145' },
];

function ViewToggle({
  mode,
  onChange,
}: {
  mode: ViewMode;
  onChange: (m: ViewMode) => void;
}) {
  return (
    <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
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

export default function LocalOfficials() {
  const [execView, setExecView] = useState<ViewMode>('table');
  const [councilView, setCouncilView] = useState<ViewMode>('table');
  const [exofficioView, setExofficioView] = useState<ViewMode>('table');
  const [deptView, setDeptView] = useState<ViewMode>('table');

  return (
    <>
      <SEO
        title="Local Officials Directory"
        description="Directory of elected officials and government departments of the Municipality of Indang, Cavite."
        keywords="Indang officials, mayor, vice mayor, councilors, Sangguniang Bayan, departments"
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
              <Users className="h-7 w-7 text-blue-200" />
              <span className="text-blue-200 text-sm font-medium uppercase tracking-widest">
                Municipality of Indang
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black mb-3">
              Local Officials Directory
            </h1>
            <p className="text-blue-100 text-lg max-w-xl">
              This page lists all elected officials of the{' '}
              <strong>Municipal Government of Indang, Cavite</strong> for the{' '}
              <strong>2022–2025 term</strong>.
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
                Local Officials Directory
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

            {/* Executive Branch */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-gray-800">
                  Executive Branch
                </h3>
                <ViewToggle mode={execView} onChange={setExecView} />
              </div>

              {execView === 'table' ? (
                <div className="rounded-xl border border-gray-200 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left px-4 py-3 font-semibold text-gray-600 w-56">
                          Position
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-600">
                          Name
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {EXECUTIVE.map((row, i) => (
                        <tr
                          key={row.position}
                          className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                        >
                          <td className="px-4 py-3 font-semibold text-gray-700">
                            {row.position}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {row.name}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="space-y-2">
                  {EXECUTIVE.map(row => (
                    <div
                      key={row.position}
                      className="bg-white rounded-lg border border-gray-200 px-4 py-3"
                    >
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">
                        {row.position}
                      </div>
                      <div className="text-sm font-bold text-gray-800">
                        {row.name}
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
                <strong>8 elected councilors</strong> and is presided over by
                the Vice Mayor.
              </p>

              {councilView === 'table' ? (
                <div className="rounded-xl border border-gray-200 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left px-4 py-3 font-semibold text-gray-600 w-16">
                          #
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-600">
                          Councilor
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {COUNCILORS.map(row => (
                        <tr
                          key={row.no}
                          className={
                            row.no % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'
                          }
                        >
                          <td className="px-4 py-3 text-gray-500 font-medium">
                            {row.no}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {row.name}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="space-y-2">
                  {COUNCILORS.map(row => (
                    <div
                      key={row.no}
                      className="bg-white rounded-lg border border-gray-200 px-4 py-3 flex items-center gap-3"
                    >
                      <span className="text-xs font-bold text-gray-400 w-6 shrink-0">
                        {row.no}
                      </span>
                      <span className="text-sm font-bold text-gray-800">
                        {row.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Ex-Officio Members */}
            <div className="mb-2">
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
                        <th className="text-left px-4 py-3 font-semibold text-gray-600 w-56">
                          Position
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-600">
                          Name
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {EX_OFFICIO.map((row, i) => (
                        <tr
                          key={i}
                          className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                        >
                          <td className="px-4 py-3 font-semibold text-gray-700 whitespace-pre-line leading-snug">
                            {row.position}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {row.name}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="space-y-2">
                  {EX_OFFICIO.map((row, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-lg border border-gray-200 px-4 py-3"
                    >
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5 whitespace-pre-line leading-snug">
                        {row.position}
                      </div>
                      <div className="text-sm font-bold text-gray-800">
                        {row.name}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Departments & Offices */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-black text-gray-900">
                Municipal Government Departments and Offices
              </h2>
              <ViewToggle mode={deptView} onChange={setDeptView} />
            </div>

            {deptView === 'table' ? (
              <div className="rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">
                        Office
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600 w-48">
                        Contact
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {DEPARTMENTS.map((row, i) => (
                      <tr
                        key={row.office}
                        className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                      >
                        <td className="px-4 py-3 text-gray-800">
                          {row.office}
                        </td>
                        <td className="px-4 py-3 text-gray-600 font-medium">
                          {row.contact}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="space-y-2">
                {DEPARTMENTS.map(row => (
                  <div
                    key={row.office}
                    className="bg-white rounded-lg border border-gray-200 px-4 py-3 flex items-start justify-between gap-4"
                  >
                    <span className="text-sm text-gray-800">{row.office}</span>
                    <span className="text-sm font-semibold text-primary-700 shrink-0">
                      {row.contact}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Contact */}
          <section className="bg-gray-50 rounded-xl border border-gray-200 p-6">
            <h2 className="text-base font-black text-gray-900 mb-2">Contact</h2>
            <p className="text-sm text-gray-700">
              <strong>Indang Municipal Hall</strong> · A. Mojica St. Poblacion
              3, Indang, Cavite · Tel: (046) 460-4708
            </p>
            <p className="text-sm text-gray-600 mt-2">
              For a complete directory of department heads and municipal
              employees, visit the Municipal Hall or file a request under the{' '}
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
            <p className="text-sm text-gray-500 mt-3 flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              Indang, Cavite · 4122
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
