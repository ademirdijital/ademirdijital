import { allPages, locales } from '#lib/i18n/index.ts';
import { SITE_URL } from '#lib/site.ts';
import type { RequestHandler } from './$types';

export const prerender = true;
export const trailingSlash = 'never';

export const GET: RequestHandler = () => {
	const urls = allPages.flatMap((page) =>
		locales.map((locale) => {
			const links = locales
				.map(
					(alt) => `<xhtml:link rel="alternate" hreflang="${alt}" href="${SITE_URL}${page[alt]}"/>`
				)
				.join('');
			return `<url><loc>${SITE_URL}${page[locale]}</loc>${links}<xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${page.tr}"/></url>`;
		})
	);

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`;

	return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
