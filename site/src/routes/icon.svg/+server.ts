import type { RequestHandler } from "./$types";
import fs from "node:fs";

const svgPromise = fs.readFileSync("../logo.svg", "utf8");

export const GET: RequestHandler = async () => {
	return new Response(svgPromise, {
		headers: { "Content-Type": "image/svg+xml" },
	});
};

export const prerender = true;
