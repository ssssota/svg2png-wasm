// @ts-check
import { buildSync } from "esbuild";

/** @type {import('esbuild').BuildOptions} */
const commonOptions = {
	bundle: true,
	logLevel: "error",
	entryPoints: ["lib/index.ts"],
	define: { "import.meta.url": "undefined" },
};

buildSync({
	...commonOptions,
	format: "cjs",
	outfile: "dist/index.cjs",
});
buildSync({
	...commonOptions,
	format: "esm",
	outfile: "dist/index.mjs",
});
buildSync({
	...commonOptions,
	format: "iife",
	minify: true,
	globalName: "svg2pngWasm",
	outfile: "dist/index.min.js",
});
