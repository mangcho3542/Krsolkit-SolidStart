import styles from "./signup.module.css";
import { createSignal } from "solid-js";
import Field from "@/components/Field";
import PasswordInput from "@/components/PasswordInput";
import { Toast, createToaster } from "@/components/Toast";
import axios from "axios";
import { createStore } from "solid-js/store";
import Btn from "@/components/Btn";
import { validateEmail, validaetPw } from "@utils/validate";

export default function Main() {
  //ref들
  let emailRef: HTMLInputElement,
    pwRef: HTMLInputElement,
    pwCheckRef: HTMLInputElement,
    nicknameRef: HTMLInputElement;

  //invalid
  const [invalid, setInvalid] = createStore({
    email: false,
    pw: false,
    pwCheck: false,
    nickname: false,
  });

  //ErrorText
  const [ErrorText, setErrorText] = createStore({
    email: "이메일 형식이 올바르지 않습니다.",
    nickname: "이미 존재하는 닉네임입니다."
  });

  //toaster
  const toaster = createToaster({
    placement: "bottom-end",
  });

  //&이메일 확인하는 함수
  function checkEmail(): boolean {
    const flag = !validateEmail(emailRef.value);
    setInvalid({email: flag});
    return flag;
  }

  //&비밀번호 확인하는 함수
  function checkPw(): boolean {
    let flag = !validaetPw(pwRef.value);

    setInvalid({pw: flag});
    const flag2 = pwRef.value !== pwCheckRef.value;
    if(flag2) flag = false;

    setInvalid({pwCheck: flag2})
    return flag;
  }

  //&nickname확인하는 함수
  async function checkNickname(): Promise<boolean> {
    //todo checkNickname api만들어야함.
    const res = await axios.post("/checkNickname", {
      nickname: nicknameRef.value
    });
    const { isExist } = res.data as { isExist: boolean; }
    setInvalid({nickname: isExist});
    return isExist;
  }

  async function signup() {
    let set = new Set<boolean>();
    set.add(checkEmail());
    set.add(checkPw());
    set.add(await checkNickname());
    if(set.has(false)) return;

    //todo signup api 만들어야함.
    axios.post("/signup", {
      email: emailRef.value,
      password: pwRef.value,
      nickname: nicknameRef.value
    });
  }

  return (
    <main class="Main" id={styles.Main}>
      <Toast toast={toaster} />

      <div id={styles.Wrapper}>
        <Field
          class={styles.Field}
          InputProps={{
            class: styles.Input,
            ref: (el) => (emailRef = el),
            autocomplete: "email",
            type: "email"
          }}
          inputmode="email"
          inputMode="email"
          invalid={invalid.email}
        />

        <PasswordInput
          class={styles.Field}
          InputProps={{
            class: styles.Input,
            ref: (el) => (pwRef = el),
            autocomplete: "new-password",
          }}
          invalid={invalid.pw}
          ErrorText="비밀번호는 영소문자로만 이루어져야하고 12~25글자여야 합니다."
        />

        <PasswordInput
          class={styles.Field}
          InputProps={{
            class: styles.Input,
            ref: (el) => (pwCheckRef = el),
            autocomplete: "new-password",
          }}
          ErrorText="비밀번호가 서로 다릅니다."
        />

        <Field
          class={styles.Field}
          InputProps={{
            class: styles.Input,
            ref: (el) => (nicknameRef = el),
            autocomplete: "nickname"
          }}
          invalid={invalid.nickname}
        />

        <div id={styles.SocialAuthBtnWrapper}>
        </div>

        <div id={styles.SignupBtnWrapper}>
          <Btn 
          id={styles.SignupBtn}
          onClick={async () => {
            await signup();
          }}
          >
            회원가입
          </Btn>
        </div>
      </div>
    </main>
  );
}