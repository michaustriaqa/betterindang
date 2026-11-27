import { useEffect, useId, useRef, useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { cn } from '../../lib/utils';

type Kind = 'event' | 'announcement';
type Role = 'staff' | 'resident';

const SUBMISSION_EMAIL =
  import.meta.env.VITE_SUBMISSIONS_EMAIL || 'michaustriaqa@gmail.com';

function buildMailto(kind: Kind, role: Role, isFil: boolean): string {
  const isEvent = kind === 'event';

  const subject = isFil
    ? `[BetterIndang] ${isEvent ? 'Kaganapan' : 'Anunsiyo'} ${role === 'staff' ? 'mula sa kawani ng tanggapan' : 'mula sa residente'}`
    : `[BetterIndang] ${isEvent ? 'Event' : 'Announcement'} ${role === 'staff' ? 'from office staff' : 'relayed by a resident'}`;

  const who = isFil
    ? role === 'staff'
      ? [
          'Ako ay kawani ng tanggapang ito: [PANGALAN NG TANGGAPAN]',
          'Aking pangalan at tungkulin: [PANGALAN AT TUNGKULIN]',
          'Paano ako makokontak (email o telepono): [CONTACT]',
        ]
      : [
          'Ako ay residenteng nagbabahagi ng pampublikong post.',
          'Aking pangalan (opsyonal): [PANGALAN]',
          'Paano ako makokontak (email o telepono): [CONTACT]',
          'Aling tanggapan ang nag-post: [PANGALAN NG TANGGAPAN]',
        ]
    : role === 'staff'
      ? [
          'I am staff of this office: [OFFICE NAME]',
          'My name and role: [YOUR NAME AND ROLE]',
          'How to reach me (email or phone): [CONTACT]',
        ]
      : [
          'I am a resident relaying a public post.',
          'My name (optional): [YOUR NAME]',
          'How to reach me (email or phone): [CONTACT]',
          'Which office posted it: [OFFICE NAME]',
        ];

  const details = isFil
    ? isEvent
      ? [
          'DETALYE NG KAGANAPAN',
          'Pamagat: [PAMAGAT]',
          'Kategorya: [Pista / Kalusugan / Programa / Kaligtasan / Iba pa]',
          'Simula: [PETSA AT ORAS]',
          'Katapusan (opsyonal): [PETSA AT ORAS]',
          'Lugar o apektadong barangay: [LUGAR]',
        ]
      : [
          'DETALYE NG ANUNSIYO',
          'Pamagat: [PAMAGAT]',
          'Kategorya: [Paalala / Trapiko at kalsada / Kalusugan / Tubig at kuryente / Kaligtasan / Programa]',
          'Madalian ba (suspensyon ng klase, sarado ang kalsada, walang serbisyo)? [OO / HINDI]',
          'Mga petsang saklaw: [PETSA]',
          'Lugar o apektadong barangay: [LUGAR]',
        ]
    : isEvent
      ? [
          'EVENT DETAILS',
          'Title: [EVENT TITLE]',
          'Category: [Festival / Health / Program / Safety / Other]',
          'Starts: [DATE AND TIME]',
          'Ends (optional): [DATE AND TIME]',
          'Place or affected barangays: [PLACE]',
        ]
      : [
          'ANNOUNCEMENT DETAILS',
          'Title: [TITLE]',
          'Category: [Advisory / Traffic & roads / Health / Water & power / Safety / Program]',
          'Is it urgent (class suspension, road closure, outage)? [YES / NO]',
          'Dates it applies to: [DATES]',
          'Place or affected barangays: [PLACE]',
        ];

  const tail = isFil
    ? [
        'Pangunahing detalye sa hanggang 280 titik (ano, sino ang apektado): [DETALYE]',
        'Link sa orihinal na Facebook post (kailangan): [LINK]',
        '',
        '[ ] Kinukumpirma kong galing ito sa pampublikong post at walang pribadong personal na detalye.',
      ]
    : [
        'Key facts in up to 280 characters (what, who is affected): [KEY FACTS]',
        'Link to the original Facebook post (required): [LINK]',
        '',
        '[ ] I confirm this comes from a public post and has no private personal details.',
      ];

  const intro = isFil
    ? [
        'Magandang araw sa BetterIndang team,',
        '',
        `Nais kong magdagdag ng ${isEvent ? 'kaganapan' : 'anunsiyo'}.`,
        '',
      ]
    : [
        'Hello BetterIndang team,',
        '',
        `I would like to add ${isEvent ? 'an event' : 'an announcement'}.`,
        '',
      ];

  const body = [...intro, ...who, '', ...details, ...tail].join('\r\n');
  return `mailto:${SUBMISSION_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

interface AddViaEmailProps {
  kind: Kind;
  /** Button label. Defaults to a label for the kind. */
  label?: string;
  variant?: 'primary' | 'light';
  className?: string;
}

/**
 * A button that opens a small dialog: pick staff or resident, then
 * "Send an email" opens the visitor's mail app with a template for that
 * choice. Replaces a submission form, so no backend is needed.
 */
export default function AddViaEmail({
  kind,
  label,
  variant = 'primary',
  className,
}: AddViaEmailProps) {
  const { currentLanguage } = useTranslation();
  const isFil = currentLanguage === 'fil';
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<Role>('staff');
  const titleId = useId();
  const firstRadio = useRef<HTMLInputElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  const defaultLabel =
    kind === 'event'
      ? isFil
        ? 'Magdagdag ng kaganapan'
        : 'Add an event'
      : isFil
        ? 'Magdagdag ng anunsiyo'
        : 'Add an announcement';

  const close = () => {
    setOpen(false);
    trigger.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    firstRadio.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const options: { value: Role; title: string; hint: string }[] = [
    {
      value: 'staff',
      title: isFil ? 'Kawani ng isang tanggapan' : 'Staff of an office',
      hint: isFil
        ? 'Ipapakita bilang "Mula sa [tanggapan]".'
        : 'Shown as "From [office]".',
    },
    {
      value: 'resident',
      title: isFil ? 'Isang residente' : 'A resident',
      hint: isFil
        ? 'Nagbabahagi ng pampublikong post. Ipapakita bilang "Ibinahagi ng boluntaryo".'
        : 'Relaying a public post. Shown as "Relayed by a volunteer".',
    },
  ];

  return (
    <>
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className={cn(
          'inline-flex items-center justify-center min-h-12 px-6 rounded-full text-sm font-semibold transition-colors',
          variant === 'primary'
            ? 'bg-primary-800 text-white hover:bg-primary-700'
            : 'bg-white border border-gray-200 text-gray-900 hover:bg-gray-50',
          className
        )}
      >
        {label ?? defaultLabel}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onMouseDown={e => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
          >
            <h2
              id={titleId}
              className="text-lg font-bold tracking-tight text-gray-900"
            >
              {kind === 'event'
                ? isFil
                  ? 'Magdagdag ng kaganapan sa pamamagitan ng email'
                  : 'Add an event by email'
                : isFil
                  ? 'Magdagdag ng anunsiyo sa pamamagitan ng email'
                  : 'Add an announcement by email'}
            </h2>
            <p className="mt-1.5 text-sm text-gray-600">
              {isFil
                ? 'Piliin kung sino ka. Magbubukas ang email na may template na pupunan. Sinusuri ito ng tagasuri bago i-publish.'
                : 'Pick who you are. We will open an email with a template to fill out. A reviewer checks it before anything is published.'}
            </p>

            <fieldset className="mt-4 space-y-2">
              <legend className="sr-only">{isFil ? 'Ako ay' : 'I am'}</legend>
              {options.map((o, i) => (
                <label
                  key={o.value}
                  className={cn(
                    'flex items-start gap-3 rounded-2xl p-3 cursor-pointer',
                    role === o.value
                      ? 'border-2 border-primary-800 bg-primary-50'
                      : 'border border-gray-300 bg-white'
                  )}
                >
                  <input
                    ref={i === 0 ? firstRadio : undefined}
                    type="radio"
                    name="who"
                    checked={role === o.value}
                    onChange={() => setRole(o.value)}
                    className="mt-1 h-5 w-5 shrink-0"
                  />
                  <span className="text-gray-900">
                    <span className="block font-semibold">{o.title}</span>
                    <span className="block text-sm text-gray-600">
                      {o.hint}
                    </span>
                  </span>
                </label>
              ))}
            </fieldset>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <a
                href={buildMailto(kind, role, isFil)}
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center min-h-12 px-6 rounded-full bg-primary-800 text-white text-sm font-semibold hover:bg-primary-700 transition-colors"
              >
                {isFil ? 'Magpadala ng email' : 'Send an email'}
              </a>
              <button
                type="button"
                onClick={close}
                className="inline-flex items-center justify-center min-h-12 px-5 rounded-full border border-gray-200 bg-white text-gray-900 text-sm font-semibold hover:bg-gray-50 transition-colors"
              >
                {isFil ? 'Kanselahin' : 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
