import { browser } from '$app/env';
import { createSvg2png } from '$lib/svg2png';
import { writable } from 'svelte/store';

export const svg2png = (() => {
	const { subscribe } = writable(browser ? createSvg2png() : undefined);
	return { subscribe };
})();
