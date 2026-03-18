import { status } from "@lib/status";
import { HttpStatus } from "@/types/HttpStatus";
import { APIEvent, APIHandler } from "@solidjs/start/server";
import { setCookie } from "vinxi/http";
import { LoginReq, LoginRes } from "@schema/auth/login.schema";
import { serverApi } from "@lib/serverApi";

async function handler({
	request: req,
	nativeEvent,
}: APIEvent): Promise<Response> {
	try {
		const body = await req.json();
		const typeFlag = await LoginReq.safeEncodeAsync(body);
		if(!typeFlag.success) return status(400);

		const res = await serverApi.post("/auth/login", {
			headers: {
				Authorization: `Bearer ${process.env.AUTHORIZATION_KEY!}`,
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(body)
		});


		if (LoginRes.safeDecode(res.data)) return status(500);

		const { success, message, accessToken, refreshToken } = res.data;
		//로그인 실패했을 때
		if (!success || res.status < 200 || res.status > 226)
			return status(res.status as keyof typeof HttpStatus, {
				success,
				message,
			});

		//success가 true인데 accessToken이나 refreshToken이 없는 경우
		if (!accessToken || !refreshToken)
			return status(500, {
				success: false,
				message: "서버에 오류가 발생했습니다. 나중에 다시 시도하여 주십시오.",
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

		return status(200, { success: true });
	} catch (err) {
		console.error("login api에서 오류남.\n", err);
		return status(500);
	}
}

export const POST: APIHandler = handler;
