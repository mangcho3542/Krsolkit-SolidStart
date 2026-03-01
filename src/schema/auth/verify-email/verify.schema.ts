import { z } from "zod";

export const VerifyEmailVerifyReq = z.object({
    code: z.string().length(4)
});

export type VerifyEmailVerifyReqT = z.output<typeof VerifyEmailVerifyReq>;

//res는 BaseRes랑 똑같음