import { status } from "@lib/status";
import { APIEvent, APIHandler } from "@solidjs/start/server";
import { z } from "zod";

const BodyT = z.object({
	nickname: z.string(),
});

async function handler({ request: req }: APIEvent) {
	try {
		const body = await req.json();
		const typeFlag = await BodyT.safeDecodeAsync(body);
		if (!typeFlag.success) {
			console.error("body : ", body);
			return status(400);
		}

		const res = await fetch(`${process.env.SERVER_URL}/user/check-nickname`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${process.env.AUTHORIZATION_KEY!}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body)
		});

		return status(res.status, await res.json());
	} catch (err) {
		console.error("checkNickname api에서 오류남.\n", err);
		return status(500);
	}
}

export const POST: APIHandler = handler;
