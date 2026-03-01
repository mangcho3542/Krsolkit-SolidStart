import { ResSchema } from "@schema/index.schema";
import { z } from "zod";

export const VerifyEmailReq = z.object({
    email: z.email().min(6).max(30)
});

export type VerifyEmailReqT = z.output<typeof VerifyEmailReq>;

export const VerifyEmailRes = ResSchema.extend({
	code: z.string().nullish(),
});