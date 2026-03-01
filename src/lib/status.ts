import { HttpStatus } from "@/types/HttpStatus";
import { CustomResponse, json } from "@solidjs/router";

export function status<S extends number, B extends boolean = S extends 200 ? true : false>(status: S, body?: {ok: B, message?: string}) {
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
