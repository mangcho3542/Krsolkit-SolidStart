import redis from "@lib/redis";
import { status } from "@lib/status";
import { VerifyEmailVerifyReq } from "@schema/auth/verify-email/verify.schema";
import { APIEvent } from "@solidjs/start/server";
import { CookieSerializeOptions, getCookie, setCookie } from "vinxi/http";

//쿠기 설정
const CookieOption: CookieSerializeOptions = {
	path: "/signup",
	maxAge: 60 * 5, //5분
	httpOnly: true,
	sameSite: "strict",
	secure: true,
};

export async function POST({ request: req, nativeEvent }: APIEvent) {
	try {
		const body = await req.json();
		const data = await VerifyEmailVerifyReq.safeDecodeAsync(body);
		if (!data.success) return status(400);

		const { code: InputtedCode } = data.data;

		const email = getCookie(nativeEvent, "signup_email");
		if (!email) {
			return status(400, { ok: false, message: "Authorization time expired" });
		}

		const code: string | null = await redis.get(`signup_email:${email}`);

		if (!code)
			return status(400, { ok: false, message: "Authrization time expired" });

		if (code === InputtedCode) {	//입력한 코드가 저장된 코드와 같다면
			//이메일 및 step저장
			setCookie(nativeEvent, "signup_email", email, CookieOption);
			setCookie(nativeEvent, "signup_step", "2", CookieOption);
			return status(200, { ok: true, message: "" });
		} else return status(401, { ok: false, message: "Wrong code" });
	} catch (err) {
		console.error("api/verify-email/verify에서 오류남.\n", err);
		return status(500);
	}
}
