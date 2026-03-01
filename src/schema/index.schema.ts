import { z } from "zod";

export const ResSchema = z.object({
    ok: z.boolean(),
    message: z.string()
});