/**
 * Company-wide constants. Update `SITE_URL` once the production domain is final:
 * it is used for canonical URLs, hreflang links, Open Graph tags and the sitemap.
 */
export const SITE_URL = 'https://ademirdijital.com';

export const SITE_NAME = 'Ademir Dijital';

const phoneE164 = '+905387030561';

export const contact = {
	phoneDisplay: '0538 703 05 61',
	phoneHref: `tel:${phoneE164}`,
	phoneE164,
	email: 'hursitademdemir@gmail.com',
	instagramUrl: 'https://www.instagram.com/ademirdijital',
	instagramHandle: '@ademirdijital',
	district: 'Atakum',
	city: 'Samsun',
	mapsUrl:
		'https://www.google.com/maps/search/?api=1&query=Atakum%2C%20Atakum%2FSamsun%2C%20T%C3%BCrkiye',
	mapsEmbedUrl: 'https://www.google.com/maps?q=Atakum&near=Samsun&z=12&output=embed'
} as const;

export function whatsappHref(message: string): string {
	return `https://wa.me/${phoneE164.slice(1)}?text=${encodeURIComponent(message)}`;
}

export function mailHref(subject: string): string {
	return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}`;
}
