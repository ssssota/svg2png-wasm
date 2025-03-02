import type { RequestHandler } from "./$types";
import wasm from "svg2png-wasm/svg2png_wasm_bg.wasm?u8";

export const GET: RequestHandler = async () => {
	return new Response(wasm, {
		headers: { "Content-Type": "application/wasm" },
	});
};

export const prerender = true;
