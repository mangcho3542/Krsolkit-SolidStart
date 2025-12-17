import { status } from "@lib";
import { APIEvent, APIHandler } from "@solidjs/start/server";
import { checkType } from "@utils";
import { z } from "zod";

const BodyT = z.object({
	email: z.email(),
});

async function handler({ request: req }: APIEvent) {
	try {
		const body = await req.json();
		if (!checkType(body, BodyT)) return status(400);

		return await fetch(process.env.SERVER_URL!, {
			headers: {
				Authorization: `Bearer ${process.env.SERVER_AUTH_KEY!}`,
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body: req.body
		});
	} catch (err) {
		console.error("verifyEmail api에서 오류남.\n", err);
		return status(500);
	}
}

export const POST: APIHandler = handler;
