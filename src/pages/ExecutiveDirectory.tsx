import { useState } from 'react';
import { Building2, List, Table2, ExternalLink, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { executiveDirectory as dir } from '../data/yamlLoader';

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

function SectionHeader({
  title,
  mode,
  onChange,
}: {
  title: string;
  mode: ViewMode;
  onChange: (m: ViewMode) => void;
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-black text-gray-900">{title}</h2>
      <ViewToggle mode={mode} onChange={onChange} />
    </div>
  );
}

export default function ExecutiveDirectory() {
  const [officesView, setOfficesView] = useState<ViewMode>('table');
  const [agenciesView, setAgenciesView] = useState<ViewMode>('table');
  const [hotlinesView, setHotlinesView] = useState<ViewMode>('table');
  const [ngosView, setNgosView] = useState<ViewMode>('table');

  const h = dir.header;

  return (
    <>
      <SEO
        title="Office Directory — Executive"
        description={`Office directory for the ${h.municipality} local government, including department contacts and officials.`}
        keywords="Indang offices, departments, directory, contacts, local government"
      />
      <main className="flex-grow">
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
                Office Directory
              </span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
          {/* Page title + header info */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
              {h.municipality} — Office Directory
            </h1>
            <p className="text-sm text-gray-600">
              <strong>{h.municipality}</strong>{' '}
              {h.address && <span>· {h.address} </span>}
              {h.telephone && (
                <span>
                  · Tel:{' '}
                  <a
                    href={`tel:${h.telephone.replace(/[^0-9+]/g, '')}`}
                    className="text-primary-700 font-semibold hover:underline"
                  >
                    {h.telephone}
                  </a>{' '}
                </span>
              )}
              {h.email && (
                <span>
                  · Email:{' '}
                  <a
                    href={`mailto:${h.email}`}
                    className="text-primary-700 font-semibold hover:underline"
                  >
                    {h.email}
                  </a>{' '}
                </span>
              )}
              {h.website && (
                <span>
                  · Website:{' '}
                  <a
                    href={h.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-700 font-semibold hover:underline inline-flex items-center gap-0.5"
                  >
                    {h.website.replace(/^https?:\/\//, '')}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </span>
              )}
            </p>
          </div>

          {/* Municipal Hall Offices */}
          <section>
            <SectionHeader
              title="Municipal Hall Offices"
              mode={officesView}
              onChange={setOfficesView}
            />
            {officesView === 'table' ? (
              <div className="rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">
                        Office
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600 w-44">
                        Telephone
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600 w-52">
                        In-Charge
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dir.municipal_offices.map((row, i) => (
                      <tr
                        key={row.office}
                        className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                      >
                        <td className="px-4 py-3 text-gray-800">
                          {row.office}
                        </td>
                        <td className="px-4 py-3 text-gray-600 font-medium">
                          {row.telephone || '—'}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {row.in_charge || '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="space-y-2">
                {dir.municipal_offices.map(row => (
                  <div
                    key={row.office}
                    className="bg-white rounded-lg border border-gray-200 px-4 py-3 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4"
                  >
                    <span className="text-sm font-semibold text-gray-800">
                      {row.office}
                    </span>
                    <span className="text-sm text-gray-600">
                      {row.telephone || '—'}
                    </span>
                    <span className="text-sm text-gray-700">
                      {row.in_charge || '—'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* National Government Agencies */}
          <section>
            <SectionHeader
              title="National Government Agencies"
              mode={agenciesView}
              onChange={setAgenciesView}
            />
            {agenciesView === 'table' ? (
              <div className="rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">
                        Agency
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600 w-44">
                        Telephone
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600 w-52">
                        In-Charge
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dir.national_agencies.map((row, i) => (
                      <tr
                        key={row.agency}
                        className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                      >
                        <td className="px-4 py-3 text-gray-800">
                          {row.agency}
                        </td>
                        <td className="px-4 py-3 text-gray-600 font-medium">
                          {row.telephone || '—'}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {row.in_charge || '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="space-y-2">
                {dir.national_agencies.map(row => (
                  <div
                    key={row.agency}
                    className="bg-white rounded-lg border border-gray-200 px-4 py-3 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4"
                  >
                    <span className="text-sm font-semibold text-gray-800">
                      {row.agency}
                    </span>
                    <span className="text-sm text-gray-600">
                      {row.telephone || '—'}
                    </span>
                    <span className="text-sm text-gray-700">
                      {row.in_charge || '—'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Emergency Hotlines */}
          <section>
            <SectionHeader
              title="Emergency Hotlines"
              mode={hotlinesView}
              onChange={setHotlinesView}
            />
            {hotlinesView === 'table' ? (
              <div className="rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">
                        Office
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600 w-52">
                        Number
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dir.emergency_hotlines.map((row, i) => (
                      <tr
                        key={row.office}
                        className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                      >
                        <td className="px-4 py-3 text-gray-800">
                          {row.office}
                        </td>
                        <td className="px-4 py-3">
                          <a
                            href={`tel:${row.number.replace(/[^0-9+]/g, '')}`}
                            className="text-primary-700 font-semibold hover:underline flex items-center gap-1"
                          >
                            <Phone className="h-3.5 w-3.5 shrink-0" />
                            {row.number}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="space-y-2">
                {dir.emergency_hotlines.map(row => (
                  <div
                    key={row.office}
                    className="bg-white rounded-lg border border-gray-200 px-4 py-3 flex items-center justify-between gap-4"
                  >
                    <span className="text-sm font-semibold text-gray-800">
                      {row.office}
                    </span>
                    <a
                      href={`tel:${row.number.replace(/[^0-9+]/g, '')}`}
                      className="text-sm text-primary-700 font-bold hover:underline flex items-center gap-1 shrink-0"
                    >
                      <Phone className="h-3.5 w-3.5 shrink-0" />
                      {row.number}
                    </a>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Non-Government Organizations */}
          {dir.ngos && dir.ngos.length > 0 && (
            <section>
              <SectionHeader
                title="Non-Government Organizations"
                mode={ngosView}
                onChange={setNgosView}
              />
              {ngosView === 'table' ? (
                <div className="rounded-xl border border-gray-200 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left px-4 py-3 font-semibold text-gray-600">
                          Organization
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-600 w-44">
                          Contact
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-600 w-52">
                          Representative
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dir.ngos.map((row, i) => (
                        <tr
                          key={row.organization}
                          className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                        >
                          <td className="px-4 py-3 text-gray-800">
                            {row.organization}
                          </td>
                          <td className="px-4 py-3 text-gray-600 font-medium">
                            {row.contact || '—'}
                          </td>
                          <td className="px-4 py-3 text-gray-700">
                            {row.representative || '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="space-y-2">
                  {dir.ngos.map(row => (
                    <div
                      key={row.organization}
                      className="bg-white rounded-lg border border-gray-200 px-4 py-3 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4"
                    >
                      <span className="text-sm font-semibold text-gray-800">
                        {row.organization}
                      </span>
                      <span className="text-sm text-gray-600">
                        {row.contact || '—'}
                      </span>
                      <span className="text-sm text-gray-700">
                        {row.representative || '—'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Footer note */}
          <div className="text-xs text-gray-400 border-t border-gray-100 pt-4">
            <Building2 className="inline h-3.5 w-3.5 mr-1" />
            Data sourced from the {h.municipality}. For corrections or
            additions, file a request at{' '}
            <a
              href="https://www.foi.gov.ph"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:underline"
            >
              foi.gov.ph
            </a>
            .
          </div>
        </div>
      </main>
    </>
  );
}
