import { en } from '#lib/content/en.ts';
import { tr } from '#lib/content/tr.ts';
import type { Content } from '#lib/content/types.ts';
import { page } from '$app/state';
import { type Locale, type PageKey, pagePath, type ServiceId, servicePath } from './index.ts';

const dictionaries: Record<Locale, Content> = { tr, en };

/**
 * Reactive access to the current locale, its copy and localized links.
 * Values are read lazily from `page`, so client-side language switches update in place.
 */
export function useI18n() {
	return {
		get locale(): Locale {
			return page.data.locale ?? 'tr';
		},
		get t(): Content {
			return dictionaries[this.locale];
		},
		path(key: PageKey): string {
			return pagePath(key, this.locale);
		},
		servicePath(id: ServiceId): string {
			return servicePath(id, this.locale);
		}
	};
}
