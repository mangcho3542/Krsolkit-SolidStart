import { HttpStatus } from "@/types/HttpStatus";

export function status(status: keyof typeof HttpStatus, body?: object): Response {
  return new Response(JSON.stringify(body), {
    status,
    statusText: HttpStatus[status]
  });
}