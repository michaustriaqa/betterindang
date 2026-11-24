import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from '../ui/Reveal';
import { useTranslation } from '../../hooks/useTranslation';
import { SOURCES, loadAnnouncements, toDateKey } from '../../data/updates';

const FACEBOOK_URL = 'https://www.facebook.com/LGUIndangCavite';

/** Home: the three newest announcements, or a pointer to the LGU page. */
export default function LatestUpdatesSection() {
  const { currentLanguage } = useTranslation();
  const isFil = currentLanguage === 'fil';
  const latest = loadAnnouncements().slice(0, 3);

  return (
    <Reveal as="section" className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            {isFil
              ? 'Pinakabago mula sa munisipyo'
              : 'Latest from the municipality'}
          </h2>
          <Link
            to="/announcements"
            className="text-sm font-semibold text-primary-700 hover:underline"
          >
            {isFil
              ? 'Lahat ng balita at anunsiyo →'
              : 'All news & announcements →'}
          </Link>
        </div>
        <p className="mt-1 text-sm text-gray-600">
          {isFil
            ? 'Mula sa mga opisyal na Facebook page ng mga tanggapan. May link sa orihinal ang bawat item.'
            : 'From the offices’ official Facebook pages. Every item links to the original.'}
        </p>

        {latest.length === 0 ? (
          <div className="mt-5 rounded-2xl bg-gray-50 p-5 text-sm text-gray-700">
            {isFil
              ? 'Wala pang anunsiyo rito. Para sa pinakabagong balita, bisitahin ang opisyal na Facebook page ng LGU Indang.'
              : 'No announcements here yet. For the latest news, visit the official LGU Indang Facebook page.'}
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex min-h-11 w-fit items-center gap-1.5 font-semibold text-primary-700 hover:underline"
            >
              {isFil ? 'Buksan ang Facebook page' : 'Open the Facebook page'}
              <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
          </div>
        ) : (
          <ul className="mt-4 divide-y divide-gray-100">
            {latest.map(a => (
              <li key={a.id} className="py-3.5">
                <p className="text-xs text-gray-600">
                  {toDateKey(a.postedAt)} ·{' '}
                  {isFil ? SOURCES[a.source].labelFil : SOURCES[a.source].label}
                </p>
                <a
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-gray-900 hover:underline"
                >
                  {isFil && a.titleFil ? a.titleFil : a.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Reveal>
  );
}
