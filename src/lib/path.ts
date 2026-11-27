/** Prefix a site path with the GitHub Pages base (`/Works/`). */
export function href(path = '/'): string {
  const base = import.meta.env.BASE_URL;
  if (!path || path === '/') return base;
  return base + (path.startsWith('/') ? path.slice(1) : path);
}

/** Absolute URL on the configured site, including the project base. */
export function absolute(path = '/'): string {
  const site = import.meta.env.SITE || 'https://bayexie.github.io';
  return new URL(href(path), site).href;
}
