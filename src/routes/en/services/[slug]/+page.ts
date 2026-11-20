import { loadService, serviceEntries } from '#lib/service-route.ts';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => serviceEntries('en');

export const load: PageLoad = ({ params }) => loadService(params.slug, 'en');
