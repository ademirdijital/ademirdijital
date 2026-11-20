<script lang="ts">
	import mark from '#lib/assets/brand/mark.png?w=160;96&enhanced';

	interface Props {
		size?: 'sm' | 'md';
	}

	let { size = 'md' }: Props = $props();
</script>

<span class="logo" data-size={size}>
	<enhanced:img src={mark} alt="" sizes="48px" class="mark" />
	<span class="wordmark">Ademir Dijital</span>
</span>

<style>
	.logo {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
	}

	.logo :global(.mark) {
		width: 2.5rem;
		height: auto;
		filter: drop-shadow(0 2px 6px rgb(0 0 0 / 0.35));
	}

	.logo[data-size='sm'] :global(.mark) {
		width: 2rem;
	}

	.wordmark {
		font-size: 1.0625rem;
		font-weight: 650;
		font-stretch: 125%;
		letter-spacing: 0.01em;
		line-height: 1;
		color: var(--color-chrome-50);
		white-space: nowrap;
	}
</style>
