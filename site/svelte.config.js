import preprocess from 'svelte-preprocess';
import adapt from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: adapt(),
		paths: {
			base: '/svg2png-wasm'
		}
	}
};

export default config;
