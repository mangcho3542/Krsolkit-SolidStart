import { Title, Meta } from "@solidjs/meta";
import styles from "./login.module.css";
import Field from "@/components/Field";
import PasswordInput from "@/components/PasswordInput";
import Btn from "@/components/Btn";
import A from "@/components/A";
import { createStore } from "solid-js/store";
import axios from "axios";
import { createToaster, Toast } from "@components/Toast";

export default function Login() {
  const linkAry: { text: string; href: string }[] = [
    { text: "비밀번호 찾기", href: "find_password" },
    { text: "회원가입", href: "signup" },
  ];

  //invalid
  const [invalid, setInvalid] = createStore<{
    email: boolean;
    password: boolean;
  }>({
    email: false,
    password: false,
  });

  //ref
  type IORU = HTMLInputElement | undefined;
  let emailRef: IORU = undefined,
    pwRef: IORU = undefined;

  //regex
  const emailRegex = /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
  const pwRegex = /[^\w!@#$%^&*()_+{}|:"<>?=\[\];',\.\/]/;

  //toaster
  const toaster = createToaster({
    placement: "bottom-end",
    overlap: false,
    gap: 12,
  });

  //&function
  //&email검증할 함수
  function validateEmail(email: string) {
    const flag = emailRegex.test(email);
    if (!flag) setInvalid("email", true);

    return flag;
  }

  //&비밀번호 검증할 함수
  function validaetPw(pw: string) {
    const flag = !pwRegex.test(pw) && pw.length >= 12;
    if (!flag) setInvalid("password", true);

    return flag;
  }

  //로그인 하는 함수
  async function handleLogin() {
    if (!emailRef || !pwRef) return;
    const email = emailRef.value;
    const pw = pwRef.value;
    if (!validateEmail(email) || validaetPw(pw)) return;

    try {
      const res = await axios.post(
        "/api/user/login",
        { email, password: pw },
        { validateStatus: (status) => status === 401 } //401일 때는 정상적으로 처리
      );

      //로그인 오류 났을 때에는 toaster띄워주기
      if (res.status === 401) {
        toaster.create({
          title: "오류",
          description: res.data,
          type: "error",
        });

        return;
      }
      //302일 때는 뒤로 가기
      else if (res.status === 302) {
        window.history.back();
      } else {
        console.log("3번째 상황");
        console.log("res : ", res);
      }
    } catch (err) {
      console.error("로그인 api 호출할 때 오류남.");
      console.error(err);
    }
  }

  return (
    <>
      <Title>로그인</Title>
      <Meta name="description" content="로그인 페이지입니다." />
      <Meta property="og:title" content="ClassHelper-로그인" />
      <Meta property="og:description" content="로그인 페이지입니다." />
      <Meta property="og:url" content="https://classhelper.kr/login" />
      <Meta property="og:image" content="https://classhelper.kr/favicon.png" />
      <main class={`Main ${styles.Main}`}>
        <Toast toast={toaster} />

        <div id={styles.Wrapper}>
          <h1
            style={{
              display: "block",
              width: "100%",
              "text-align": "center",
              "margin-bottom": "13%",
              "font-family": "SuitBold, var(--default-font-family)",
              "font-weight": "700",
              "font-size": "1.3rem",
            }}
          >
            로그인
          </h1>

          <Field
            class={styles.Field}
            Label="이메일"
            LabelProps={{ class: styles.FieldLabel }}
            aria-placeholder="이메일"
            required={true}
            invalid={invalid.email}
            InputProps={{
              ref: (el) => (emailRef = el),
              type: "email",
            }}
            ErrorText="이메일 형식이 잘못되었습니다."
            ErrorTextProps={{ class: styles.ErrorText }}
          />

          <PasswordInput
            class={styles.Field}
            Label="비밀번호"
            LabelProps={{ class: styles.FieldLabel }}
            aria-placeholder="비밀번호"
            required={true}
            invalid={invalid.password}
            InputProps={{
              ref: (el) => (pwRef = el),
            }}
            ErrorText="비밀번호는 12자리 이상의 영문, 숫자로 구성되어야 합니다."
            ErrorTextProps={{ class: styles.ErrorText }}
            onKeyUp={async (e) => {   //Enter버튼 눌렀을 때 로그인 실행하기
              if(e.key === "Enter") {
                e.preventDefault();
                await handleLogin();
              }
            }}
          />

          <div id={styles.BtnWrapper}>
            <Btn
              id={styles.Btn}
              onClick={async () => {
                await handleLogin();
              }}
            >
              로그인
            </Btn>
          </div>

          <div id={styles.LinkWrapper}>
            {linkAry.map(({ text, href }) => (
              <A class={styles.Link} href={href}>
                {text}
              </A>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
