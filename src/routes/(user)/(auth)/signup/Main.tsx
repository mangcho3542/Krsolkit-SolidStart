import styles from "./signup.module.css";
import Field from "@/components/Field";
import PasswordInput from "@/components/PasswordInput";
import axios from "axios";
import { createStore } from "solid-js/store";
import Btn from "@/components/Btn";
import { validateEmail, validaetPw } from "@utils/validate";
import { createEffect, createSignal } from "solid-js";
import { Toast, createToaster } from "@/components/Toast";
import { z } from "zod";
import checkType from "@/utils/checkType";

//ResponseT
const ResponseBaseT = z.object({
  code: z.string().optional(),
  message: z.string().optional(),
  success: z.boolean(),
});

const ResponseT = ResponseBaseT.required({
  code: true,
});

//NicknameCheckResponseT
const NicknameCheckResponseT = z.object({
  isExist: z.boolean()
});

export default function Main() {
  //ref들
  let emailRef: HTMLInputElement,
    pwRef: HTMLInputElement,
    pwCheckRef: HTMLInputElement,
    nicknameRef: HTMLInputElement,
    otpRef: HTMLInputElement;

  //toaster
  const toaster = createToaster({
    placement: "bottom-end",
    duration: 4500,
  });

  //invalid
  const [invalid, setInvalid] = createStore({
    email: false,
    pw: false,
    pwCheck: false,
    nickname: false,
    otp: false,
  });

  //ErrorText
  const [errorText, setErrorText] = createStore({
    email: "이메일 형식이 올바르지 않습니다.",
    nickname: "이미 존재하는 닉네임입니다.",
  });

  //btnSignal
  const [btnSignal, setBtnSignal] = createStore({
    text: "인증하기",
    disable: false,
  });

  //state
  const [state, setState] = createSignal(0); //state

  //code
  const [code, setCode] = createSignal("");

  //~effect
  createEffect(() => {
    if (state() === 1) setBtnSignal({ text: "회원가입", disable: true });
    else if (state() === 2) setBtnSignal({ disable: false });
  });

  //&toaster로 오류 띄우는 함수
  function createErrToast() {
    toaster.create({
      type: "error",
      title: "오류",
      description: (
        <>
          서버에서 오류가 있습니다.
          <br />
          나중에 다시 시도하여 주십시오.
        </>
      ),
    });
  }

  //& 이메일 확인하는 함수
  function checkEmail(): boolean {
    const flag = validateEmail(emailRef.value);
    setInvalid({ email: !flag });
    return flag;
  }

  //&비밀번호 확인하는 함수
  function checkPw(): boolean {
    let flag = validaetPw(pwRef.value);
    setInvalid({ pw: !flag });
    if (!flag) return false;

    const flag2 = pwRef.value !== pwCheckRef.value;
    if (flag2) flag = false;

    setInvalid({ pwCheck: flag2 });
    return flag;
  }

  //&nickname확인하는 함수
  async function checkNickname(): Promise<boolean> {
    const nickname = nicknameRef.value;
    if (nickname.length < 2 || nickname.length > 30) {
      setErrorText({
        nickname:
          "닉네임은 한글, 영어, 숫자로만 이루어진 30글자 이하의 문자여야합니다.",
      });
      setInvalid({ nickname: true });
      return false;
    }

    let flag = true;
    await axios.post("/api/user/checkNickname", {
      nickname: nicknameRef.value,
    })
    .then((res) => {
      if (!checkType(res.data, NicknameCheckResponseT)) {
        createErrToast();
      }

      const { isExist } = res.data;

      //닉네임 존재하면 오류
      if (isExist) {
        setErrorText({ nickname: "이미 존재하는 닉네임입니다." });
        setInvalid({ nickname: true });
        flag = false;
        return ;
      }

      setInvalid({ nickname: false });
    })
    .catch((err) => {
      console.error("checkNickname함수에서 오류남.");
      console.dir(err, {depth: null});
      createErrToast();
      flag = false;
    })

    return flag;
  }

  //& otp확인하는 함수
  function checkOtp() {
    if (otpRef.value === code()) setState(2);
    else setInvalid({ otp: true });
  }

  //&버튼 클릭시 실행할 함수
  async function handleBtnClick() {
    let set = new Set<boolean>();
    set.add(checkEmail());
    set.add(checkPw());
    set.add(await checkNickname());
    if (set.has(false)) return ;
    
    //이메일, 비밀번호, 닉네임 체크 완료했을 때
    if (state() === 0) {
      //state가 0이면 verifyEmail
      await verifyEmail();
      return;
    }

    const res = await axios.post("/api/auth/signup", {
      email: emailRef.value,
      password: pwRef.value,
      nickname: nicknameRef.value,
    });

    if (res.status === 200) window.history.back();
    else {
      console.error("handleBtnClick 에서 오류남.\n", res);
      createErrToast();
    }
  }

  //&verifyEmail api호출하는 함수
  async function verifyEmail() {
    //state가 0이면 verifyEmail api 호출
    try {
      const res = await axios.post(
        "/api/auth/verifyEmail",
        {
          email: emailRef.value,
        },
        {
          validateStatus(status) {
            return (
              status === 200 ||
              status === 400 ||
              status === 401 ||
              status === 500
            );
          },
        }
      );

      const data = res.data;
      if (!checkType(data, ResponseBaseT)) {
        console.error("data type이 다름.\ndata", data);
        createErrToast();
        return;
      }

      if (res.status === 200) {
        if (!checkType(data, ResponseT)) {
          console.error("data 타입이 다름.\ndata", data);
          createErrToast();
          return;
        }

        setCode(data.code);
        setState(1);
        toaster.create({
          type: "success",
          title: "이메일 전송 완료",
          description: "이메일이 전송되었습니다."
        })
      } else {
        toaster.create({
          type: "error",
          title: "오류",
          description: data.message,
        });
      }
    } catch (err) {
      console.error("verifyEmail api 호출할 때 오류남.\n", err);
      createErrToast();
    }
  }

  return (
    <main class="Main" id={styles.Main}>
      <Toast toast={toaster} />

      <div id={styles.Wrapper}>
        <Field
          class={styles.Field}
          required={true}
          InputProps={{
            class: styles.Input,
            ref: (el) => (emailRef = el),
            autocomplete: "email",
            type: "email",
            onBlur: checkEmail
          }}
          inputmode="email"
          inputMode="email"
          invalid={invalid.email}
          ErrorText={errorText.email}
          Label="이메일"
          LabelProps={{
            class: styles.Label,
          }}
        />

        <PasswordInput
          class={styles.Field}
          required={true}
          InputProps={{
            class: styles.Input,
            ref: (el) => (pwRef = el),
            autocomplete: "new-password",
            onBlur: checkPw
          }}
          invalid={invalid.pw}
          ErrorText="비밀번호는 영소문자로만 이루어져야하고 12~25글자여야 합니다."
          Label="비밀번호"
          LabelProps={{
            class: styles.Label,
          }}
        />

        <PasswordInput
          class={styles.Field}
          required={true}
          InputProps={{
            class: styles.Input,
            ref: (el) => (pwCheckRef = el),
            autocomplete: "new-password",
            onBlur: checkPw
          }}
          ErrorText="비밀번호가 서로 다릅니다."
          Label="비밀번호 확인"
          LabelProps={{
            class: styles.Label,
          }}
        />

        <Field
          class={styles.Field}
          required={true}
          InputProps={{
            class: styles.Input,
            ref: (el) => (nicknameRef = el),
            autocomplete: "nickname",
          }}
          invalid={invalid.nickname}
          ErrorText={errorText.nickname}
          Label="닉네임"
          LabelProps={{
            class: styles.Label,
          }}
        />

        <Field
          class={styles.Field}
          required={true}
          InputProps={{
            class: styles.Input,
            ref: (el) => (otpRef = el),
            autocomplete: "one-time-code",
            inputMode: "text",
            onKeyUp: (e) => {
              if (e.key === "Enter" || e.key === "Tab") checkOtp();
            },
            onBlur: checkOtp,
          }}
          invalid={invalid.otp}
          disabled={!!!state()}
          ErrorText="이메일로 전송된 코드와 일치하지 않습니다."
          Label="인증코드"
          LabelProps={{
            class: styles.Label,
            id: "TmpLabel"
          }}
        />

        <div id={styles.BtnWrapper}>
          <Btn id={styles.Btn} onClick={async () => {
            await handleBtnClick();
          }}>
            {btnSignal.text}
          </Btn>
        </div>
      </div>
    </main>
  );
}