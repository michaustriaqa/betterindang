import React from 'react';
import { Facebook } from 'lucide-react';
import { footerNavigation } from '../../data/navigation';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const GOV_FACEBOOK_PAGES = [
  { label: 'LGU Indang', href: 'https://www.facebook.com/LGUIndangCavite' },
  { label: 'Tourism Office', href: 'https://www.facebook.com/TourismIndang' },
  {
    label: 'Municipal Police',
    href: 'https://www.facebook.com/indangmunicipalpolicestation',
  },
  {
    label: 'Health Center',
    href: 'https://www.facebook.com/IndangHealthCenter',
  },
  { label: 'BFP Indang', href: 'https://www.facebook.com/indang.fs' },
  { label: 'MDRRMO', href: 'https://www.facebook.com/Indangmddrmo' },
  { label: 'Agri Office (MAO)', href: 'https://www.facebook.com/MAOIndang' },
  { label: 'Water District (IWD)', href: 'https://www.facebook.com/iwd099' },
];

const Footer: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <img
                src="/logo.png"
                alt={t('site_name')}
                className="h-12 w-auto mr-3"
              />
              <div>
                <div className="font-bold">{t('site_name')}</div>
                <div className="text-xs text-gray-400">BetterGov.ph Portal</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              A community portal for residents of Indang, Cavite. Access
              government services, officials, and public information.
            </p>
            <a
              href="https://www.facebook.com/LGUIndangCavite"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <Facebook className="h-5 w-5" />
              <span className="text-sm">@LGUIndangCavite</span>
            </a>
          </div>

          {/* Portal nav sections */}
          {footerNavigation.mainSections.map(section => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Government Facebook Pages */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Official Facebook Pages
            </h3>
            <ul className="space-y-2">
              {GOV_FACEBOOK_PAGES.map(page => (
                <li key={page.label}>
                  <a
                    href={page.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    <Facebook className="h-3.5 w-3.5 shrink-0" />
                    {page.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              {t('footer.copyright')}
            </p>
            <div className="flex space-x-6">
              <Link
                to="https://github.com/bettergovph/bettergov"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Contribute at GitHub
              </Link>
              <Link
                to="/sitemap"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Sitemap
              </Link>
              <a
                href="/accessibility"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
