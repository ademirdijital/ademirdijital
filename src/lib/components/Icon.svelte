<script lang="ts" module>
	export type IconName =
		| 'phone'
		| 'whatsapp'
		| 'mail'
		| 'instagram'
		| 'pin'
		| 'arrow-right'
		| 'arrow-up-right'
		| 'menu'
		| 'close'
		| 'chevron-down';
</script>

<script lang="ts">
	interface Props {
		name: IconName;
		size?: number;
		class?: string;
	}

	let { name, size = 20, class: className = '' }: Props = $props();
</script>

<svg
	class={className}
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="1.6"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
	focusable="false"
>
	{#if name === 'phone'}
		<path
			d="M5 4h3.2l1.6 4-2 1.3a10.5 10.5 0 0 0 4.9 4.9l1.3-2 4 1.6V17a2 2 0 0 1-2 2A14 14 0 0 1 3 6a2 2 0 0 1 2-2Z"
		/>
	{:else if name === 'whatsapp'}
		<path d="M4.5 19.5 5.6 16A8 8 0 1 1 8.4 18.6Z" />
		<path
			d="M9.2 8.6c.2-.4.5-.5.8-.5h.5c.2 0 .4.1.5.4l.6 1.4c.1.2 0 .5-.1.6l-.5.6c.6 1.1 1.4 1.9 2.5 2.5l.6-.5c.2-.1.4-.2.6-.1l1.4.6c.3.1.4.3.4.5v.5c0 .3-.1.6-.5.8-.6.4-1.5.6-2.4.2a9 9 0 0 1-4.6-4.6c-.4-.9-.2-1.8.2-2.4Z"
			fill="currentColor"
			stroke="none"
		/>
	{:else if name === 'mail'}
		<rect x="3" y="5" width="18" height="14" rx="1.5" />
		<path d="m3.5 6 8.5 7 8.5-7" />
	{:else if name === 'instagram'}
		<rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
		<circle cx="12" cy="12" r="4" />
		<circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
	{:else if name === 'pin'}
		<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
		<circle cx="12" cy="10" r="2.4" />
	{:else if name === 'arrow-right'}
		<path d="M4 12h15" />
		<path d="m13 6 6 6-6 6" />
	{:else if name === 'arrow-up-right'}
		<path d="M7 17 17 7" />
		<path d="M8 7h9v9" />
	{:else if name === 'menu'}
		<path d="M4 8h16" />
		<path d="M4 16h16" />
	{:else if name === 'close'}
		<path d="m6 6 12 12" />
		<path d="M18 6 6 18" />
	{:else if name === 'chevron-down'}
		<path d="m6 9 6 6 6-6" />
	{/if}
</svg>
