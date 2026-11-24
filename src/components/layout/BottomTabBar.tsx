import { Compass, Home, Landmark, Phone, Rows3 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';

interface Tab {
  to: string;
  labelKey: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  /** Path prefixes that count as "inside" this tab. */
  match: string[];
}

const TABS: Tab[] = [
  { to: '/', labelKey: 'navbar.home', label: 'Home', icon: Home, match: [] },
  {
    to: '/services',
    labelKey: 'navbar.services',
    label: 'Services',
    icon: Rows3,
    match: ['/services'],
  },
  {
    to: '/government',
    labelKey: 'navbar.government',
    label: 'Government',
    icon: Landmark,
    match: ['/government', '/transparency', '/legislative', '/announcements'],
  },
  {
    to: '/tourism',
    labelKey: 'navbar.tabExplore',
    label: 'Explore',
    icon: Compass,
    match: ['/tourism', '/calendar', '/statistics'],
  },
  {
    to: '/contact',
    labelKey: 'navbar.contact',
    label: 'Contact',
    icon: Phone,
    match: ['/contact'],
  },
];

const isActive = (tab: Tab, pathname: string) =>
  tab.to === '/'
    ? pathname === '/'
    : tab.match.some(p => pathname === p || pathname.startsWith(`${p}/`));

/** Fixed bottom navigation for phones and small tablets (hidden at lg+). */
export default function BottomTabBar() {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  return (
    <nav
      aria-label={t('navbar.mobileNav', 'Main navigation')}
      className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 backdrop-blur pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="mx-auto grid max-w-xl grid-cols-5 px-2">
        {TABS.map(tab => {
          const active = isActive(tab, pathname);
          const Icon = tab.icon;
          return (
            <li key={tab.to}>
              <Link
                to={tab.to}
                aria-current={active ? 'page' : undefined}
                className="flex min-h-16 flex-col items-center justify-center gap-1 py-2"
              >
                <span
                  className={`flex h-8 w-14 items-center justify-center rounded-full transition-colors ${
                    active ? 'bg-sun text-ink' : 'text-gray-600'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span
                  className={`whitespace-nowrap text-[11px] leading-none ${
                    active ? 'font-semibold text-ink' : 'text-gray-700'
                  }`}
                >
                  {t(tab.labelKey, tab.label)}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
