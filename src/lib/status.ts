import { HttpStatus } from "@/types/HttpStatus";
import { json } from "@solidjs/router";

export function status(status: keyof typeof HttpStatus, body?: object) {
  return json(body, { status, statusText: HttpStatus[status] });
}
