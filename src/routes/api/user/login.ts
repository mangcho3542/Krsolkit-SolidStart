import { APIEvent } from "@solidjs/start/server";
import axios from "axios";

interface Body {
  email: string;
  password: string;
}

async function handler(event: APIEvent) {
  const body = (await event.request.json()) as Body;
  await axios
    .post(process.env.SERVER_URL!, body, {
      headers: { 
        "Content-Type": "application/json",
        "Key": process.env.SERVER_REQUEST_KEY!
      },
      responseType: "json"
    })
    .then((response) => {
      const {status, accessToken, refreshToken} = response.data as {
        status: boolean;
        accessToken?: string;
        refreshToken?: string;
      };
      if(status) return new Response(
        JSON.stringify({success: true}),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            //todo 이 부분부터 cookie라이브러리 사용해서 작성해야함.
          }
        }
    )
    })
    .catch((err) => {
      console.error("login api에서 오류 남.");
      console.error(err);
      process.exit(1);
    });
}