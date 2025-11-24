import { z } from "zod";

const emailChecker = z.email().max(30)

//regex
const pwRegex = /[^\w!@#$%^&*()_+{}|:"<>?=\[\];',\.\/]/;

//&email검증할 함수
export function validateEmail(email: string): boolean {
  return emailChecker.safeParse(email).success;
}

//&비밀번호 검증할 함수
export function validaetPw(pw: string): boolean {
  const flag = !pwRegex.test(pw) && pw.length >= 12 && pw.length <= 25;

  return flag;
}
