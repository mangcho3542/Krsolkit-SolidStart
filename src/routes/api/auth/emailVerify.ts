import status from "@/lib/status";
import { APIEvent, APIHandler } from "@solidjs/start/server";
import checkType from "@/utils/checkType";
import { z } from "zod";

const BodyT = z.object({
	email: z.email(),
});

async function emailVerify({ request: { headers, json, ...rest } }: APIEvent) {
	try {
		const body = await json();
		if (!checkType(body, BodyT)) return status(400);

		return await fetch(process.env.SERVER_URL!, {
			headers: {
				Authorization: `Bearer ${process.env.SERVER_AUTHORIZATION_KEY!}`,
				...headers,
			},
			...rest,
		});
	} catch (err) {
		console.error("emailVerify api에서 오류남.\n", err);
		return status(500);
	}
}

export const POST: APIHandler = emailVerify;
