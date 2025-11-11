import { HttpStatus } from "@/types/HttpStatus";
import type { RouterResponseInit } from "@solidjs/router";

export function status(status: keyof typeof HttpStatus): {
  status: number;
  statusText: string;
} {
  return { status, statusText: HttpStatus[status] };
}