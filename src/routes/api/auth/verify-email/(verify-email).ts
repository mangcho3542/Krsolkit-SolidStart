import { serverApi } from "@lib/serverApi";
import { status } from "@lib/status";
import { APIEvent } from "@solidjs/start/server";
import { VerifyEmailReq, VerifyEmailRes } from "@schema/auth/verify-email/verify-email.schema";
import { CookieSerializeOptions, setCookie } from "vinxi/http";
import redis from "@lib/redis";

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
		const tmpData = await VerifyEmailReq.safeDecodeAsync(body);
		if (!tmpData.success)
			return status(400, { ok: false, message: "Type Error" });

		const { email } = tmpData.data;

		//시도 횟수가 5보다 크거나 같다면 400 error
		const attemptCnt: string | null = await redis.get(`email_verify_attempts:${email}`);
		if(attemptCnt && Number.parseInt(attemptCnt) >= 5) { 
			return status(400, {ok: false, message: "Too Many Attempt"});
		}

		const res = await serverApi.post("/auth/verify-email", {
			email: tmpData.data.email,
		});

		const result = await VerifyEmailRes.safeDecodeAsync(await res.data);

		if (!result.success) return status(500);

		const { code, message, ok } = result.data;
		
		//실패했을 때는 오류 return
		if(res.status < 200) return status(500);
		else if (!ok) return status(res.status, { ok, message });

		//email 및 step은 cookie에 저장
		setCookie(nativeEvent, "signup_email", email, CookieOption);
		setCookie(nativeEvent, "signup_step", '1', CookieOption);
		await redis.set(`signup_email:${email}`, code!, { ex: 300 });

		//시도 횟수는 1증가
		if(attemptCnt) await redis.incr(`email_verify_attempts:${email}`);
		else await redis.set(`email_verify_attempts:${email}`, 1, {ex: 300});

		return status(200, { ok: true, message: "" });
	} catch (err) {
		console.error("/api/verify-email/에서 오류남.\n", err);
		return status(500);
	}
}
