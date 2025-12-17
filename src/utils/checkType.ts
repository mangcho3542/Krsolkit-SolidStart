import { z, ZodObject } from "zod";

export function checkType<T extends ZodObject>(
  data: unknown,
  Type: T
): data is z.infer<T> {
  return Type.safeParse(data).success;
}