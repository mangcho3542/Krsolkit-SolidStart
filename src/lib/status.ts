import { HttpStatus } from "@types";
import { json } from "@solidjs/router";

export function status(status: keyof typeof HttpStatus, body?: object) {
	if (body === undefined) {
		if (status === 500) {
			return json(
				{
					success: false,
					message:
						"서버에서 오류가 발생하였습니다.\n나중에 다시 시도하여 주십시오.",
				},
				{
					status,
					statusText: HttpStatus[status],
				}
			);
		} else if (status === 400) {
			return json(
				{ success: false, message: "TypeError" },
				{
					status,
					statusText: HttpStatus[status],
				}
			);
		}
	}

	return json(body, { status, statusText: HttpStatus[status] });
}
