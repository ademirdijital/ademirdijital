import type { ServiceId } from '#lib/i18n/index.ts';

export interface Seo {
	title: string;
	description: string;
}

export interface Item {
	title: string;
	text: string;
}

export interface ServiceContent {
	/** Full service name, used as the page heading. */
	title: string;
	/** One line used in lists and menus. */
	short: string;
	/** Lead paragraph on the detail page. */
	summary: string;
	intro: string[];
	scope: Item[];
	audience: string[];
	steps: Item[];
	seo: Seo;
}

export interface ProcessStep extends Item {
	output: string;
}

export interface Content {
	meta: {
		tagline: string;
		description: string;
	};
	nav: {
		home: string;
		services: string;
		process: string;
		about: string;
		contact: string;
		cta: string;
		openMenu: string;
		closeMenu: string;
		skipToContent: string;
		breadcrumb: string;
		mainNav: string;
		switchLanguage: string;
		allServices: string;
	};
	contact: {
		phone: string;
		whatsapp: string;
		email: string;
		instagram: string;
		address: string;
		whatsappMessage: string;
		emailSubject: string;
	};
	cta: {
		title: string;
		text: string;
		call: string;
		whatsapp: string;
		orReach: string;
	};
	footer: {
		about: string;
		services: string;
		company: string;
		contact: string;
		rights: string;
		photoCredit: string;
	};
	home: {
		seo: Seo;
		hero: {
			title: string;
			lede: string;
			primary: string;
			secondary: string;
			imageAlt: string;
		};
		services: {
			title: string;
			intro: string;
			linkLabel: string;
		};
		meta: {
			title: string;
			text: string;
			points: string[];
			link: string;
			imageAlt: string;
		};
		process: {
			title: string;
			intro: string;
			link: string;
			steps: Item[];
		};
		principles: {
			title: string;
			items: Item[];
		};
	};
	servicesPage: {
		seo: Seo;
		title: string;
		lede: string;
		details: string;
		together: Item;
	};
	serviceDetail: {
		overview: string;
		scope: string;
		audience: string;
		steps: string;
		others: string;
	};
	services: Record<ServiceId, ServiceContent>;
	about: {
		seo: Seo;
		title: string;
		lede: string;
		story: {
			title: string;
			paragraphs: string[];
			imageAlt: string;
		};
		mission: Item;
		vision: Item;
		values: {
			title: string;
			items: Item[];
		};
		location: {
			title: string;
			text: string;
			imageAlt: string;
		};
	};
	process: {
		seo: Seo;
		title: string;
		lede: string;
		outputLabel: string;
		imageAlt: string;
		steps: ProcessStep[];
		expectations: {
			title: string;
			intro: string;
			items: string[];
		};
	};
	contactPage: {
		seo: Seo;
		title: string;
		lede: string;
		channels: {
			phoneAction: string;
			whatsappValue: string;
			whatsappAction: string;
			emailAction: string;
			instagramAction: string;
		};
		location: {
			title: string;
			text: string;
			directions: string;
			mapTitle: string;
		};
		brief: {
			title: string;
			intro: string;
			items: string[];
		};
	};
	error: {
		notFoundTitle: string;
		notFoundText: string;
		genericTitle: string;
		genericText: string;
		back: string;
	};
}
