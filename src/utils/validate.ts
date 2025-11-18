//regex
const emailRegex = /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
const pwRegex = /[^\w!@#$%^&*()_+{}|:"<>?=\[\];',\.\/]/;

//&email검증할 함수
export function validateEmail(email: string) {
  const flag = emailRegex.test(email);

  return flag;
}

//&비밀번호 검증할 함수
export function validaetPw(pw: string) {
  const flag = !pwRegex.test(pw) && pw.length >= 12 && pw.length <= 25;

  return flag;
}
