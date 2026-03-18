import { status } from "@lib/status";
import { APIEvent, APIHandler } from "@solidjs/start/server";
import { z } from "zod";

const BodyT = z.object({
	email: z.email(),
});

async function handler({ request: req }: APIEvent) {
	try {
		const body = await req.json();
		const typeFlag = await BodyT.safeDecodeAsync(body);
		if (!typeFlag.success) return status(400);

		const res = await fetch(`${process.env.SERVER_URL!}/auth/email`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${process.env.AUTHORIZATION_KEY!}`,
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body: JSON.stringify(body)
		});

		return status(res.status, {
			code: await res.text(),
			success: true
		});
	} catch (err) {
		console.error("verifyEmail api에서 오류남.\n", err);
		return status(500);
	}
}

export const POST: APIHandler = handler;
