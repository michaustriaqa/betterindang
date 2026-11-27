/**
 * Groups the service categories by what a resident is trying to do.
 * Category slugs must match `src/data/services.yaml`.
 */
export interface ServiceGroup {
  id: string;
  /** i18n key for the group title (`services.groups.<id>`). */
  labelKey: string;
  label: string;
  slugs: string[];
}

export const serviceGroups: ServiceGroup[] = [
  {
    id: 'health-welfare',
    labelKey: 'services.groups.health-welfare',
    label: 'Health & welfare',
    slugs: ['health-services', 'social-welfare', 'education'],
  },
  {
    id: 'business-livelihood',
    labelKey: 'services.groups.business-livelihood',
    label: 'Business & livelihood',
    slugs: ['business', 'agriculture-fisheries'],
  },
  {
    id: 'home-community',
    labelKey: 'services.groups.home-community',
    label: 'Home & community',
    slugs: [
      'housing-land-use',
      'infrastructure-public-works',
      'garbage-waste-disposal',
      'environment',
    ],
  },
  {
    id: 'safety',
    labelKey: 'services.groups.safety',
    label: 'Safety & emergencies',
    slugs: ['disaster-preparedness'],
  },
];

/** Category slugs in group order, for menus and lists. */
export const groupedCategorySlugs = serviceGroups.flatMap(g => g.slugs);
