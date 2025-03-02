import { sveltekit } from "@sveltejs/kit/vite";
import fsp from "fs/promises";
import { defineConfig } from "vite";
import type { Plugin } from "vite";

const postfixRE = /[?#].*$/s;
function cleanUrl(url: string): string {
	return url.replace(postfixRE, "");
}
const u8RE = /(?:\?|&)u8(?:&|$)/;
const u8: Plugin = {
	name: "u8",
	async load(id) {
		// raw requests, read from disk
		if (u8RE.test(id)) {
			const file = cleanUrl(id);
			const buffer = await fsp.readFile(file);
			// raw query, read file and return as string
			return `\
const base64 = ${JSON.stringify(buffer.toString("base64"))};
const u8 = new Uint8Array(atob(base64).split('').map(c => c.charCodeAt(0)));
export default u8;`;
		}
	},
};

export default defineConfig({
	plugins: [u8, sveltekit()],
});
