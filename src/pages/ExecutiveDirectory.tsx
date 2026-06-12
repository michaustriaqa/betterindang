import { useState } from 'react';
import { Building2, List, Table2, ExternalLink, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import dirData from '../../content/government/departments/executive.json';
import { useTranslation } from '../hooks/useTranslation';

const dir = dirData as typeof dirData;

type ViewMode = 'table' | 'list';

function ViewToggle({
  mode,
  onChange,
  isFil,
}: {
  mode: ViewMode;
  onChange: (m: ViewMode) => void;
  isFil: boolean;
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
        {isFil ? 'Talahanayan' : 'Table'}
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
        {isFil ? 'Listahan' : 'List'}
      </button>
    </div>
  );
}

function SectionHeader({
  title,
  mode,
  onChange,
  isFil,
}: {
  title: string;
  mode: ViewMode;
  onChange: (m: ViewMode) => void;
  isFil: boolean;
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-black text-gray-900">{title}</h2>
      <ViewToggle mode={mode} onChange={onChange} isFil={isFil} />
    </div>
  );
}

export default function ExecutiveDirectory() {
  const { currentLanguage } = useTranslation();
  const isFil = currentLanguage === 'fil';

  const [officesView, setOfficesView] = useState<ViewMode>('table');
  const [agenciesView, setAgenciesView] = useState<ViewMode>('table');
  const [hotlinesView, setHotlinesView] = useState<ViewMode>('table');
  const [ngosView, setNgosView] = useState<ViewMode>('table');

  const h = dir.header;

  const translateOffice = (name: string) => {
    if (!isFil) return name;
    const mapping: Record<string, string> = {
      'Office of the Mayor': 'Tanggapan ng Alkalde',
      'Sangguniang Bayan': 'Sangguniang Bayan',
      'Office of the Municipal Administrator':
        'Tanggapan ng Tagapamahala ng Munisipyo',
      "Municipal Civil Registrar's Office (MCRO)":
        'Tanggapan ng Rehistro Sibil ng Munisipyo (MCRO)',
      "Municipal Assessor's Office":
        'Tanggapan ng Tagatasa ng Munisipyo (Assessor)',
      "Municipal Treasurer's Office":
        'Tanggapan ng Ingat-yaman ng Munisipyo (Treasurer)',
      'Municipal Budget Office': 'Tanggapan ng Badyet ng Munisipyo',
      'Municipal Accounting Office':
        'Tanggapan ng Pagtutuos ng Munisipyo (Accounting)',
      'Municipal Planning & Development Office (MPDO)':
        'Tanggapan ng Pagpaplano at Pagpapaunlad ng Munisipyo (MPDO)',
      'Municipal Health Office (MHO)':
        'Tanggapan ng Kalusugan ng Munisipyo (MHO)',
      'Municipal Social Welfare and Development Office (MSWDO)':
        'Tanggapan ng Kalingang Panlipunan at Pagpapaunlad (MSWDO)',
      'Municipal Agriculture Office': 'Tanggapan ng Pagsasaka ng Munisipyo',
      'Municipal Engineering Office': 'Tanggapan ng Inhenyeriya ng Munisipyo',
      'Municipal Environment & Natural Resources Office (MENRO)':
        'Tanggapan ng Kapaligiran at Likas na Yaman (MENRO)',
      'Municipal Disaster Risk Reduction & Management Office (MDRRMO)':
        'Tanggapan ng Bawas-Panganib sa Sakuna at Pamamahala (MDRRMO)',
      'Tourism Office': 'Tanggapan ng Turismo',
      'Philippine National Police (PNP) — Indang':
        'Pambansang Pulisya ng Pilipinas (PNP) — Indang',
      'Bureau of Fire Protection (BFP) — Indang':
        'Kagawaran ng Pagtatanggol sa Sunog (BFP) — Indang',
    };
    return mapping[name] || name;
  };

  const translateAgency = (name: string) => {
    if (!isFil) return name;
    const mapping: Record<string, string> = {
      'Bureau of Fire Protection (BFP)':
        'Kagawaran ng Pagtatanggol sa Sunog (BFP)',
      'Philippine National Police (PNP)':
        'Pambansang Pulisya ng Pilipinas (PNP)',
      'Commission on Elections (COMELEC)': 'Komisyon sa Halalan (COMELEC)',
      'Department of Social Welfare & Development (DSWD)':
        'Kagawaran ng Kagalingan at Pagpapaunlad Panlipunan (DSWD)',
      'Department of Agriculture (DA)': 'Kagawaran ng Pagsasaka (DA)',
      'Philippine Statistics Authority (PSA)':
        'Pangasiwaan ng Estadistika ng Pilipinas (PSA)',
    };
    return mapping[name] || name;
  };

  const translateNgo = (name: string) => {
    if (!isFil) return name;
    const mapping: Record<string, string> = {
      'Association of Barangay Captains (ABC)':
        'Asosasyon ng mga Kapitan ng Barangay (ABC)',
      'Sangguniang Kabataan (SK) Federation':
        'Pederasyon ng Sangguniang Kabataan (SK)',
    };
    return mapping[name] || name;
  };

  const translateInCharge = (name: string) => {
    if (!isFil) return name;
    return name
      .replace('Mayor', 'Alkalde')
      .replace('Vice Mayor', 'Bise Alkalde');
  };

  return (
    <>
      <SEO
        title={
          isFil
            ? 'Direktoryo ng Tanggapan — Ehekutibo'
            : 'Office Directory — Executive'
        }
        description={`Office directory for the ${isFil ? 'Munisipalidad ng Indang' : h.municipality} local government, including department contacts and officials.`}
        keywords="Indang offices, departments, directory, contacts, local government"
      />
      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b border-gray-100 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <nav className="flex items-center gap-1.5 text-xs text-gray-500">
              <Link to="/" className="hover:text-primary-700 transition-colors">
                {isFil ? 'Tahanan' : 'Home'}
              </Link>
              <span>/</span>
              <Link
                to="/government"
                className="hover:text-primary-700 transition-colors"
              >
                {isFil ? 'Pamahalaan' : 'Government'}
              </Link>
              <span>/</span>
              <Link
                to="/government/departments"
                className="hover:text-primary-700 transition-colors"
              >
                {isFil ? 'Mga Kagawaran' : 'Departments'}
              </Link>
              <span>/</span>
              <span className="text-gray-700 font-medium">
                {isFil ? 'Direktoryo ng Tanggapan' : 'Office Directory'}
              </span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
          {/* Page title + header info */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
              {isFil
                ? 'Munisipalidad ng Indang — Direktoryo ng Tanggapan'
                : `${h.municipality} — Office Directory`}
            </h1>
            <p className="text-sm text-gray-600">
              <strong>
                {isFil ? 'Munisipalidad ng Indang' : h.municipality}
              </strong>{' '}
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
              title={
                isFil
                  ? 'Mga Tanggapan ng Pamahalaang Bayan'
                  : 'Municipal Hall Offices'
              }
              mode={officesView}
              onChange={setOfficesView}
              isFil={isFil}
            />
            {officesView === 'table' ? (
              <div className="rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">
                        {isFil ? 'Tanggapan' : 'Office'}
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600 w-44">
                        {isFil ? 'Telepono' : 'Telephone'}
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600 w-52">
                        {isFil ? 'Namumuno' : 'In-Charge'}
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
                          {translateOffice(row.office)}
                        </td>
                        <td className="px-4 py-3 text-gray-600 font-medium">
                          {row.telephone || '—'}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {translateInCharge(row.in_charge) || '—'}
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
                      {translateOffice(row.office)}
                    </span>
                    <span className="text-sm text-gray-600">
                      {row.telephone || '—'}
                    </span>
                    <span className="text-sm text-gray-700">
                      {translateInCharge(row.in_charge) || '—'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* National Government Agencies */}
          <section>
            <SectionHeader
              title={
                isFil
                  ? 'Mga Ahensya ng Pambansang Pamahalaan'
                  : 'National Government Agencies'
              }
              mode={agenciesView}
              onChange={setAgenciesView}
              isFil={isFil}
            />
            {agenciesView === 'table' ? (
              <div className="rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">
                        {isFil ? 'Ahensya' : 'Agency'}
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600 w-44">
                        {isFil ? 'Telepono' : 'Telephone'}
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600 w-52">
                        {isFil ? 'Namumuno' : 'In-Charge'}
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
                          {translateAgency(row.agency)}
                        </td>
                        <td className="px-4 py-3 text-gray-600 font-medium">
                          {row.telephone || '—'}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {translateInCharge(row.in_charge) || '—'}
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
                      {translateAgency(row.agency)}
                    </span>
                    <span className="text-sm text-gray-600">
                      {row.telephone || '—'}
                    </span>
                    <span className="text-sm text-gray-700">
                      {translateInCharge(row.in_charge) || '—'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Emergency Hotlines */}
          <section>
            <SectionHeader
              title={
                isFil
                  ? 'Mga Hotline sa Oras ng Pangangailangan (Emergency)'
                  : 'Emergency Hotlines'
              }
              mode={hotlinesView}
              onChange={setHotlinesView}
              isFil={isFil}
            />
            {hotlinesView === 'table' ? (
              <div className="rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">
                        {isFil ? 'Tanggapan' : 'Office'}
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600 w-52">
                        {isFil ? 'Numero' : 'Number'}
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
                          {translateOffice(row.office)}
                        </td>
                        <td className="px-4 py-3">
                          <a
                            href={`tel:${row.number.replace(/[^0-9+]/g, '')}`}
                            className="text-primary-700 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
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
                      {translateOffice(row.office)}
                    </span>
                    <a
                      href={`tel:${row.number.replace(/[^0-9+]/g, '')}`}
                      className="text-sm text-primary-700 font-bold hover:underline flex items-center gap-1 shrink-0 cursor-pointer"
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
                title={
                  isFil
                    ? 'Mga Samahang Di-Pampamahalaan (NGO)'
                    : 'Non-Government Organizations'
                }
                mode={ngosView}
                onChange={setNgosView}
                isFil={isFil}
              />
              {ngosView === 'table' ? (
                <div className="rounded-xl border border-gray-200 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left px-4 py-3 font-semibold text-gray-600">
                          {isFil ? 'Organisasyon' : 'Organization'}
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-600 w-44">
                          {isFil ? 'Kontak' : 'Contact'}
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-600 w-52">
                          {isFil ? 'Kinatawan' : 'Representative'}
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
                            {translateNgo(row.organization)}
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
                        {translateNgo(row.organization)}
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
            {isFil
              ? `Datos mula sa Munisipalidad ng Indang. Para sa mga pagwawasto o karagdagan, maghain ng kahilingan sa `
              : `Data sourced from the ${h.municipality}. For corrections or additions, file a request at `}
            <a
              href="https://www.foi.gov.ph"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:underline cursor-pointer"
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
