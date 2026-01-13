import { status } from "@lib";
import { checkType } from "@utils";
import { APIEvent, APIHandler } from "@solidjs/start/server";
import { z } from "zod";

const BodyT = z.object({
	nickname: z.string(),
});

async function handler({ request: req }: APIEvent) {
	try {
		if (!checkType(await req.json(), BodyT)) return status(400);

		return fetch(`${process.env.SERVER_URL!}/user/checkNickname`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${process.env.SERVER_AUTH_KEY!}`,
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body: req.body
		});
	} catch (err) {
		console.error("checkNickname api에서 오류남.\n", err);
		return status(500);
	}
}

export const POST: APIHandler = handler;
