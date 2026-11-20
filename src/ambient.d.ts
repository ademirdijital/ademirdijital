// Image imports with explicit widths, e.g. `photo.jpg?w=1600;800&enhanced`.
declare module '*&enhanced' {
	import type { Picture } from 'vite-imagetools';

	const value: Picture;
	export default value;
}
