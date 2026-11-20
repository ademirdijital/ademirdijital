import adapter from '@sveltejs/adapter-static';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		enhancedImages(),
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			// Every page is prerendered. `404.html` is served by most static hosts for unknown URLs
			// and renders the localized error page on the client.
			adapter: adapter({ fallback: '404.html', precompress: false }),
			// The whole stylesheet is small (~40 KB), so it is inlined into each page:
			// no render-blocking CSS requests on first paint.
			inlineStyleThreshold: 50_000,
			prerender: {
				entries: ['*']
			}
		})
	]
});
