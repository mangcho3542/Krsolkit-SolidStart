import { status } from "@/lib/status";
import { APIEvent } from "@solidjs/start/server";

async function checkNickname({ request: { headers, ...rest } }: APIEvent) {
	try {
		return fetch(`${process.env.SERVER_URL!}/user/checkNickname`, {
			headers: {
				Authorization: `Bearer ${process.env.SERVER_AUTHORIZATION_KEY!}`,
				...headers,
			},
			...rest,
		});
	} catch (err) {
		console.error("checkNickname api에서 오류남.\n", err);
		return status(500);
	}
}

export const POST = checkNickname;
