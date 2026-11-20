<script lang="ts">
	import { reveal } from '#lib/actions/reveal.ts';
	import type { Picture } from '#lib/images.ts';

	type Ratio = 'cinema' | 'wide' | 'photo' | 'portrait' | 'square';

	interface Props {
		src: Picture;
		alt: string;
		ratio?: Ratio;
		/** CSS object-position for the crop. */
		position?: string;
		/** `sizes` attribute for the responsive image. */
		sizes?: string;
		/** Above-the-fold image: loads eagerly and plays the opening sequence instead of the scroll reveal. */
		priority?: boolean;
		/** Loads eagerly with high fetch priority (likely LCP on small screens) but keeps the scroll reveal. */
		eager?: boolean;
		/** Viewfinder corner marks. */
		corners?: boolean;
		class?: string;
	}

	let {
		src,
		alt,
		ratio = 'photo',
		position = '50% 50%',
		sizes = '(min-width: 1280px) 1200px, 100vw',
		priority = false,
		eager = false,
		corners = true,
		class: className = ''
	}: Props = $props();

	const loadEagerly = $derived(priority || eager);
</script>

<figure class="frame {className}" class:frame-intro={priority} data-ratio={ratio}>
	<div class="frame-media" {@attach priority ? undefined : reveal}>
		<enhanced:img
			{src}
			{alt}
			{sizes}
			loading={loadEagerly ? 'eager' : 'lazy'}
			fetchpriority={loadEagerly ? 'high' : 'auto'}
			style:object-position={position}
		/>
	</div>
	{#if corners}
		<span class="corner tl" aria-hidden="true"></span>
		<span class="corner tr" aria-hidden="true"></span>
		<span class="corner bl" aria-hidden="true"></span>
		<span class="corner br" aria-hidden="true"></span>
	{/if}
</figure>

<style>
	.frame {
		position: relative;
		margin: 0;
		isolation: isolate;
	}

	.frame-media {
		position: relative;
		overflow: hidden;
		background-color: var(--color-pine-850);
		aspect-ratio: var(--frame-ratio);
	}

	.frame[data-ratio='cinema'] {
		--frame-ratio: 2.39 / 1;
	}
	.frame[data-ratio='wide'] {
		--frame-ratio: 16 / 9;
	}
	.frame[data-ratio='photo'] {
		--frame-ratio: 3 / 2;
	}
	.frame[data-ratio='portrait'] {
		--frame-ratio: 4 / 5;
	}
	.frame[data-ratio='square'] {
		--frame-ratio: 1 / 1;
	}

	/* On small screens a 2.39:1 strip gets too thin; fall back to 16:10. */
	@media (width < 48rem) {
		.frame[data-ratio='cinema'] {
			--frame-ratio: 16 / 10;
		}
	}

	/* The picture fills the frame absolutely, so the frame's aspect ratio decides the crop
	   instead of the photo's own proportions. */
	.frame-media :global(picture) {
		position: absolute;
		inset: 0;
		display: block;
	}

	.frame-media :global(img) {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.frame-media::after {
		content: '';
		position: absolute;
		inset: 0;
		pointer-events: none;
		box-shadow: inset 0 0 0 1px rgb(230 234 232 / 0.08);
		background: linear-gradient(180deg, transparent 60%, rgb(6 21 16 / 0.35));
	}

	/* Viewfinder corner marks sit just outside the image. */
	.corner {
		--size: clamp(14px, 1.6vw, 22px);
		--gap: -10px;
		position: absolute;
		width: var(--size);
		height: var(--size);
		border-color: var(--color-chrome-300);
		border-style: solid;
		border-width: 0;
		pointer-events: none;
	}

	.tl {
		top: var(--gap);
		left: var(--gap);
		border-top-width: 1px;
		border-left-width: 1px;
	}
	.tr {
		top: var(--gap);
		right: var(--gap);
		border-top-width: 1px;
		border-right-width: 1px;
	}
	.bl {
		bottom: var(--gap);
		left: var(--gap);
		border-bottom-width: 1px;
		border-left-width: 1px;
	}
	.br {
		bottom: var(--gap);
		right: var(--gap);
		border-bottom-width: 1px;
		border-right-width: 1px;
	}

	/* Opening sequence for the hero frame: the letterbox opens, then the marks settle in. */
	.frame-intro .frame-media {
		animation: letterbox-open 1300ms var(--ease-film) 120ms both;
	}

	.frame-intro .frame-media :global(img) {
		animation: settle 2200ms var(--ease-out-soft) 120ms both;
	}

	.frame-intro .corner {
		animation: corner-in 700ms var(--ease-out-soft) 1000ms both;
	}

	:global(.on-paper) .corner {
		border-color: var(--color-pine-600);
	}

	/* Starts as a wide letterbox strip (not a hairline) so the photo is visible from the first frame. */
	@keyframes letterbox-open {
		from {
			clip-path: inset(36% 0 36% 0);
		}
		to {
			clip-path: inset(0 0 0 0);
		}
	}

	@keyframes settle {
		from {
			transform: scale(1.12);
		}
		to {
			transform: scale(1);
		}
	}

	@keyframes corner-in {
		from {
			opacity: 0;
			translate: 0 0;
			scale: 1.6;
		}
		to {
			opacity: 1;
			scale: 1;
		}
	}
</style>
