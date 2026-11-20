/**
 * Locale-aware routing. Turkish is the default language and lives at the site root,
 * English lives under `/en/`. Every page has a localized slug, so the language switcher
 * and hreflang links are derived from this single map.
 */

export const locales = ['tr', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'tr';

export const serviceIds = [
	'video-production',
	'video-editing',
	'drone',
	'social-media',
	'meta-ads'
] as const;
export type ServiceId = (typeof serviceIds)[number];

type Localized = Record<Locale, string>;

const pagePaths = {
	home: { tr: '/', en: '/en/' },
	services: { tr: '/hizmetler/', en: '/en/services/' },
	process: { tr: '/surec/', en: '/en/process/' },
	about: { tr: '/hakkimizda/', en: '/en/about/' },
	contact: { tr: '/iletisim/', en: '/en/contact/' }
} as const satisfies Record<string, Localized>;

export type PageKey = keyof typeof pagePaths;

export const serviceSlugs = {
	'video-production': { tr: 'video-cekimi', en: 'video-production' },
	'video-editing': { tr: 'video-kurgu', en: 'video-editing' },
	drone: { tr: 'drone-cekimi', en: 'drone-filming' },
	'social-media': { tr: 'sosyal-medya-yonetimi', en: 'social-media-management' },
	'meta-ads': { tr: 'meta-reklam-yonetimi', en: 'meta-ads-management' }
} as const satisfies Record<ServiceId, Localized>;

export function pagePath(key: PageKey, locale: Locale): string {
	return pagePaths[key][locale];
}

export function servicePath(id: ServiceId, locale: Locale): string {
	return `${pagePaths.services[locale]}${serviceSlugs[id][locale]}/`;
}

export function serviceIdFromSlug(slug: string, locale: Locale): ServiceId | undefined {
	return serviceIds.find((id) => serviceSlugs[id][locale] === slug);
}

export function localeFromPath(pathname: string): Locale {
	return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'tr';
}

/** Every localized page of the site, used for hreflang links and the sitemap. */
export const allPages: Localized[] = [
	...Object.values(pagePaths),
	...serviceIds.map((id) => ({ tr: servicePath(id, 'tr'), en: servicePath(id, 'en') }))
];

/** Returns the same page in every locale, or `undefined` for unknown paths (e.g. 404). */
export function alternatesFor(pathname: string): Localized | undefined {
	const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
	return allPages.find((page) => page.tr === normalized || page.en === normalized);
}

export const localeNames: Record<Locale, string> = { tr: 'Türkçe', en: 'English' };
export const ogLocales: Record<Locale, string> = { tr: 'tr_TR', en: 'en_US' };
