import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Pill,
  FlaskConical,
  Stethoscope,
  Phone,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

interface Slide {
  id: string;
  bg: string;
  badge: string;
  badgeIcon: React.ReactNode;
  title: React.ReactNode;
  body: React.ReactNode;
  metrics: React.ReactNode;
  cta: React.ReactNode;
}

function useSlides(isFil: boolean): Slide[] {
  return [
    {
      id: 'yakap',
      bg: 'linear-gradient(to right, rgba(0,48,135,0.95) 40%, rgba(0,48,135,0.45) 100%), url("https://www.philhealth.gov.ph/yakap/images/YAKAPSubpage_WebsiteHero_v002.jpg")',
      badge: isFil
        ? 'Libreng Kalusugan Para sa Lahat'
        : 'Free Health Care For All',
      badgeIcon: <ShieldCheck className="h-4 w-4 text-emerald-400" />,
      title: (
        <>
          PhilHealth <span className="text-emerald-300">YAKAP</span>
        </>
      ),
      body: isFil ? (
        <>
          Dito sa Indang, sagot ng <strong>PhilHealth YAKAP</strong> ang inyong
          regular na check-up, hanggang{' '}
          <strong>13 uri ng laboratory tests</strong>, at hanggang{' '}
          <strong>₱20,000 na libreng gamot</strong> taun-taon!
        </>
      ) : (
        <>
          Here in Indang, <strong>PhilHealth YAKAP</strong> covers your regular
          check-ups, up to <strong>13 diagnostic laboratory tests</strong>, and
          up to <strong>₱20,000 worth of free medicines</strong> annually!
        </>
      ),
      metrics: (
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <Pill className="h-4 w-4 text-emerald-300 shrink-0" />
            <span className="font-semibold text-blue-100">
              {isFil
                ? '₱20k na Gamot sa Maintenance'
                : '₱20k Maintenance Medicines'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FlaskConical className="h-4 w-4 text-emerald-300 shrink-0" />
            <span className="font-semibold text-blue-100">
              {isFil
                ? '13 na Laboratory Tests'
                : '13 Covered Labs (CBC, ECG, etc.)'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4 text-emerald-300 shrink-0" />
            <span className="font-semibold text-blue-100">
              {isFil ? '100% Walang Bayad' : '100% Zero Copay'}
            </span>
          </div>
        </div>
      ),
      cta: (
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto shrink-0">
          <Link
            to="/services/health-services/access-free-check-ups-labs-and-medicines-through-philhealth-yakap"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-extrabold text-sm rounded-2xl shadow-lg hover:-translate-y-0.5 transition-all group"
          >
            {isFil
              ? 'Alamin ang mga Libreng Benepisyo'
              : 'Learn about Free Benefits'}
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="tel:0468401705"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-bold text-sm rounded-2xl transition-all"
          >
            <Phone className="h-4 w-4 shrink-0" />
            {isFil
              ? 'Tawagan ang RHU: (046) 840-1705'
              : 'Call the RHU: (046) 840-1705'}
          </a>
        </div>
      ),
    },
    {
      id: 'tourism',
      bg: 'linear-gradient(to right, rgba(5,90,50,0.95) 40%, rgba(5,90,50,0.45) 100%), url("/tourism/CvSU.webp")',
      badge: isFil ? 'Ang Bayan ng Maraming Bukal' : 'Town of Many Springs',
      badgeIcon: <MapPin className="h-4 w-4 text-green-300" />,
      title: (
        <>
          {isFil ? 'Bisitahin ang ' : 'Explore '}
          <span className="text-green-300">Indang</span>
        </>
      ),
      body: isFil ? (
        <>
          Tuklasin ang mga natural spring resort, heritage sites, agri-tourism,
          at mga masasarap na kainan sa <strong>Bayan ng Maraming Bukal</strong>{' '}
          — isang oras lamang mula Maynila.
        </>
      ) : (
        <>
          Natural spring resorts, centuries-old heritage sites, agri-eco parks,
          and local dining — the <strong>Town of Many Springs</strong> is just
          one hour from Manila.
        </>
      ),
      metrics: (
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-green-300 shrink-0" />
            <span className="font-semibold text-green-100">
              {isFil ? '6 kategorya ng tourism' : '6 tourism categories'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-green-300 shrink-0" />
            <span className="font-semibold text-green-100">
              {isFil
                ? 'Mga registered na establisyamento'
                : 'Registered establishments'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ArrowRight className="h-4 w-4 text-green-300 shrink-0" />
            <span className="font-semibold text-green-100">
              {isFil ? '1 oras mula Maynila' : '1 hr from Manila'}
            </span>
          </div>
        </div>
      ),
      cta: (
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto shrink-0">
          <Link
            to="/tourism"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-extrabold text-sm rounded-2xl shadow-lg hover:-translate-y-0.5 transition-all group"
          >
            {isFil ? 'I-explore ang Tourism' : 'Explore Tourism'}
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/tourism/resorts"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-bold text-sm rounded-2xl transition-all"
          >
            <MapPin className="h-4 w-4 shrink-0" />
            {isFil ? 'Tingnan ang mga Resort' : 'View Resorts'}
          </Link>
        </div>
      ),
    },
  ];
}

export default function FeaturedCarousel() {
  const { currentLanguage } = useTranslation();
  const isFil = currentLanguage === 'fil';
  const slides = useSlides(isFil);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setActive(i => (i + 1) % slides.length);
    }, 6000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, slides.length]);

  const goTo = (index: number) => {
    setActive(index);
    setPaused(true);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setTimeout(
      () => setPaused(false),
      8000
    ) as unknown as ReturnType<typeof setInterval>;
  };

  const prev = () => goTo((active - 1 + slides.length) % slides.length);
  const next = () => goTo((active + 1) % slides.length);

  const slide = slides[active];

  return (
    <div
      className="relative overflow-hidden my-12 mx-auto max-w-7xl px-4 sm:px-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="relative rounded-3xl overflow-hidden p-8 md:p-12 shadow-2xl text-white border border-white/10 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: slide.bg }}
        key={slide.id}
      >
        {/* Decorative blurs */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white/90 border border-white/10 text-[10px] sm:text-xs font-black uppercase tracking-wider mb-4">
              {slide.badgeIcon}
              {slide.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-white mb-4">
              {slide.title}
            </h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed font-medium mb-6">
              {slide.body}
            </p>
            {slide.metrics}
          </div>
          {slide.cta}
        </div>

        {/* Navigation */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous"
            className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="h-4 w-4 text-white" />
          </button>
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${i === active ? 'w-5 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/60'}`}
            />
          ))}
          <button
            type="button"
            onClick={next}
            aria-label="Next"
            className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors"
          >
            <ChevronRight className="h-4 w-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
