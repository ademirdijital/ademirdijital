<script lang="ts">
	import type { Item } from '#lib/content/types.ts';

	interface Props {
		steps: Item[];
		/** Heading level for each step title, so the outline stays correct on every page. */
		headingLevel?: 'h3' | 'h4';
	}

	let { steps, headingLevel = 'h3' }: Props = $props();
</script>

<ol class="steps" style:--count={steps.length}>
	{#each steps as step, index (step.title)}
		<li class="step">
			<span class="step-node" aria-hidden="true"></span>
			<span class="step-number">{String(index + 1).padStart(2, '0')}</span>
			<svelte:element this={headingLevel} class="display-sm mt-5 text-chrome-50"
				>{step.title}</svelte:element
			>
			<p class="mt-2 text-[0.9375rem] leading-relaxed text-chrome-300">{step.text}</p>
		</li>
	{/each}
</ol>

<style>
	.steps {
		display: grid;
		gap: 2.5rem;
	}

	/* No column gap: each step pads its own right side so the top rules join into one line. */
	@media (width >= 48rem) {
		.steps {
			grid-template-columns: repeat(min(var(--count), 3), minmax(0, 1fr));
			column-gap: 0;
		}

		.step {
			padding-right: 2rem;
		}
	}

	@media (width >= 64rem) {
		.steps {
			grid-template-columns: repeat(var(--count), minmax(0, 1fr));
		}
	}

	.step {
		position: relative;
		padding-top: 1.75rem;
		border-top: 1px solid var(--color-line);
	}

	/* A small chrome diamond marks where each step sits on the line. */
	.step-node {
		position: absolute;
		top: -4px;
		left: 0;
		width: 7px;
		height: 7px;
		background: linear-gradient(135deg, #ffffff, var(--color-chrome-400));
		rotate: 45deg;
	}

	.step-number {
		display: block;
		font-size: 0.875rem;
		font-weight: 600;
		font-stretch: 112%;
		font-variant-numeric: tabular-nums;
		color: var(--color-chrome-400);
	}
</style>
