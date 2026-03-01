import { VerifyEmailReq } from "@schema/auth/verify-email/verify-email.schema";
import { ResSchema } from "@schema/index.schema";
import { z } from "zod";

export const CheckNicknameReq = VerifyEmailReq.omit({email: true});

export const CheckNicknameRes = ResSchema.omit({message: true}).extend({
    message: z.union([
        z.literal("exist nickname"),
        z.literal("non-exist nickname"),
        z.string()
    ])
});