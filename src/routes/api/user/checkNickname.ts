import { status } from "@/lib/status";
import checkType from "@/utils/checkType";
import { APIEvent, APIHandler } from "@solidjs/start/server";
import { z } from "zod";

const BodyT = z.object({
  nickname: z.string(),
});

async function checkNickname({
  request: { headers, json, ...rest },
}: APIEvent) {
  try {
    if (!checkType(await json(), BodyT))
      return status(400, { success: false, message: "TypeError" });

    return fetch(`${process.env.SERVER_URL!}/user/checkNickname`, {
      headers: {
        Authorization: `Bearer ${process.env.SERVER_AUTHORIZATION_KEY!}`,
        ...headers,
      },
      ...rest
    });
  } catch (err) {
    console.error("checkNickname api에서 오류남.\n", err);
    return status(500);
  }
}

export const POST: APIHandler = checkNickname;
