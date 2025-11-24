import { status } from "@/lib/status";
import { HttpStatus } from "@/types/HttpStatus";
import { APIEvent, APIHandler } from "@solidjs/start/server";
import { setCookie } from "vinxi/http";
import { z } from "zod";
import checkType from "@/utils/checkType";

const BodyT = z.object({
  email: z.email(),
  password: z.string(),
});

const ResponseT = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  accessToken: z.string().optional(),
  refreshToken: z.string().optional(),
});

async function handler({request: {headers, json, ...rest}, nativeEvent}: APIEvent): Promise<Response> {
  try {
    const body = await json();
    if (!checkType(body, BodyT))
      return status(400, { success: false, message: "TypeError" });

    const res = await fetch(`${process.env.SERVER_URL!}/auth/login`, {
      headers: {
        Authorization: `Bearer ${process.env.SERVER_AUTHORIZATION_KEY!}`,
        ...headers,
      },
      ...rest,
    });

    const data = await res.json();
    if (!checkType(data, ResponseT))
      return status(500, {
        success: false,
        message: "서버에 오류기 생겼습니다. 나중에 다시 시도해 주십시오",
      });

		const { success, message, accessToken, refreshToken } = data;
    //로그인 실패했을 때
    if (!success)
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

    return status(200, {success: true});
  } catch (err) {
    console.error("login api에서 오류남.\n", err);
    return status(500);
  }
}

export const POST: APIHandler = handler;