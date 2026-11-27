import { type ReactNode } from 'react';

/** Flattens rendered markdown heading children to plain text. */
export function plainText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(plainText).join('');
  if (node && typeof node === 'object' && 'props' in node) {
    return plainText(
      (node as { props?: { children?: ReactNode } }).props?.children
    );
  }
  return '';
}

/** Stable anchor id for a heading, shared by the headings and the TOC. */
export function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}

/** Strips inline markdown (bold, italic, code, links) from heading source. */
export function stripInlineMarkdown(source: string): string {
  return source
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .trim();
}
