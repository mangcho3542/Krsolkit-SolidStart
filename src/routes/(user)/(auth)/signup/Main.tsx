import styles from "./signup.module.css";
import Field from "@/components/Field";
import PasswordInput from "@/components/PasswordInput";
import axios from "axios";
import { createStore } from "solid-js/store";
import Btn from "@/components/Btn";
import { validateEmail, validaetPw } from "@utils/validate";
import { createEffect, createSignal } from "solid-js";

export default function Main() {
  //ref들
  let emailRef: HTMLInputElement,
    pwRef: HTMLInputElement,
    pwCheckRef: HTMLInputElement,
    nicknameRef: HTMLInputElement
    otpRef: HTMLInputElement;

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

  //next
  const [next, setNext] = createSignal(false);

  //disable
  const [disable, setDisable] = createStore({
    otp: true,
    btn: false
  });

  //btnText
  const [btnText, setBtnText] = createSignal("다음");

  //~ effect
  createEffect(() => {
    if(next()) {
      setBtnText("회원가입");
      setDisable({otp: false, btn: true});
    }
  })

  //&이메일 확인하는 함수
  function checkEmail(): boolean {
    const flag = validateEmail(emailRef.value);
    setInvalid({email: !flag});
    return flag;
  }

  //&비밀번호 확인하는 함수
  function checkPw(): boolean {
    let flag = validaetPw(pwRef.value);
    setInvalid({pw: !flag});
    if(!flag) return false;

    const flag2 = pwRef.value !== pwCheckRef.value;
    if(flag2) flag = false;

    setInvalid({pwCheck: flag2})
    return flag;
  }

  //&nickname확인하는 함수
  async function checkNickname(): Promise<boolean> {
    const nickname = nicknameRef.value;
    if(nickname.length < 2 || nickname.length > 30) {
      setErrorText({nickname: "닉네임은 한글, 영어, 숫자로만 이루어진 30글자의 문자여야합니다."});
      setInvalid({nickname: true});
      return false;
    }

    const res = await axios.post("/user/checkNickname", {
      nickname: nicknameRef.value
    });
    const { isExist } = res.data as { isExist: boolean; }
    
    //닉네임 존재하면 오류
    if(isExist) {
      setErrorText({nickname: "이미 존재하는 닉네임입니다."});
      setInvalid({nickname: true});
      return false;
    }

    setInvalid({nickname: false});
    return true;
  }

  //EmailVerification으로 넘어가는 함수
  async function moveToNextPage() {
    let set = new Set<boolean>();
    set.add(checkEmail());
    set.add(checkPw());
    set.add(await checkNickname());
    if(set.has(false)) return;

    await axios.post("/auth/signup/continue", {
      email: emailRef.value,
    });
  }

  return (
    <main class="Main" id={styles.Main}>

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
          ErrorText={ErrorText.email}
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
          ErrorText={ErrorText.nickname}
        />

        {/**todo otp field생성해야함. */}

        <div id={styles.NextBtnWrapper}>
          <Btn 
          id={styles.NextBtn}
          onClick={async () => {
            await moveToNextPage();
          }}
          >
            {btnText()}
          </Btn>
        </div>
      </div>
    </main>
  );
}