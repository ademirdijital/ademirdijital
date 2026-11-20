import type { Attachment } from 'svelte/attachments';

/**
 * Opens an element like a widening letterbox once it scrolls into view.
 * Runs only in the browser and is skipped entirely when the user prefers reduced motion,
 * so server-rendered content is always visible without JavaScript.
 */
export const reveal: Attachment<HTMLElement> = (node) => {
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	const rect = node.getBoundingClientRect();
	// Elements already on screen at hydration are left alone to avoid a visible flash.
	if (rect.top < window.innerHeight * 0.9) return;

	node.classList.add('reveal');
	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.add('is-visible');
					observer.disconnect();
				}
			}
		},
		{ rootMargin: '0px 0px -12% 0px', threshold: 0.05 }
	);
	observer.observe(node);

	return () => observer.disconnect();
};
