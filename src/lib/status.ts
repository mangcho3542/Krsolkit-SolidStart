import { HttpStatus } from "@/types/HttpStatus";
import { json } from "@solidjs/router";

interface BodyI {
	ok: boolean;
	message?: string;
}

export function status(status: number, body?: BodyI) {
	let obj = body
		? { ok: body.ok, message: body.message ?? "" }
		: {
			ok: status === 200,
			message: HttpStatus[status as keyof typeof HttpStatus],
		};

	return json(obj, {
		status,
		statusText: HttpStatus[status as keyof typeof HttpStatus],
	});
}
