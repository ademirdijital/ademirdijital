<script lang="ts">
	import Icon, { type IconName } from '#lib/components/Icon.svelte';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { useI18n } from '#lib/i18n/context.ts';
	import { contact, mailHref, whatsappHref } from '#lib/site.ts';

	const i18n = useI18n();
	const t = $derived(i18n.t);
	const page = $derived(i18n.t.contactPage);

	interface Channel {
		icon: IconName;
		label: string;
		value: string;
		action: string;
		href: string;
		external?: boolean;
	}

	const channels = $derived<Channel[]>([
		{
			icon: 'phone',
			label: t.contact.phone,
			value: contact.phoneDisplay,
			action: page.channels.phoneAction,
			href: contact.phoneHref
		},
		{
			icon: 'whatsapp',
			label: t.contact.whatsapp,
			value: page.channels.whatsappValue,
			action: page.channels.whatsappAction,
			href: whatsappHref(t.contact.whatsappMessage),
			external: true
		},
		{
			icon: 'mail',
			label: t.contact.email,
			value: contact.email,
			action: page.channels.emailAction,
			href: mailHref(t.contact.emailSubject)
		},
		{
			icon: 'instagram',
			label: t.contact.instagram,
			value: contact.instagramHandle,
			action: page.channels.instagramAction,
			href: contact.instagramUrl,
			external: true
		}
	]);
</script>

<Seo seo={page.seo} />

<PageHeader title={page.title} lede={page.lede} />

<section class="pb-20 md:pb-28">
	<div class="container-site grid gap-16 lg:grid-cols-12 lg:gap-16">
		<div class="lg:col-span-7">
			<ul class="grid gap-px border border-line bg-line sm:grid-cols-2">
				{#each channels as channel (channel.icon)}
					<li class="bg-pine-900">
						<a
							href={channel.href}
							class="channel group"
							target={channel.external ? '_blank' : undefined}
							rel={channel.external ? 'noopener noreferrer' : undefined}
						>
							<span class="channel-icon">
								<Icon name={channel.icon} size={22} />
							</span>
							<span class="mt-8 block text-sm text-chrome-400">{channel.label}</span>
							<span class="display-sm mt-1 block text-chrome-50 [overflow-wrap:anywhere]">
								{#if channel.value.includes('@') && !channel.value.startsWith('@')}
									<!-- Long e-mail addresses wrap after "@" instead of mid-word. -->
									{channel.value.split('@')[0]}@<wbr>{channel.value.split('@')[1]}
								{:else}
									{channel.value}
								{/if}
							</span>
							<span
								class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-chrome-200"
							>
								{channel.action}
								<Icon
									name={channel.external ? 'arrow-up-right' : 'arrow-right'}
									size={16}
									class="transition-transform duration-300 group-hover:translate-x-1"
								/>
							</span>
						</a>
					</li>
				{/each}
			</ul>

			<div class="mt-16">
				<h2 class="display-md text-chrome-100">{page.brief.title}</h2>
				<p class="mt-4 max-w-[56ch] text-chrome-300">{page.brief.intro}</p>
				<ul class="mt-8 border-t border-line">
					{#each page.brief.items as item (item)}
						<li class="flex items-baseline gap-4 border-b border-line py-4 text-chrome-100">
							<span class="bullet"></span>
							{item}
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="lg:col-span-5">
			<div class="lg:sticky lg:top-28">
				<h2 class="display-md text-chrome-100">{page.location.title}</h2>
				<p class="mt-3 flex items-center gap-2 text-chrome-300">
					<Icon name="pin" size={18} />
					{page.location.text}
				</p>
				<div class="map mt-6">
					<iframe
						title={page.location.mapTitle}
						src={contact.mapsEmbedUrl}
						loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"
					></iframe>
				</div>
				<a
					href={contact.mapsUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="link-arrow mt-5 text-chrome-100"
				>
					{page.location.directions}
					<Icon name="arrow-up-right" size={18} />
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	.channel {
		display: flex;
		flex-direction: column;
		height: 100%;
		padding: 1.75rem;
		transition: background-color 250ms ease;
	}

	.channel:hover {
		background-color: var(--color-pine-850);
	}

	.channel-icon {
		display: grid;
		place-items: center;
		width: 3rem;
		height: 3rem;
		border-radius: 4px;
		color: var(--color-pine-900);
		background-image: linear-gradient(180deg, #f8faf9 0%, #d3d9d6 50%, #bcc4c0 60%, #eef1ef 100%);
		box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.9);
	}

	.map {
		position: relative;
		aspect-ratio: 4 / 3;
		overflow: hidden;
		border: 1px solid var(--color-line);
		background-color: var(--color-pine-850);
	}

	.map iframe {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		border: 0;
		/* Tones the default map down so it sits in the dark green palette. */
		filter: grayscale(0.35) contrast(0.95) brightness(0.92);
	}
</style>
