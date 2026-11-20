import { error } from '@sveltejs/kit';
import { type Locale, serviceIdFromSlug, serviceIds, serviceSlugs } from '#lib/i18n/index.ts';

/** Prerender entries for the service detail pages of one locale. */
export function serviceEntries(locale: Locale) {
	return serviceIds.map((id) => ({ slug: serviceSlugs[id][locale] }));
}

export function loadService(slug: string, locale: Locale) {
	const serviceId = serviceIdFromSlug(slug, locale);
	if (!serviceId) error(404, 'Not found');
	return { serviceId };
}
