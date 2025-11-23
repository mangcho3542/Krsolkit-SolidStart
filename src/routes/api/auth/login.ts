import { status } from "@/lib/status";
import { HttpStatus } from "@/types/HttpStatus";
import { APIEvent, APIHandler } from "@solidjs/start/server";
import { eventHandler, setCookie } from "vinxi/http";

interface ResponseI {
	success: boolean;
	message?: string;
	accessToken?: string;
	refreshToken?: string;
}

async function handler(event: APIEvent) {
  const { request: { headers, ...rest } } = event;

	try {
		const res = await fetch(`${process.env.SERVER_URL!}/auth/login`, {
			headers: {
				Authorization: `Bearer ${process.env.SERVER_AUTHORIZATION_KEY!}`,
				...headers,
			},
			...rest,
		});

		const { success, message, accessToken, refreshToken } =
			(await res.json()) as ResponseI;

    //로그인 실패했을 때
		if (!success)
			return status(res.status as keyof typeof HttpStatus, {
				success,
				message,
			});
    
    //success가 true인데 accessToken이나 refreshToken이 없는 경우
    if (!accessToken || !refreshToken) return status(500, {
      success: false,
      message: "서버에 오류가 발생했습니다. 나중에 다시 시도하여 주십시오."
    });

    setCookie(event.nativeEvent, "accessToken", accessToken, {
      
    });
	} catch (err) {
		console.error("login api에서 오류남.\n", err);
		return status(500);
	}
}
