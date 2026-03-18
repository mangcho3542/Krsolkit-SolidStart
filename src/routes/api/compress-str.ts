import { compress } from "@lib/compress";
import { status } from "@lib/status";
import { APIEvent } from "@solidjs/start/server";
import { z } from "zod";

const BodyT = z.object({
	data: z.string(),
});

async function handler(event: APIEvent) {
	try {
		const raw = await event.request.json();
		const body = await BodyT.safeDecodeAsync(raw);
		if (!body.success) return status(400);

		const compressed = compress(body.data.data);
		return status(200, { data: compressed });
	} catch (err) {
        console.error("compressStr에서 오류님.\n", err);
        return status(500);
    }
}

export const POST = handler;
