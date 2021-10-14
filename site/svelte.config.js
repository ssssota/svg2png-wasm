// @ts-check
import preprocess from 'svelte-preprocess';
import adapt from '@sveltejs/adapter-static';
import { optimizeImports, optimizeCss } from 'carbon-preprocess-svelte';

const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess({ postcss: true }), optimizeImports()],

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: adapt(),
		paths: {
			base: dev ? undefined : '/svg2png-wasm'
		},
		vite: {
			plugins: [
				!dev &&
					optimizeCss({
						safelist: {
							deep: [/token$/]
						}
					})
			]
		}
	}
};

export default config;
