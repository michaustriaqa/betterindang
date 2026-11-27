import Section from '../components/ui/Section';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import { Banner } from '@bettergov/kapwa/banner';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useTranslation } from '../hooks/useTranslation';
import {
  loadMarkdownContent,
  type MarkdownContent,
} from '../lib/markdownLoader';
import { createMarkdownComponents } from '../lib/markdownComponents';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { headingId, stripInlineMarkdown } from '../lib/headingId';
import { getTypographyTheme } from '../lib/typographyThemes';
import {
  serviceCategories,
  governmentCategories,
  getCategorySubcategories,
  isNestedCategory,
  type Subcategory,
  type CategoryIndex,
} from '../data/yamlLoader';
import SEO from '../components/SEO';

interface DocumentProps {
  theme?: string;
  categoryType?: 'service' | 'government';
}

export default function Document({
  theme: initialTheme = 'default',
  categoryType,
}: DocumentProps) {
  const { documentSlug, category } = useParams();
  const [markdownContent, setMarkdownContent] =
    useState<MarkdownContent | null>(null);
  const [nestedIndex, setNestedIndex] = useState<CategoryIndex | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentLanguage, t } = useTranslation();
  const isFil = currentLanguage === 'fil';

  const markdownComponents = createMarkdownComponents(
    getTypographyTheme(initialTheme)
  );

  const [breadcrumbs, setBreadcrumbs] = useState([
    { label: isFil ? 'Tahanan' : 'Home', href: '/' },
  ]);

  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll<HTMLElement>('.markdown-content h2[id]')
    );
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.find(e => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-180px 0px -65% 0px' }
    );
    headings.forEach(h => observer.observe(h));
    return () => observer.disconnect();
  }, [markdownContent]);

  useEffect(() => {
    if (!documentSlug || !category || !categoryType) {
      setError(isFil ? 'Walang tinukoy na dokumento' : 'No document specified');
      setLoading(false);
      return;
    }

    const loadContent = async () => {
      try {
        setLoading(true);
        setError(null);

        const isGovernment = categoryType === 'government';
        const categories = isGovernment
          ? governmentCategories.categories
          : serviceCategories.categories;
        const sectionLabel = isGovernment
          ? isFil
            ? 'Pamahalaan'
            : 'Government'
          : isFil
            ? 'Mga Serbisyo'
            : 'Services';
        const sectionHref = isGovernment ? '/government' : '/services';
        const categoryData = categories.find(c => c.slug === category);
        const categoryName = categoryData
          ? isGovernment
            ? t(
                `government.categories.${categoryData.slug}.name`,
                categoryData.category
              )
            : t(
                `services.categories.${categoryData.slug}.name`,
                categoryData.category
              )
          : category;

        // If the slug maps to its own index, render it as a nested listing
        if (isNestedCategory(documentSlug)) {
          const index = await getCategorySubcategories(documentSlug);
          setNestedIndex(index);
          setBreadcrumbs([
            { label: isFil ? 'Tahanan' : 'Home', href: '/' },
            { label: sectionLabel, href: sectionHref },
            {
              label: categoryName ?? category,
              href: `${sectionHref}/${category}`,
            },
            {
              label: isGovernment
                ? t(
                    `government.subcategories.${documentSlug}.name`,
                    documentSlug
                  )
                : t(
                    `services.subcategories.${documentSlug}.name`,
                    documentSlug
                  ),
              href: `${sectionHref}/${category}/${documentSlug}`,
            },
          ]);
          return;
        }

        const content = await loadMarkdownContent(
          documentSlug,
          category,
          categoryType,
          currentLanguage
        );
        setMarkdownContent(content);

        setBreadcrumbs([
          { label: isFil ? 'Tahanan' : 'Home', href: '/' },
          { label: sectionLabel, href: sectionHref },
          {
            label: categoryName ?? category,
            href: `${sectionHref}/${category}`,
          },
          {
            label: content.title ?? documentSlug,
            href: `${sectionHref}/${category}/${documentSlug}`,
          },
        ]);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : isFil
              ? 'Bigo sa pag-load ng dokumento'
              : 'Failed to load document'
        );
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [documentSlug, category, categoryType, currentLanguage]);

  if (loading) {
    return (
      <Section className="p-3 mb-12">
        <Banner
          type="info"
          description={
            isFil ? 'Kinukuha ang dokumento...' : 'Loading document...'
          }
        />
      </Section>
    );
  }

  if (error) {
    return (
      <Section className="p-3 mb-12">
        <Breadcrumbs className="mb-8" items={breadcrumbs} />
        <Banner
          type="error"
          title={isFil ? 'Hindi Nahanap ang Dokumento' : 'Document Not Found'}
          description={error}
          icon
        />
      </Section>
    );
  }

  if (nestedIndex) {
    const nestedPages: Subcategory[] = nestedIndex.pages;
    const isGovernment = categoryType === 'government';
    return (
      <>
        <SEO
          title={documentSlug}
          keywords={`${documentSlug}, government services, local government`}
        />
        <Section className="p-3 mb-12">
          <Breadcrumbs className="mb-8" items={breadcrumbs} />
          {nestedIndex.title && (
            <Heading level={2}>
              {isGovernment
                ? t(
                    `government.subcategories.${documentSlug}.name`,
                    nestedIndex.title
                  )
                : t(
                    `services.subcategories.${documentSlug}.name`,
                    nestedIndex.title
                  )}
            </Heading>
          )}
          {nestedIndex.description && (
            <Text className="text-gray-600 mb-4">
              {isGovernment
                ? t(
                    `government.subcategories.${documentSlug}.description`,
                    nestedIndex.description
                  )
                : t(
                    `services.subcategories.${documentSlug}.description`,
                    nestedIndex.description
                  )}
            </Text>
          )}
          {nestedIndex.layout === 'grid' ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {nestedPages.map((page, i) => (
                <Card hoverable key={page.slug ?? i} className="h-full">
                  <CardContent>
                    <h4 className="text-lg font-medium text-gray-900">
                      {isGovernment
                        ? t(
                            `government.subcategories.${page.slug}.name`,
                            page.name
                          )
                        : t(
                            `services.subcategories.${page.slug}.name`,
                            page.name
                          )}
                    </h4>
                    {page.description && (
                      <p className="mt-2 text-sm text-gray-600">
                        {isGovernment
                          ? t(
                              `government.subcategories.${page.slug}.description`,
                              page.description
                            )
                          : t(
                              `services.subcategories.${page.slug}.description`,
                              page.description
                            )}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {nestedPages.map((page, i) => (
                <Card key={page.slug ?? i} className="mb-4">
                  <CardContent>
                    <h4 className="text-lg font-medium text-gray-900">
                      {isGovernment
                        ? t(
                            `government.subcategories.${page.slug}.name`,
                            page.name
                          )
                        : t(
                            `services.subcategories.${page.slug}.name`,
                            page.name
                          )}
                    </h4>
                    {page.description && (
                      <p className="mt-2 text-sm text-gray-600">
                        {isGovernment
                          ? t(
                              `government.subcategories.${page.slug}.description`,
                              page.description
                            )
                          : t(
                              `services.subcategories.${page.slug}.description`,
                              page.description
                            )}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </Section>
      </>
    );
  }

  if (!markdownContent) {
    return null;
  }

  const { title, description } = markdownContent;
  // The page header shows the title and lead, so the body omits them.
  const body = markdownContent.body;
  const sections = [...body.matchAll(/^##\s+(.+)$/gm)].map(m => {
    const text = stripInlineMarkdown(m[1]);
    return { text, id: headingId(text) };
  });
  const minutes = Math.max(1, Math.round(body.split(/\s+/).length / 200));
  const parent = breadcrumbs.length >= 3 ? breadcrumbs[2] : null;
  // The title is repeated in the heading below, so keep the last crumb short.
  const shortCrumbs = breadcrumbs.map((c, i) =>
    i === breadcrumbs.length - 1 && c.label.length > 32
      ? { ...c, label: `${c.label.slice(0, 30).trimEnd()}…` }
      : c
  );

  const toc = (
    <ol className="space-y-0.5">
      {sections.map(sec => (
        <li key={sec.id}>
          <a
            href={`#${sec.id}`}
            className={`block rounded-xl px-3 py-2 text-sm leading-snug transition-colors ${
              (activeId || sections[0]?.id) === sec.id
                ? 'bg-primary-50 font-semibold text-primary-800'
                : 'text-gray-700 hover:bg-primary-50'
            }`}
          >
            {sec.text}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      <SEO
        title={title || documentSlug}
        description={
          (description && stripInlineMarkdown(description)) ||
          `Government service information for ${documentSlug}`
        }
        keywords={`${documentSlug}, government services, public services, local government`}
      />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
          <Breadcrumbs items={shortCrumbs} />
          <header className="mt-6 max-w-3xl">
            {parent && (
              <Link
                to={parent.href}
                className="inline-flex items-center rounded-full bg-primary-50 px-3.5 py-1.5 text-xs font-semibold text-primary-800 hover:bg-primary-100"
              >
                {parent.label}
              </Link>
            )}
            <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-ink">
              {title ||
                (documentSlug ?? '')
                  .replace(/-/g, ' ')
                  .replace(/^./, c => c.toUpperCase())}
            </h1>
            {description && (
              <p className="mt-4 text-lg leading-8 text-gray-600">
                {stripInlineMarkdown(description)}
              </p>
            )}
            {body && (
              <p className="mt-4 text-sm text-gray-600">
                {minutes} {isFil ? 'minutong basahin' : 'min read'}
              </p>
            )}
          </header>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] items-start">
          {sections.length > 1 && (
            <>
              <details className="lg:hidden rounded-3xl border border-line bg-white p-4">
                <summary className="cursor-pointer text-sm font-semibold text-ink">
                  {isFil ? 'Sa pahinang ito' : 'On this page'}
                </summary>
                <div className="mt-3">{toc}</div>
              </details>
              <aside className="hidden lg:block lg:sticky lg:top-44 rounded-3xl border border-line bg-white p-3">
                <p className="px-3 py-2 text-xs font-semibold text-gray-600">
                  {isFil ? 'Sa pahinang ito' : 'On this page'}
                </p>
                {toc}
              </aside>
            </>
          )}

          <article
            className={`min-w-0 rounded-3xl border border-line bg-white p-6 sm:p-10 ${
              sections.length > 1 ? '' : 'lg:col-span-2 max-w-3xl'
            }`}
          >
            {body ? (
              <div className="markdown-content max-w-3xl">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={markdownComponents}
                >
                  {body}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-xl font-semibold text-ink">
                  {isFil
                    ? 'Isinusulat pa ang pahinang ito'
                    : 'This page is still being written'}
                </p>
                <p className="mt-2 text-gray-600">
                  {isFil
                    ? 'Wala pang nilalaman dito. Para sa tulong, makipag-ugnayan sa Munisipyo.'
                    : 'There is no content here yet. For help in the meantime, contact the Municipal Hall.'}
                </p>
                <Link
                  to="/contact"
                  className="mt-5 inline-flex min-h-12 items-center rounded-full bg-primary-800 px-7 text-sm font-semibold text-white hover:bg-primary-700"
                >
                  {isFil ? 'Makipag-ugnayan' : 'Contact us'}
                </Link>
              </div>
            )}
          </article>
        </div>

        {parent && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
            <Link
              to={parent.href}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line bg-white px-6 text-sm font-semibold text-gray-900 hover:bg-primary-50"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              {isFil ? 'Bumalik sa' : 'Back to'} {parent.label}
            </Link>
          </div>
        )}
      </main>
    </>
  );
}
