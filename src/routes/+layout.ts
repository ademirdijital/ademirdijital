import { localeFromPath } from '#lib/i18n/index.ts';
import type { LayoutLoad } from './$types';

export const prerender = true;
// `/hizmetler/` is written as `hizmetler/index.html`, which works on any static host.
export const trailingSlash = 'always';

export const load: LayoutLoad = ({ url }) => ({
	locale: localeFromPath(url.pathname)
});
