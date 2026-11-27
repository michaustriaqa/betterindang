import type { NavigationItem } from '../types';
import { serviceCategories as servicesData } from './yamlLoader';
import { groupedCategorySlugs } from './serviceGroups';

interface Subcategory {
  name: string;
  slug: string;
}

interface Category {
  category: string;
  slug: string;
  subcategories: Subcategory[];
}

export const mainNavigation: NavigationItem[] = [
  { label: 'Home', labelKey: 'navbar.home', href: '/' },
  {
    label: 'Services',
    labelKey: 'navbar.services',
    href: '/services',
    // Categories in group order (see serviceGroups.ts).
    children: groupedCategorySlugs
      .map(slug =>
        (servicesData.categories as Category[]).find(c => c.slug === slug)
      )
      .filter((c): c is Category => Boolean(c))
      .map(category => ({
        label: category.category,
        labelKey: `services.categories.${category.slug}.name`,
        href: `/services/${category.slug}`,
      })),
  },
  {
    label: 'Government',
    labelKey: 'navbar.government',
    href: '/government',
    children: [
      {
        label: 'Local Officials Directory',
        labelKey: 'navbar.officials',
        href: '/government/departments/officials',
      },
      {
        label: 'Departments & Officials',
        labelKey: 'navbar.departments',
        href: '/government/departments',
      },
      {
        label: 'Legislative (Municipal Council)',
        labelKey: 'navbar.legislative',
        href: '/government/legislative',
      },
      {
        label: 'Budget & Transparency',
        labelKey: 'navbar.budgetTransparency',
        href: '/transparency',
      },
      {
        label: 'Data & Statistics',
        labelKey: 'navbar.dataStats',
        href: '/statistics',
      },
      {
        label: 'News & Announcements',
        labelKey: 'navbar.news',
        href: '/announcements',
      },
    ],
  },
  {
    label: 'Explore Indang',
    labelKey: 'navbar.explore',
    href: '/explore',
    children: [
      { label: 'Tourism', labelKey: 'navbar.tourism', href: '/tourism' },
      {
        label: 'History',
        labelKey: 'navbar.history',
        href: '/tourism/history',
      },
      {
        label: 'Municipal Profile',
        labelKey: 'navbar.profile',
        href: '/statistics',
      },
      {
        label: 'Events Calendar',
        labelKey: 'navbar.calendar',
        href: '/calendar',
      },
    ],
  },
  { label: 'Contact', labelKey: 'navbar.contact', href: '/contact' },
];

export const footerNavigation = {
  mainSections: [
    {
      title: 'About',
      links: [
        { label: 'About the Portal', href: '/about' },
        // { label: 'Privacy Policy', href: '/privacy' },
        // { label: 'Terms of Use', href: '/terms' },
        { label: 'Accessibility', href: '/accessibility' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'Community Discord', href: '/discord' },
      ],
    },
    {
      title: 'Services',
      links: [
        {
          label: 'All Services',
          labelKey: 'services.viewAll',
          href: '/services',
        },
        ...(servicesData.categories as Category[])
          .slice(0, 6)
          .map(category => ({
            label: category.category,
            labelKey: `services.categories.${category.slug}.name`,
            href: `/services/${category.slug}`,
          })),
        {
          label: 'Hotlines',
          labelKey: 'navbar.hotlines',
          href: '/philippines/hotlines',
        },
        {
          label: 'Holidays',
          labelKey: 'navbar.holidays',
          href: '/philippines/holidays',
        },
      ],
    },
    {
      title: 'Government',
      links: [
        {
          label: 'Departments & Officials',
          labelKey: 'navbar.departments',
          href: '/government/departments',
        },
        {
          label: 'Legislative (Municipal Council)',
          labelKey: 'navbar.legislative',
          href: '/government/legislative',
        },
        {
          label: 'Local Officials Directory',
          labelKey: 'navbar.officials',
          href: '/government/departments/officials',
        },
        {
          label: 'Transparency Documents',
          labelKey: 'navbar.transparencyDocs',
          href: '/transparency',
        },
        {
          label: 'Freedom of Information',
          labelKey: 'navbar.foi',
          href: 'https://www.foi.gov.ph',
        },
      ],
    },
  ],
  socialLinks: [
    { label: 'Facebook', href: 'https://www.facebook.com/LGUIndangCavite' },
  ],
};
