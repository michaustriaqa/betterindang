import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useTranslation } from '../hooks/useTranslation';
import { HOTLINES } from '../data/hotlines';

const PHONE = import.meta.env.VITE_CONTACT_PHONE || '(046) 460-4708';
const EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'm1.indang@yahoo.com';
const FACEBOOK_URL = 'https://www.facebook.com/LGUIndangCavite';

export default function Contact() {
  const { t, currentLanguage } = useTranslation();
  const isFil = currentLanguage === 'fil';

  const title = isFil
    ? 'Makipag-ugnayan sa Munisipalidad'
    : 'Contact the Municipality';

  const rows = [
    {
      icon: MapPin,
      label: isFil ? 'Address' : 'Address',
      value: 'A. Mojica St., Poblacion 3, Indang, Cavite 4122',
      href: 'https://maps.google.com/?q=Indang+Municipal+Hall+Cavite',
    },
    {
      icon: Phone,
      label: isFil ? 'Telepono' : 'Phone',
      value: PHONE,
      href: `tel:${PHONE.replace(/\D/g, '')}`,
    },
    {
      icon: Mail,
      label: 'Email',
      value: EMAIL,
      href: `mailto:${EMAIL}`,
    },
    {
      icon: Clock,
      label: isFil ? 'Oras ng opisina' : 'Office hours',
      value: isFil
        ? 'Lunes hanggang Biyernes, 8AM hanggang 5PM'
        : 'Monday to Friday, 8AM to 5PM',
      href: undefined,
    },
  ];

  return (
    <>
      <SEO
        title={isFil ? 'Makipag-ugnayan' : 'Contact'}
        description={
          isFil
            ? 'Address, telepono, oras ng opisina, at emergency hotline ng Munisipyo ng Indang, Cavite.'
            : 'Address, phone, office hours and emergency hotlines of the Municipal Hall of Indang, Cavite.'
        }
        keywords="Indang contact, municipal hall, hotlines, office hours"
      />
      <main className="flex-grow bg-ground">
        <div className="bg-white border-b border-line">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900">
              {title}
            </h1>
            <p className="mt-3 max-w-xl text-lg text-gray-600">
              {isFil
                ? 'Saan pupunta, sino ang tatawagan, at kailan bukas ang Munisipyo.'
                : 'Where to go, who to call, and when the Municipal Hall is open.'}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid gap-5 lg:grid-cols-[1.2fr_1fr] items-start">
          <div className="space-y-5">
            <section className="rounded-3xl border border-line bg-white p-6 sm:p-8">
              <p className="text-xs font-semibold text-gray-600">
                {isFil ? 'Bumisita' : 'Visit'}
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                {isFil ? 'Munisipyo ng Indang' : 'Municipal Hall'}
              </h2>
              <dl className="mt-5 space-y-4">
                {rows.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex gap-3">
                    <Icon
                      className="h-5 w-5 mt-0.5 shrink-0 text-primary-700"
                      aria-hidden
                    />
                    <div>
                      <dt className="text-xs text-gray-600">{label}</dt>
                      <dd className="font-medium text-gray-900">
                        {href ? (
                          <a
                            href={href}
                            {...(href.startsWith('http')
                              ? { target: '_blank', rel: 'noreferrer' }
                              : {})}
                            className="hover:underline"
                          >
                            {value}
                          </a>
                        ) : (
                          value
                        )}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
              <div className="mt-6 flex flex-wrap gap-2.5">
                <Link
                  to="/government/departments"
                  className="inline-flex items-center min-h-12 px-6 rounded-full bg-primary-800 text-white text-sm font-semibold hover:bg-primary-700"
                >
                  {isFil
                    ? 'Mga tanggapan at departamento'
                    : 'Offices & departments'}
                </Link>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center min-h-12 px-6 rounded-full border border-line bg-white text-sm font-semibold text-gray-900 hover:bg-gray-50"
                >
                  {isFil
                    ? 'Opisyal na updates sa Facebook'
                    : 'Official updates on Facebook'}
                </a>
              </div>
            </section>
          </div>

          <div className="space-y-5">
            <section className="rounded-3xl bg-primary-900 p-6 text-white">
              <p className="text-xs font-semibold text-accent-300">Emergency</p>
              <h2 className="text-2xl font-bold tracking-tight">
                {isFil ? 'Mga hotline' : 'Hotlines'}
              </h2>
              <ul className="mt-4">
                {HOTLINES.map(h => (
                  <li key={h.labelKey} className="border-t border-white/15">
                    <a
                      href={`tel:${h.tel}`}
                      className="flex min-h-14 items-center justify-between gap-3 hover:underline"
                    >
                      <span>{t(h.labelKey)}</span>
                      <strong className="font-semibold">{h.number}</strong>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
            <section className="rounded-3xl bg-warning-50 p-6">
              <h2 className="text-lg font-bold text-gray-900">
                {isFil ? 'Tungkol sa portal na ito' : 'About this portal'}
              </h2>
              <p className="mt-1.5 text-sm text-gray-700">
                {isFil
                  ? 'Ang BetterIndang.org ay pinapatakbo ng komunidad at hindi opisyal na website ng pamahalaan. Para mag-ulat ng maling numero o nawawalang pahina, makipag-ugnayan sa komunidad.'
                  : 'BetterIndang.org is community-run and is not an official government website. To report a wrong number or a missing page, reach the community.'}
              </p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                <a
                  href="https://github.com/michaustriaqa/betterindang"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center min-h-11 px-5 rounded-full bg-white border border-line text-sm font-semibold text-gray-900"
                >
                  GitHub
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
