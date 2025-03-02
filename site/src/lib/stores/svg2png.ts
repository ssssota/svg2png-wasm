import { browser } from "$app/environment";
import { base } from "$app/paths";
import { createSvg2png } from "$lib/svg2png";
import { writable } from "svelte/store";
import type { ConverterOptions } from "svg2png-wasm";

export const svg2png = (() => {
	const { subscribe, set } = writable<ReturnType<typeof createSvg2png>>();

	if (browser) {
		fetch(`${base}/Roboto-Regular.ttf`)
			.then((res) => res.arrayBuffer())
			.then((buf) => {
				const options = {
					fonts: [new Uint8Array(buf)],
					defaultFontFamily: {
						serifFamily: "Roboto",
						sansSerifFamily: "Roboto",
						monospaceFamily: "Roboto",
						fantasyFamily: "Roboto",
						cursiveFamily: "Roboto",
					},
				} satisfies ConverterOptions;
				const svg2png = createSvg2png(options);
				set(svg2png);
			});
	}
	return { subscribe };
})();
