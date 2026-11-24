import { Link } from 'react-router-dom';
import Reveal from '../ui/Reveal';
import { useTranslation } from '../../hooks/useTranslation';

const YAKAP_PATH =
  '/services/health-services/access-free-check-ups-labs-and-medicines-through-philhealth-yakap';

/** Home: one featured service, kept simple. */
export default function FeaturedServiceSection() {
  const { currentLanguage } = useTranslation();
  const isFil = currentLanguage === 'fil';

  const facts = [
    { value: '₱0', label: isFil ? 'Gastos mo' : 'Cost to you' },
    { value: '13', label: isFil ? 'Uri ng lab test' : 'Lab test types' },
    {
      value: '₱20,000',
      label: isFil ? 'Gamot kada taon' : 'Medicines a year',
    },
  ];

  return (
    <Reveal as="section" className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="rounded-3xl bg-success-50 p-7 sm:p-9 grid gap-8 lg:grid-cols-[1.3fr_1fr] items-center">
        <div>
          <span className="inline-block rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-success-700">
            {isFil ? 'Tampok na serbisyo' : 'Featured service'}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-success-900">
            PhilHealth YAKAP
          </h2>
          <p className="mt-3 max-w-xl text-base sm:text-lg text-success-900">
            {isFil
              ? 'Dito sa Indang, sagot ng PhilHealth YAKAP ang inyong regular na check-up, hanggang 13 uri ng laboratory tests, at hanggang ₱20,000 na libreng gamot taun-taon!'
              : 'Here in Indang, PhilHealth YAKAP covers your regular check-ups, up to 13 types of laboratory tests, and up to ₱20,000 in free medicines every year.'}
          </p>
          <Link
            to={YAKAP_PATH}
            className="mt-6 inline-flex items-center min-h-12 px-7 rounded-full bg-success-700 text-white text-sm font-semibold hover:bg-success-800 transition-colors"
          >
            {isFil ? 'Tingnan kung paano mag-avail' : 'See how to avail'}
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {facts.map(f => (
            <div key={f.label} className="rounded-3xl bg-white p-4">
              <div className="text-2xl font-semibold tracking-tight text-success-700">
                {f.value}
              </div>
              <div className="text-xs text-success-900">{f.label}</div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
