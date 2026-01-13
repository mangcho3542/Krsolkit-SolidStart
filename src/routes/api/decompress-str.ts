import { decompress, status } from "@lib";
import { APIEvent } from "@solidjs/start/server";
import { z } from "zod";

const BodyT = z.object({
	data: z.string(),
});

export async function handler(event: APIEvent) {
	try {
		const raw = await event.request.json();
		const body = await BodyT.safeDecodeAsync(raw);
		if (!body.success) return status(400);

		const data = decompress(body.data.data);
		return status(200, { data });
	} catch (err) {
		console.error("compressStr에서 오류님.\n", err);
		return status(500);
	}
}

export const POST = handler;
