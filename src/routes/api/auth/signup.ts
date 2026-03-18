import { APIEvent, APIHandler } from "@solidjs/start/server";
import { z } from "zod";
import { status } from "@lib/status";
import { setCookie } from "vinxi/http";
import { HttpStatus } from "@/types/HttpStatus";

export const SignupBody = z.object({
	email: z.email(),
	password: z.string(),
	nickname: z.string(),
});

const ResponseT = z.object({
	success: z.boolean(),
	message: z.string().optional(),
	accessToken: z.string().optional(),
	refreshToken: z.string().optional(),
});

async function handler({
	request: req,
	nativeEvent,
}: APIEvent) {
	try {
		const body = await req.json();
		const typeFlag = await SignupBody.safeDecodeAsync(body);
		if(!typeFlag.success) return status(400);

		const res = await fetch(process.env.SERVER_URL!, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${process.env.AUTHORIZATION_KEY!}`,
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body: JSON.stringify(body)
		});

		const data = await res.json();

		if (!await ResponseT.safeDecodeAsync(data)) return status(500);

		const { ok, message, accessToken, refreshToken } = data;
		if (!ok || res.status < 200 || res.status > 226)
			return status(res.status as keyof typeof HttpStatus, {
				ok,
				message,
			});

		if (!accessToken || !refreshToken)
			return status(500, {
				ok: false,
				message: "서버에서 오류가 났습니다.\n나중에 다시 시도해 주십시오.",
			});

		//쿠키 있으면 성공
		setCookie(nativeEvent, "accessToken", accessToken, {
			path: "/",
			maxAge: 60 * 15, //15분
			httpOnly: true,
			sameSite: "strict",
			secure: true,
		});

		setCookie(nativeEvent, "refreshToken", refreshToken, {
			path: "/",
			maxAge: 60 * 24 * 14, //2주
			httpOnly: true,
			sameSite: "strict",
			secure: true,
		});

		return status(200, { ok: true });
	} catch (err) {
		console.error("signup api에서 오류남.\n", err);
		return status(500, {
			ok: false,
			message: "서버에서 오류가 났습니다.\n나중에 다시 시도해 주십시오.",
		});
	}
}

export const POST: APIHandler = handler;
