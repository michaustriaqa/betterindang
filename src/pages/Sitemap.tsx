import { Link } from 'react-router-dom';
import {
  Home,
  Briefcase,
  Building2,
  BarChart3,
  Shield,
  MapPin,
  Phone,
  Map,
  ChevronRight,
} from 'lucide-react';
import SEO from '../components/SEO';
import { serviceCategories as servicesData } from '../data/yamlLoader';

interface Category {
  category: string;
  slug: string;
}

const SECTIONS = [
  {
    icon: Home,
    label: 'Home',
    href: '/',
    children: [],
  },
  {
    icon: Briefcase,
    label: 'Services',
    href: '/services',
    children: (servicesData.categories as Category[]).map(c => ({
      label: c.category,
      href: `/services/${c.slug}`,
    })),
  },
  {
    icon: Building2,
    label: 'Government',
    href: '/government',
    children: [
      { label: 'Departments & Officials', href: '/government/departments' },
      {
        label: 'Legislative (Municipal Council)',
        href: '/government/legislative',
      },
      {
        label: 'Local Officials Directory',
        href: '/government/departments/officials',
      },
    ],
  },
  {
    icon: Shield,
    label: 'Transparency',
    href: '/transparency',
    children: [
      { label: 'Full Disclosure Policy', href: '/transparency' },
      {
        label: 'Transparency Documents',
        href: '/government/transparency-documents',
      },
      {
        label: 'Reports & Statistics',
        href: '/government/reports-and-statistics',
      },
    ],
  },
  {
    icon: BarChart3,
    label: 'Statistics',
    href: '/statistics',
    children: [
      { label: 'Municipal Profile', href: '/statistics' },
      { label: 'Barangay Data', href: '/statistics' },
    ],
  },
  {
    icon: MapPin,
    label: 'Tourism',
    href: '/tourism',
    children: [
      { label: 'Heritage Sites', href: '/tourism/heritage' },
      { label: 'Resorts', href: '/tourism/resorts' },
      { label: 'Farms & Agri-Eco', href: '/tourism/farms' },
      { label: 'Events & Accommodations', href: '/tourism/events' },
      { label: 'Restaurants & Cafés', href: '/tourism/restaurants' },
      { label: 'Adventure & Eco', href: '/tourism/adventure' },
    ],
  },
  {
    icon: Phone,
    label: 'Contact',
    href: '/#contact',
    children: [],
  },
  {
    icon: Map,
    label: 'Quick Links',
    href: '#',
    children: [
      { label: 'About the Portal', href: '/about' },
      { label: 'Accessibility', href: '/accessibility' },
      {
        label: 'Freedom of Information',
        href: 'https://www.foi.gov.ph',
      },
      {
        label: 'Open Data PH',
        href: 'https://data.gov.ph',
      },
    ],
  },
];

export default function Sitemap() {
  return (
    <>
      <SEO
        title="Sitemap"
        description="Full sitemap of the BetterIndang community portal — browse all pages and sections."
        keywords="sitemap, Indang, portal, navigation"
      />

      {/* Header */}
      <div className="bg-primary-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-primary-300 text-xs font-bold uppercase tracking-widest mb-2">
            BetterIndang
          </p>
          <h1 className="text-4xl font-black mb-2">Sitemap</h1>
          <p className="text-primary-200 text-sm max-w-xl">
            A complete list of all pages and sections available on this portal.
          </p>
        </div>
      </div>

      {/* Sections */}
      <main className="bg-gray-50 py-12 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SECTIONS.map(section => {
              const Icon = section.icon;
              return (
                <div
                  key={section.label}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-primary-50 text-primary-700 flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    {section.href.startsWith('http') || section.href === '#' ? (
                      <span className="font-black text-gray-900 text-base">
                        {section.label}
                      </span>
                    ) : (
                      <Link
                        to={section.href}
                        className="font-black text-gray-900 text-base hover:text-primary-700 transition-colors"
                      >
                        {section.label}
                      </Link>
                    )}
                  </div>

                  {section.children.length > 0 && (
                    <ul className="space-y-1.5 border-t border-gray-50 pt-3">
                      {section.children.map(child => (
                        <li key={child.label}>
                          {child.href.startsWith('http') ? (
                            <a
                              href={child.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary-700 transition-colors"
                            >
                              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                              {child.label}
                            </a>
                          ) : (
                            <Link
                              to={child.href}
                              className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary-700 transition-colors"
                            >
                              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                              {child.label}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
