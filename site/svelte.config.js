import preprocess from 'svelte-preprocess';
import adapt from '@sveltejs/adapter-static';
import { optimizeImports, optimizeCss } from 'carbon-preprocess-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [optimizeImports(), preprocess({ postcss: true })],

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: adapt(),
		paths: {
			base: '/svg2png-wasm'
		},
		vite: {
			plugins: [process.env.NODE_ENV === 'production' && optimizeCss()]
		}
	}
};

export default config;
