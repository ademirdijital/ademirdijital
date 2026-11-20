/**
 * Builds the self-hosted Archivo files used by the site.
 *
 * The upstream variable font ships every weight (100–900) and width (62–125%) for many scripts,
 * about 170 KB for Latin + Latin Extended. The site only uses weights 400–700, widths 100–125%
 * and the Turkish/English character set, so we instance and subset it down to a fraction.
 *
 * Run with `bun run fonts` after changing the character set or axis ranges.
 */
import { readFile, writeFile } from 'node:fs/promises';
import subsetFont from 'subset-font';

const source = 'node_modules/@fontsource-variable/archivo/files';
const target = 'src/lib/assets/fonts';

const range = (from: number, to: number) =>
	Array.from({ length: to - from + 1 }, (_, i) => String.fromCodePoint(from + i)).join('');

// Basic Latin, Latin-1 (covers Ç ç Ö ö Ü ü â î û) and common typographic punctuation.
const latinText = `${range(0x20, 0x7e)}${range(0xa0, 0xff)}‘’‚“”„–—…•‹›€™−`;
// Turkish letters outside Latin-1, plus the lira sign.
const latinExtText = 'ĞğİıŞş₺';

const variationAxes = {
	wght: { min: 400, max: 700 },
	wdth: { min: 100, max: 125 }
};

for (const [file, text, out] of [
	['archivo-latin-wdth-normal.woff2', latinText, 'archivo-latin.woff2'],
	['archivo-latin-ext-wdth-normal.woff2', latinExtText, 'archivo-latin-ext.woff2']
] as const) {
	const input = await readFile(`${source}/${file}`);
	const output = await subsetFont(input, text, { targetFormat: 'woff2', variationAxes });
	await writeFile(`${target}/${out}`, output);
	console.log(
		`${out}: ${(input.length / 1024).toFixed(1)} KB → ${(output.length / 1024).toFixed(1)} KB`
	);
}
