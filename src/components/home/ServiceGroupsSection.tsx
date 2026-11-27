import * as LucideIcons from 'lucide-react';
import { Link } from 'react-router-dom';
import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import Reveal from '../ui/Reveal';
import { useTranslation } from '../../hooks/useTranslation';
import { serviceCategories } from '../../data/yamlLoader';
import { serviceGroups } from '../../data/serviceGroups';

interface Category {
  category: string;
  slug: string;
  icon: string;
}

/** Home: the ten service categories, grouped by what a resident wants to do. */
export default function ServiceGroupsSection() {
  const { t, currentLanguage } = useTranslation();
  const isFil = currentLanguage === 'fil';
  const categories = serviceCategories.categories as Category[];

  const iconFor = (name: string) => {
    const Icon = LucideIcons[name as keyof typeof LucideIcons] as
      | React.ComponentType<{ className?: string }>
      | undefined;
    return Icon ? <Icon className="h-4 w-4" /> : null;
  };

  return (
    <Section>
      <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
        <div>
          <Heading level={2} className="mb-1">
            {isFil ? 'Mag-browse ng mga serbisyo' : 'Browse services'}
          </Heading>
          <Text className="text-gray-600 mb-0">
            {isFil
              ? 'Sampung serbisyo, pinagsama ayon sa kung ano ang nais mong gawin.'
              : 'Ten services, grouped by what you are trying to do.'}
          </Text>
        </div>
        <Link
          to="/services"
          className="text-sm font-semibold text-primary-700 hover:underline"
        >
          {t('services.viewAll')} →
        </Link>
      </div>

      <Reveal
        stagger
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start"
      >
        {serviceGroups.map(group => {
          const items = group.slugs
            .map(slug => categories.find(c => c.slug === slug))
            .filter((c): c is Category => Boolean(c));
          return (
            <div
              key={group.id}
              className="rounded-3xl border border-gray-200 bg-white px-5 pt-5 pb-2"
            >
              <div className="flex items-center justify-between gap-2 pb-3">
                <h3 className="text-lg font-semibold leading-tight text-gray-900">
                  {t(group.labelKey, group.label)}
                </h3>
                <span className="shrink-0 rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-semibold text-primary-800">
                  {items.length}
                </span>
              </div>
              {items.map(c => (
                <Link
                  key={c.slug}
                  to={`/services/${c.slug}`}
                  className="flex min-h-14 items-center gap-3 border-t border-gray-100 text-sm font-medium text-gray-900 hover:text-primary-700"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-800">
                    {iconFor(c.icon)}
                  </span>
                  {t(`services.categories.${c.slug}.name`, c.category)}
                </Link>
              ))}
            </div>
          );
        })}
      </Reveal>
    </Section>
  );
}
