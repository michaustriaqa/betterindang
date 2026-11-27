import { Eye } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';

interface Counts {
  allTime: { visits: number; visitors: number };
  last30Days: { visits: number; visitors: number };
}

/**
 * Public visit counter read from /api/visitors (Google Analytics 4).
 * Renders nothing until data arrives and stays hidden if the endpoint is
 * missing (local dev, unconfigured deploy) or fails.
 */
export default function VisitorCount() {
  const { currentLanguage } = useTranslation();
  const isFil = currentLanguage === 'fil';
  const [counts, setCounts] = useState<Counts | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/visitors', { signal: controller.signal })
      .then(r => (r.ok ? r.json() : null))
      .then((data: Counts | null) => {
        if (data && typeof data.allTime?.visits === 'number') setCounts(data);
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  if (!counts) return null;

  const fmt = (n: number) =>
    new Intl.NumberFormat(isFil ? 'fil-PH' : 'en-PH').format(n);

  return (
    <div
      className="flex items-center gap-1.5 shrink-0 text-gray-400"
      title={
        isFil
          ? 'Mga pagbisita mula sa Google Analytics. Maaaring mas mababa sa totoo.'
          : 'Visits from Google Analytics. May undercount visitors who block trackers.'
      }
    >
      <Eye className="h-3.5 w-3.5" aria-hidden />
      <span className="font-mono">
        {fmt(counts.allTime.visits)} {isFil ? 'pagbisita' : 'visits'}
        {' · '}
        {fmt(counts.last30Days.visits)}{' '}
        {isFil ? 'nitong 30 araw' : 'last 30 days'}
      </span>
    </div>
  );
}
