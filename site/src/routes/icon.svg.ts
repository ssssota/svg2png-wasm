import type { RequestHandler } from '@sveltejs/kit';
import { readFileSync } from 'fs';
import { resolve } from 'path';

export const iconSvg = readFileSync(resolve('..', 'logo.svg'), 'utf8');

export const get: RequestHandler = () => {
	return {
		body: iconSvg,
		headers: {
			'content-type': 'image/svg+xml'
		}
	};
};
