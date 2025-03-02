import fs from "node:fs";
import frontMatter from "front-matter";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	const files = fs
		.readdirSync("../docs", { withFileTypes: true })
		.filter((dirent) => dirent.isFile())
		.map((dirent) => {
			const content = fs.readFileSync(`../docs/${dirent.name}`, "utf-8");
			const { attributes, body } = frontMatter<Record<string, string>>(content);
			return {
				meta: attributes,
				slug: dirent.name.replace(/\.md$/, ""),
				body,
			};
		});
	return { sections: files };
};
