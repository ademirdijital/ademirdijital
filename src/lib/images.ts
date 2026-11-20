import coast from '#lib/assets/images/coast.jpg?w=2400;1600;1100;700&enhanced';
import drone from '#lib/assets/images/drone.jpg?w=2400;1600;1100;700&enhanced';
import filmingCity from '#lib/assets/images/filming-city.jpg?w=2400;1600;1100;700&enhanced';
import gimbal from '#lib/assets/images/gimbal.jpg?w=2400;1600;1100;700&enhanced';
import cinematographer from '#lib/assets/images/hero-cinematographer.jpg?w=1800;1100;700&enhanced';
import metaAds from '#lib/assets/images/meta-ads.jpg?w=1500;1100;700&enhanced';
import socialMedia from '#lib/assets/images/social-media.jpg?w=2400;1600;1100;700&enhanced';
import videoEditing from '#lib/assets/images/video-editing.jpg?w=2400;1600;1100;700&enhanced';
import videoProduction from '#lib/assets/images/video-production.jpg?w=2400;1600;1100;700&enhanced';
import type { ServiceId } from '#lib/i18n/index.ts';

export type Picture = typeof coast;

/**
 * Stock photography from Pexels (free for commercial use, no attribution required).
 * Replace with the company's own footage stills over time; keep file names to avoid code changes.
 */
export const images = {
	coast,
	drone,
	filmingCity,
	gimbal,
	cinematographer,
	metaAds,
	socialMedia,
	videoEditing,
	videoProduction
} satisfies Record<string, Picture>;

export interface ServiceImage {
	src: Picture;
	/** CSS object-position, tuned per photo so the subject survives each crop. */
	position: string;
	alt: { tr: string; en: string };
}

export const serviceImages: Record<ServiceId, ServiceImage> = {
	'video-production': {
		src: videoProduction,
		position: '60% 40%',
		alt: {
			tr: 'Set üzerinde video kamerasının monitörüne bakan kameraman',
			en: 'A camera operator checking the monitor of a video camera on set'
		}
	},
	'video-editing': {
		src: videoEditing,
		position: '50% 60%',
		alt: {
			tr: 'Ekranda açık bir video kurgu programının zaman çizelgesi',
			en: 'A video editing timeline open on a monitor'
		}
	},
	drone: {
		src: drone,
		position: '45% 35%',
		alt: {
			tr: 'Ağaçların önünde havada duran kompakt bir drone',
			en: 'A compact drone hovering in front of trees'
		}
	},
	'social-media': {
		src: socialMedia,
		position: '50% 50%',
		alt: {
			tr: 'Gimbal üzerindeki akıllı telefonla dikey video çekimi',
			en: 'Filming vertical video with a smartphone on a gimbal'
		}
	},
	'meta-ads': {
		src: metaAds,
		position: '50% 35%',
		alt: {
			tr: 'Akıllı telefonda bir sosyal medya gönderisine bakan eller',
			en: 'Hands holding a smartphone showing a social media post'
		}
	}
};
