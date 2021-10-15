import type { RequestHandler } from '@sveltejs/kit';
import fm from 'front-matter';
import { readFileSync } from 'fs';

export type Section = {
	body: string;
	metadata: {
		slug: string;
		title: string;
	};
};

export const get: RequestHandler = ({ params }) => {
	const { section } = params;
	const raw = readFileSync(`../docs/${section}.md`, 'utf8');
	const parsed = fm<{ title: string }>(raw);
	const response: Section = {
		body: parsed.body,
		metadata: {
			slug: section,
			...parsed.attributes
		}
	};
	return {
		body: response,
		headers: { 'content-type': 'application/json' }
	};
};
