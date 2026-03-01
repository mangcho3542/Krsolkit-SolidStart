import { z } from "zod";
import { ResSchema } from "@schema/index.schema";
import { VerifyEmailReq } from "./verify-email/verify-email.schema";

export const LoginReq = VerifyEmailReq.safeExtend({
	password: z.string().min(5).max(30)
});

export const LoginRes = ResSchema.safeExtend({
	accessToken: z.string(),
	refreshToken: z.string(),
});
