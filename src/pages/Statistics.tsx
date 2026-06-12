import {
  BarChart3,
  Users,
  MapPin,
  Building2,
  Map,
  TrendingUp,
  FileText,
  ExternalLink,
  Trophy,
  Lightbulb,
  Shield,
  Zap,
  Globe,
} from 'lucide-react';
import SEO from '../components/SEO';
import { useTranslation } from '../hooks/useTranslation';

const STATS = [
  {
    icon: Users,
    value: '70,092',
    label: 'Population',
    desc: 'DTI CMCI 2024 data',
  },
  {
    icon: MapPin,
    value: '36',
    label: 'Barangays',
    desc: 'Administrative villages',
  },
  {
    icon: Map,
    value: '74.90 km²',
    label: 'Total Land Area',
    desc: '4.91% of Cavite province',
  },
  {
    icon: Building2,
    value: '1st Class',
    label: 'Income Classification',
    desc: 'Municipal income class',
  },
  {
    icon: TrendingUp,
    value: '0.98%',
    label: 'Annual Growth Rate',
    desc: '2015–2020 census period',
  },
  {
    icon: Users,
    value: '46,884',
    label: 'Registered Voters',
    desc: '2019 COMELEC data',
  },
  { icon: Map, value: '299.5 m', label: 'Elevation', desc: 'Above sea level' },
  {
    icon: Trophy,
    value: '149th',
    label: 'CMCI Overall Rank',
    desc: 'Out of 509 municipalities (2024)',
  },
];

const CMCI_PILLARS = [
  {
    icon: Zap,
    label: 'Economic Dynamism',
    rank: '231st',
    score: '3.3996',
    color: 'text-yellow-700 bg-yellow-50 border-yellow-200',
    iconColor: 'text-yellow-600 bg-yellow-100',
    highlights: [
      'Cost of Living: 44th',
      'Local Economy Growth: 64th',
      'Active Establishments: 61st',
    ],
  },
  {
    icon: Building2,
    label: 'Government Efficiency',
    rank: '428th',
    score: '7.1508',
    color: 'text-blue-700 bg-blue-50 border-blue-200',
    iconColor: 'text-blue-600 bg-blue-100',
    highlights: [
      'ARTA Citizens Charter: 1st',
      'Getting Business Permits: 2nd',
      'Compliance to National Directives: 3rd',
    ],
  },
  {
    icon: Globe,
    label: 'Infrastructure',
    rank: '156th',
    score: '2.5910',
    color: 'text-purple-700 bg-purple-50 border-purple-200',
    iconColor: 'text-purple-600 bg-purple-100',
    highlights: [
      'Road Network: 46th',
      'IT Capacity: 32nd',
      'Basic Utilities: 39th',
    ],
  },
  {
    icon: Shield,
    label: 'Resiliency',
    rank: '122nd',
    score: '11.5077',
    color: 'text-green-700 bg-green-50 border-green-200',
    iconColor: 'text-green-600 bg-green-100',
    highlights: [
      'Local Risk Assessments: 1st',
      'Disaster Risk Reduction Plan: 2nd',
      'Land Use Plan: 3rd',
    ],
  },
  {
    icon: Lightbulb,
    label: 'Innovation',
    rank: '15th',
    score: '7.9986',
    color: 'text-orange-700 bg-orange-50 border-orange-200',
    iconColor: 'text-orange-600 bg-orange-100',
    highlights: [
      'ICT Plan: 1st',
      'E-BPLS Software: 1st',
      'Online Payment Facilities: 1st',
    ],
  },
];

const RESOURCES = [
  {
    label: 'Philippine Statistics Authority',
    href: 'https://psa.gov.ph',
    desc: 'Census & population data',
  },
  {
    label: 'PhilAtlas – Indang',
    href: 'https://www.philatlas.com/luzon/r04a/cavite/indang.html',
    desc: 'Geographic & demographic data',
  },
  {
    label: 'DTI CMCI Profile – Indang',
    href: 'https://cmci.dti.gov.ph/lgu-profile.php?lgu=Indang',
    desc: 'City/municipality competitiveness index',
  },
  {
    label: 'Open Data Philippines',
    href: 'https://data.gov.ph',
    desc: 'Government open datasets',
  },
  {
    label: 'BLGF – Local Finance',
    href: 'https://blgf.gov.ph',
    desc: 'Bureau of Local Government Finance',
  },
];

export default function Statistics() {
  const { currentLanguage } = useTranslation();
  const isFil = currentLanguage === 'fil';

  const translatedSTATS = STATS.map(s => {
    let label = s.label;
    let desc = s.desc;
    let value = s.value;
    if (isFil) {
      if (s.label === 'Population') {
        label = 'Populasyon';
        desc = 'Datos ng DTI CMCI 2024';
      } else if (s.label === 'Barangays') {
        label = 'Mga Barangay';
        desc = 'Mga administratibong nayon';
      } else if (s.label === 'Total Land Area') {
        label = 'Kabuuang Lawak';
        desc = '4.91% ng lalawigan ng Cavite';
      } else if (s.label === 'Income Classification') {
        label = 'Klasipikasyon ng Kita';
        desc = 'Uri ng kita ng munisipyo';
        value = 'Unang Klase';
      } else if (s.label === 'Annual Growth Rate') {
        label = 'Taunang Paglago';
        desc = 'Panahon ng senso 2015–2020';
      } else if (s.label === 'Registered Voters') {
        label = 'Mga Rehistradong Botante';
        desc = 'Datos ng COMELEC 2019';
      } else if (s.label === 'Elevation') {
        label = 'Taas';
        desc = 'Mula sa antas ng dagat';
      } else if (s.label === 'CMCI Overall Rank') {
        label = 'Pangkalahatang Ranggo sa CMCI';
        desc = 'Mula sa 509 munisipalidad (2024)';
        value = 'Ika-149';
      }
    }
    return { ...s, label, desc, value };
  });

  const translatedPillars = CMCI_PILLARS.map(p => {
    let label = p.label;
    let rank = p.rank;
    let highlights = p.highlights;
    if (isFil) {
      if (p.label === 'Economic Dynamism') {
        label = 'Dinamismong Pang-ekonomiya';
        rank = 'Ika-231';
        highlights = [
          'Gastos sa Pamumuhay: Ika-44',
          'Paglago ng Lokal na Ekonomiya: Ika-64',
          'Mga Aktibong Negosyo: Ika-61',
        ];
      } else if (p.label === 'Government Efficiency') {
        label = 'Kahusayan ng Pamahalaan';
        rank = 'Ika-428';
        highlights = [
          'ARTA Citizens Charter: Ika-1',
          'Pangunguna sa Permit ng Negosyo: Ika-2',
          'Pagsunod sa mga Pambansang Kautusan: Ika-3',
        ];
      } else if (p.label === 'Infrastructure') {
        label = 'Imprastraktura';
        rank = 'Ika-156';
        highlights = [
          'Network ng Daan: Ika-46',
          'Kapasidad ng IT: Ika-32',
          'Pangunahing Utility: Ika-39',
        ];
      } else if (p.label === 'Resiliency') {
        label = 'Katatagan sa Sakuna (Resiliency)';
        rank = 'Ika-122';
        highlights = [
          'Lokal na Pagtatasa ng Panganib: Ika-1',
          'Disaster Risk Reduction Plan: Ika-2',
          'Plano sa Paggamit ng Lupa: Ika-3',
        ];
      } else if (p.label === 'Innovation') {
        label = 'Inobasyon';
        rank = 'Ika-15';
        highlights = [
          'Plano ng ICT: Ika-1',
          'E-BPLS Software: Ika-1',
          'Online Payment Facilities: Ika-1',
        ];
      }
    }
    return { ...p, label, rank, highlights };
  });

  const translatedResources = RESOURCES.map(r => {
    let desc = r.desc;
    if (isFil) {
      if (r.desc === 'Census & population data')
        desc = 'Datos ng senso at populasyon';
      else if (r.desc === 'Geographic & demographic data')
        desc = 'Datos ng heograpiya at demograpiko';
      else if (r.desc === 'City/municipality competitiveness index')
        desc =
          'Indise ng kakayahang makipagkumpitensya ng mga lungsod at munisipalidad';
      else if (r.desc === 'Government open datasets')
        desc = 'Bukas na mga dataset ng pamahalaan';
      else if (r.desc === 'Bureau of Local Government Finance')
        desc = 'Tanggapan ng Pananalapi ng Lokal na Pamahalaan';
    }
    return { ...r, desc };
  });

  return (
    <>
      <SEO
        title={isFil ? 'Mga Istatistika' : 'Statistics'}
        description={
          isFil
            ? 'Pangunahing istatistika at datos ng populasyon para sa Munisipalidad ng Indang, Cavite.'
            : 'Key statistics and demographic data for the Municipality of Indang, Cavite.'
        }
        keywords="Indang statistics, Cavite demographics, population data, municipality profile, CMCI"
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
              <BarChart3 className="h-7 w-7 text-blue-200" />
              <span className="text-blue-200 text-sm font-medium uppercase tracking-widest">
                {isFil ? 'Munisipalidad ng Indang' : 'Municipality of Indang'}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black mb-3">
              {isFil ? 'Mga Istatistika' : 'Statistics'}
            </h1>
            <p className="text-blue-100 text-lg max-w-xl">
              {isFil
                ? 'Mga pangunahing numero at datos ng kakayahang makipagkumpitensya para sa Indang, Cavite batay sa mga opisyal na mapagkukunan ng pamahalaan.'
                : 'Key figures and competitiveness data for Indang, Cavite based on official government sources.'}
            </p>
          </div>
        </div>

        {/* Municipality Profile */}
        <section className="bg-white py-12 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-black text-gray-900">
                  {isFil ? 'Profile ng Munisipalidad' : 'Municipal Profile'}
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Mayor Virgilio Fidel · A. Mojica St. Poblacion 3 · Tel: (213)
                  460-4708
                </p>
              </div>
              <a
                href="https://cmci.dti.gov.ph/lgu-profile.php?lgu=Indang"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors"
              >
                DTI CMCI Profile
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {translatedSTATS.map(({ icon: Icon, value, label, desc }) => (
                <div
                  key={label}
                  className="bg-gray-50 rounded-xl p-5 border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="bg-primary-100 text-primary-700 w-9 h-9 rounded-lg flex items-center justify-center mb-3">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="text-xl font-black text-gray-900 leading-tight mb-1">
                    {value}
                  </div>
                  <div className="text-sm font-semibold text-gray-800 mb-0.5">
                    {label}
                  </div>
                  <div className="text-xs text-gray-500">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CMCI 2024 */}
        <section className="bg-gray-50 py-12 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h2 className="text-xl font-black text-gray-900">
                  {isFil
                    ? 'DTI CMCI 2024 — 5 Haligi'
                    : 'DTI CMCI 2024 — 5 Pillars'}
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  {isFil
                    ? 'Indise ng Kakayahang Makipagkumpitensya ng mga Lungsod at Munisipalidad · Ika-149 sa pangkalahatan mula sa 509 na munisipalidad (1st–2nd Class)'
                    : 'Cities & Municipalities Competitiveness Index · 149th overall out of 509 municipalities (1st–2nd Class)'}
                </p>
              </div>
              <a
                href="https://cmci.dti.gov.ph/lgu-profile.php?lgu=Indang"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 hidden sm:flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors"
              >
                {isFil ? 'Buong Profile' : 'Full Profile'}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Innovation callout */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl px-5 py-4 mb-6 flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-orange-800">
                  {isFil
                    ? 'Pang-15 ang Indang sa Inobasyon sa buong bansa'
                    : 'Indang ranked 15th in Innovation nationwide'}
                </p>
                <p className="text-xs text-orange-700 mt-0.5">
                  {isFil
                    ? 'Nanguna sa ICT Plan, E-BPLS Software, at Online Payment Facilities — nangungunang digital na pamamahala sa mga munisipalidad ng Pilipinas.'
                    : 'Ranked 1st in ICT Plan, E-BPLS Software, and Online Payment Facilities — top digital governance among Philippine municipalities.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {translatedPillars.map(
                ({
                  icon: Icon,
                  label,
                  rank,
                  score,
                  color,
                  iconColor,
                  highlights,
                }) => (
                  <div key={label} className={`rounded-xl border p-5 ${color}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${iconColor}`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-black text-sm leading-tight">
                          {label}
                        </div>
                        <div className="text-xs opacity-70 font-medium">
                          Score: {score}
                        </div>
                      </div>
                      <div className="ml-auto text-right">
                        <div className="text-lg font-black leading-none">
                          {rank}
                        </div>
                        <div className="text-xs opacity-60">
                          {isFil ? 'ranggo' : 'rank'}
                        </div>
                      </div>
                    </div>
                    <ul className="space-y-1">
                      {highlights.map(h => (
                        <li
                          key={h}
                          className="text-xs opacity-80 flex items-start gap-1.5"
                        >
                          <span className="mt-1 w-1 h-1 rounded-full bg-current shrink-0 opacity-60" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* Barangay list */}
        <section className="bg-white py-12 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-xl font-black text-gray-900 mb-2">
              {isFil ? '36 na Barangay ng Indang' : '36 Barangays of Indang'}
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              {isFil
                ? 'Mga numero ng populasyon mula sa 2020 PSA Census'
                : 'Population figures from 2020 PSA Census'}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {[
                ['Agus-us', '1,468'],
                ['Alulod', '5,055'],
                ['Banaba Cerca', '3,356'],
                ['Banaba Lejos', '1,680'],
                ['Bancod', '2,630'],
                ['Barangay 1', '1,342'],
                ['Barangay 2', '914'],
                ['Barangay 3', '1,057'],
                ['Barangay 4', '2,371'],
                ['Buna Cerca', '4,065'],
                ['Buna Lejos I', '1,948'],
                ['Buna Lejos II', '2,314'],
                ['Calumpang Cerca', '3,035'],
                ['Calumpang Lejos I', '2,762'],
                ['Carasuchi', '1,435'],
                ['Daine I', '1,809'],
                ['Daine II', '2,326'],
                ['Guyam Malaki', '2,087'],
                ['Guyam Munti', '749'],
                ['Harasan', '1,101'],
                ['Kayquit I', '1,559'],
                ['Kayquit II', '1,894'],
                ['Kayquit III', '2,605'],
                ['Kaytambog', '1,457'],
                ['Kaytapos', '1,558'],
                ['Limbon', '600'],
                ['Lumampong Balagbag', '1,274'],
                ['Lumampong Halayhay', '1,433'],
                ['Mahabangkahoy Cerca', '1,925'],
                ['Mahabangkahoy Lejos', '1,210'],
                ['Mataas na Lupa', '3,468'],
                ['Pulo', '1,053'],
                ['Tambo Balagbag', '765'],
                ['Tambo Ilaya', '970'],
                ['Tambo Kulit', '1,518'],
                ['Tambo Malaki', '1,906'],
              ].map(([name, pop]) => (
                <div
                  key={name}
                  className="bg-gray-50 rounded-lg border border-gray-100 p-3 hover:border-primary-200 transition-colors"
                >
                  <div className="text-xs font-semibold text-gray-800 leading-tight">
                    {name}
                  </div>
                  <div className="text-xs text-primary-600 font-bold mt-0.5">
                    {pop}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Data Sources */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-xl font-black text-gray-900 mb-6">
              {isFil ? 'Mga Mapagkukunan at Datos' : 'Data Sources & Resources'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {translatedResources.map(r => (
                <a
                  key={r.label}
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-primary-200 transition-all group"
                >
                  <FileText className="h-5 w-5 text-primary-500 shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-gray-900 group-hover:text-primary-700 transition-colors">
                      {r.label}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">{r.desc}</div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Back link */}
      </main>
    </>
  );
}
