import { APIEvent } from "@solidjs/start/server";
import axios from "axios";
import { status } from "@/lib/status";
import { setCookie } from "vinxi/http";
import { redirect, json } from "@solidjs/router";

interface Body {
  email: string;
  password: string;
}

interface ResponseI {
  message?: string;
  accessToken?: string;
  refreshToken?: string;
}

async function handler(event: APIEvent) {
  const body = (await event.request.json()) as Body;

  const res = await axios.post(process.env.SERVER_URL!, body, {
    headers: {
      "Content-Type": "application/json",
      key: process.env.SERVER_REQUEST_KEY!,
      "Access-Control-Allow-Credential": true,
    },
    responseType: "json",
    validateStatus: (status) => {
      return status === 401;
    }, //status가 401일 때만 정상적으로 처리
    withCredentials: true,
  });

  //로그인 성공하면
  if (res.status === 200) {
    const { accessToken, refreshToken } = res.data as ResponseI;

    setCookie(event.nativeEvent, "accessToken", accessToken!, {
      httpOnly: true,
      maxAge: 60 * 15, //15분
      sameSite: "strict",
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });

    setCookie(event.nativeEvent, "refreshToken", refreshToken!, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30, //1달
      sameSite: "strict",
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });

    return redirect("/", {...status(302)});
  }

  return json(res.data, {...status(401)});
}

export const POST = handler;