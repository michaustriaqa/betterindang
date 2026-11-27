/**
 * Typography theme configuration for markdown content
 */

export interface TypographyTheme {
  name: string;
  components: {
    h1?: string;
    h2?: string;
    h3?: string;
    h4?: string;
    h5?: string;
    h6?: string;
    p?: string;
    small?: string;
    ul?: string;
    ol?: string;
    li?: string;
    'li.ordered'?: string; // Special styling for ordered list items
    blockquote?: string;
    code?: string;
    pre?: string;
    a?: string;
    strong?: string;
    em?: string;
    hr?: string;
    table?: string;
    thead?: string;
    tbody?: string;
    tr?: string;
    th?: string;
    td?: string;
  };
}

// Default theme: Civic Clear (navy ink, gold accents, soft rounded shapes)
export const defaultTheme: TypographyTheme = {
  name: 'default',
  components: {
    h1: 'text-3xl sm:text-4xl font-bold tracking-tight text-ink mb-6 mt-2',
    h2: 'scroll-mt-44 text-2xl sm:text-[1.7rem] font-bold tracking-tight text-ink mb-4 mt-2',
    h3: 'text-xl font-semibold text-ink mb-3 mt-8',
    h4: 'text-lg font-semibold text-gray-900 mb-2 mt-6',
    h5: 'text-base font-semibold text-gray-900 mb-2 mt-5',
    h6: 'text-base font-semibold text-gray-800 mb-2 mt-4',
    p: 'text-[1.0625rem] text-gray-700 mb-5 leading-8',
    small: 'text-sm text-gray-600 mb-3',
    ul: 'list-none mb-6 space-y-2.5 pl-0',
    ol: 'list-none mb-6 space-y-2.5 pl-0',
    li: 'text-[1.0625rem] text-gray-700 leading-8 relative pl-7 before:content-[""] before:absolute before:left-1.5 before:top-3.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-sun',
    'li.ordered':
      'text-[1.0625rem] text-gray-700 leading-8 relative pl-9 before:content-[counter(list-item)] before:absolute before:left-0 before:top-1 before:flex before:h-7 before:w-7 before:items-center before:justify-center before:rounded-full before:bg-primary-50 before:text-sm before:font-semibold before:text-primary-800',
    blockquote:
      'rounded-2xl bg-warning-50 px-6 py-4 mb-6 text-gray-800 text-base leading-7 [&>p]:mb-0 [&>p]:text-base [&>p]:leading-7',
    code: 'bg-primary-50 text-primary-900 px-1.5 py-0.5 rounded-md text-sm font-mono',
    pre: 'bg-ink text-blue-50 p-5 rounded-2xl overflow-x-auto mb-6 font-mono text-sm leading-relaxed',
    a: 'text-primary-700 hover:text-primary-900 underline underline-offset-4 decoration-primary-300 font-medium transition-colors',
    strong: 'font-semibold text-gray-900',
    em: 'italic text-gray-700',
    hr: 'border-t border-line my-10',
    table: 'w-full border-collapse overflow-hidden min-w-max text-left',
    thead: 'bg-primary-50',
    tbody: '',
    tr: 'border-b border-line last:border-0',
    th: 'text-left py-3.5 px-5 font-semibold text-ink border-r border-line last:border-r-0 text-base',
    td: 'py-3.5 px-5 text-gray-700 border-r border-line last:border-r-0 text-base',
  },
};

// Available themes
export const typographyThemes: Record<string, TypographyTheme> = {
  default: defaultTheme,
};

/**
 * Get a typography theme by name
 */
export function getTypographyTheme(
  themeName: string = 'default'
): TypographyTheme {
  return typographyThemes[themeName] || defaultTheme;
}
