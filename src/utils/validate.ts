const emailChecker = /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/i;

export function validateEmail(email: string): boolean {
  return emailChecker.test(email) && email.length <= 30;
}

const nicknameChecker = /[^ㄱ-ㅎㅏ-ㅣ가-힣\w-]/g;

export function validateNickname(nickname: string): boolean {
  return !nicknameChecker.test(nickname) && nickname.length >= 5 && nickname.length <= 15;
}


const pwRegex = /[^\w\-]/g;

//비밀번호 검증할 함수
export function validaetPw(pw: string): boolean {
  return !pwRegex.test(pw) && pw.length >= 8 && pw.length <= 25;
}
