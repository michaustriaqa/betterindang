import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

export default function YakapPromoBanner() {
  const { currentLanguage } = useTranslation();
  const isFil = currentLanguage === 'fil';

  return (
    <div className="relative overflow-hidden my-12 mx-auto max-w-7xl px-4 sm:px-6">
      {/* Premium Outer Card with Official PhilHealth Image Background */}
      <div
        className="relative rounded-3xl overflow-hidden p-8 md:p-12 shadow-2xl text-white border border-blue-700/50 dark:border-blue-900/40 bg-cover bg-center"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0, 48, 135, 0.95) 40%, rgba(0, 48, 135, 0.45) 100%), url("https://www.philhealth.gov.ph/yakap/images/YAKAPSubpage_WebsiteHero_v002.jpg")',
        }}
      >
        {/* Decorative Blurred Vectors */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Text Detail */}
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-emerald-300 border border-white/10 text-[10px] sm:text-xs font-black uppercase tracking-wider mb-4 animate-pulse">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />{' '}
              {isFil
                ? 'Libreng Kalusugan Para sa Lahat'
                : 'Free Health Care For All'}
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-white mb-4">
              PhilHealth YAKAP
            </h2>

            <p className="text-sm sm:text-base text-blue-100 leading-relaxed font-medium mb-6">
              {isFil ? (
                <>
                  May maintenance ka ba o kailangang magpa-laboratory? Dito sa
                  Indang Cavite, sagot ng <strong>PhilHealth YAKAP</strong> ang
                  inyong regular na check-up, hanggang{' '}
                  <strong>13 uri ng laboratory tests</strong>, at hanggang{' '}
                  <strong>₱20,000 na libreng gamot</strong> taun-taon!
                </>
              ) : (
                <>
                  Do you have maintenance meds or need diagnostic labs? Here in
                  Indang, Cavite, <strong>PhilHealth YAKAP</strong> covers your
                  regular check-ups, up to{' '}
                  <strong>13 diagnostic laboratory tests</strong>, and up to{' '}
                  <strong>₱20,000 worth of free medicines</strong> annually!
                </>
              )}
            </p>

            {/* Quick Metrics Summary */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <span className="font-semibold text-blue-100">
                  {isFil
                    ? '💊 ₱20k na Gamot sa Maintenance'
                    : '💊 ₱20k Maintenance Medicines'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <span className="font-semibold text-blue-100">
                  {isFil
                    ? '🧪 13 na Laboratory Tests (CBC, ECG, atbp.)'
                    : '🧪 13 Covered Labs (CBC, ECG, etc.)'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <span className="font-semibold text-blue-100">
                  {isFil
                    ? '🩺 100% Walang Bayad / Zero Out-of-Pocket'
                    : '🩺 100% Zero Copay / Zero Out-of-Pocket'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Action Callouts */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-4 w-full sm:w-auto shrink-0 z-10">
            <Link
              to="/services/health-services/access-free-check-ups-labs-and-medicines-through-philhealth-yakap"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-450 hover:to-emerald-550 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-lg hover:shadow-emerald-600/20 hover:-translate-y-0.5 transition-all cursor-pointer group"
            >
              {isFil
                ? 'Alamin ang mga Libreng Benepisyo'
                : 'Learn about Free Benefits'}
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1.5 transition-transform" />
            </Link>

            <a
              href="tel:0468401705"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-bold text-sm rounded-2xl transition-all cursor-pointer"
            >
              {isFil
                ? '📞 Tawagan ang RHU: (046) 840-1705'
                : '📞 Call the RHU: (046) 840-1705'}
            </a>
          </div>
        </div>

        {/* Official Citation Badge */}
        <div className="absolute bottom-4 right-4 z-10 text-[9px] text-white/60 bg-black/45 px-2 py-0.5 rounded backdrop-blur-sm border border-white/5 pointer-events-auto">
          {isFil ? 'Opisyal na larawan mula sa' : 'Official image sourced from'}{' '}
          <a
            href="https://www.philhealth.gov.ph/yakap/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white transition-colors"
          >
            PhilHealth YAKAP Portal
          </a>
        </div>
      </div>
    </div>
  );
}
