import yaml from 'js-yaml';
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
  type LucideIcon,
} from 'lucide-react';
import SEO from '../components/SEO';
import municipalityProfileRaw from '../../content/government/reports-and-statistics/municipality-profile.yaml?raw';
import barangayListRaw from '../../content/government/reports-and-statistics/barangay-list.yaml?raw';

// ── Icon lookup ────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, LucideIcon> = {
  Users,
  MapPin,
  Building2,
  Map,
  TrendingUp,
  Trophy,
  Lightbulb,
  Shield,
  Zap,
  Globe,
};

// ── Typed YAML shapes ──────────────────────────────────────────────────────
interface StatEntry {
  icon: string;
  value: string;
  label: string;
  desc: string;
}

interface Pillar {
  icon: string;
  label: string;
  rank: string;
  score: string;
  color: string;
  iconColor: string;
  highlights: string[];
}

interface Resource {
  label: string;
  href: string;
  desc: string;
}

interface MunicipalityProfile {
  overview: {
    mayor: string;
    address: string;
    telephone: string;
    cmci_url: string;
  };
  stats: StatEntry[];
  cmci: {
    year: number;
    overall_rank: string;
    overall_score: string;
    total_municipalities: number;
    innovation_callout: {
      rank: string;
      sub_highlights: string[];
    };
    pillars: Pillar[];
  };
  resources: Resource[];
}

interface BarangayList {
  total: number;
  source: string;
  barangays: { name: string; population: string; href: string }[];
}

// ── Parse YAML at module load (build-time static import) ──────────────────
const profile = yaml.load(municipalityProfileRaw) as MunicipalityProfile;
const barangayData = yaml.load(barangayListRaw) as BarangayList;

export default function Statistics() {
  const { overview, stats, cmci, resources } = profile;
  const { barangays } = barangayData;

  return (
    <>
      <SEO
        title="Statistics"
        description="Key statistics and demographic data for the Municipality of Indang, Cavite."
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
                Municipality of Indang
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black mb-3">Statistics</h1>
            <p className="text-blue-100 text-lg max-w-xl">
              Key figures and competitiveness data for Indang, Cavite based on
              official government sources.
            </p>
          </div>
        </div>

        {/* Municipality Profile */}
        <section className="bg-white py-12 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-black text-gray-900">
                  Municipal Profile
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Mayor {overview.mayor} · {overview.address} · Tel:{' '}
                  {overview.telephone}
                </p>
              </div>
              <a
                href={overview.cmci_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors"
              >
                DTI CMCI Profile
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map(({ icon, value, label, desc }) => {
                const Icon = ICON_MAP[icon] ?? FileText;
                return (
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
                );
              })}
            </div>
          </div>
        </section>

        {/* CMCI */}
        <section className="bg-gray-50 py-12 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h2 className="text-xl font-black text-gray-900">
                  DTI CMCI {cmci.year} — 5 Pillars
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Cities &amp; Municipalities Competitiveness Index ·{' '}
                  {cmci.overall_rank} overall out of {cmci.total_municipalities}{' '}
                  municipalities (1st–2nd Class)
                </p>
              </div>
              <a
                href={overview.cmci_url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 hidden sm:flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors"
              >
                Full Profile
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Innovation callout */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl px-5 py-4 mb-6 flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-orange-800">
                  Indang ranked {cmci.innovation_callout.rank} in Innovation
                  nationwide
                </p>
                <p className="text-xs text-orange-700 mt-0.5">
                  Ranked 1st in{' '}
                  {cmci.innovation_callout.sub_highlights.join(', ')} — top
                  digital governance among Philippine municipalities.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cmci.pillars.map(
                ({
                  icon,
                  label,
                  rank,
                  score,
                  color,
                  iconColor,
                  highlights,
                }) => {
                  const Icon = ICON_MAP[icon] ?? FileText;
                  return (
                    <div
                      key={label}
                      className={`rounded-xl border p-5 ${color}`}
                    >
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
                          <div className="text-xs opacity-60">rank</div>
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
                  );
                }
              )}
            </div>
          </div>
        </section>

        {/* Barangay list */}
        <section className="bg-white py-12 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-xl font-black text-gray-900 mb-2">
              {barangayData.total} Barangays of Indang
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Population figures from {barangayData.source}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {barangays.map(({ name, population, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-50 rounded-lg border border-gray-100 p-3 hover:border-primary-200 hover:shadow-sm transition-all group"
                >
                  <div className="text-xs font-semibold text-gray-800 leading-tight group-hover:text-primary-700 transition-colors">
                    {name}
                  </div>
                  <div className="text-xs text-primary-600 font-bold mt-0.5">
                    {population}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Data Sources */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-xl font-black text-gray-900 mb-6">
              Data Sources &amp; Resources
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {resources.map(r => (
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
      </main>
    </>
  );
}
