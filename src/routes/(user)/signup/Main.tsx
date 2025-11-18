import styles from "./signup.module.css";
import EmailInput from "./EmailInput";
import { createSignal } from "solid-js";
import Field from "@/components/Field";
import PasswordInput from "@/components/PasswordInput";
import { Toast, createToaster } from "@/components/Toast";
import axios from "axios";
import { createStore } from "solid-js/store";
import Btn from "@/components/Btn";
import { validateEmail, validaetPw } from "@utils/validate";

export default function Main() {
  //timer제어하는 signal
  const [isTimerRunning, setIsTimerRunning] = createSignal(false);

  //ref들
  let emailRef: HTMLInputElement,
    otpRef: HTMLInputElement,
    pwRef: HTMLInputElement,
    pwCheckRef: HTMLInputElement,
    nicknameRef: HTMLInputElement;

  //invalid
  const [invalid, setInvalid] = createStore({
    email: false,
    otp: false,
    pw: false,
    pwCheck: false,
    nickname: false,
  });

  //disable
  const [disable, setDisable] = createStore({
    email: false,
    signup: true
  });

  //toaster
  const toaster = createToaster({
    placement: "bottom-end",
  });

  //이메일 전송하는 함수
  async function sendEmail() {
    if (!emailRef) return;
    if (!validateEmail) { //이메일 형식이 잘못되었다면 return;
      setInvalid({email: true});
      return;
    }

    setDisable({email: true});
    setIsTimerRunning(false);

    await axios
      .post(
        `api/email`,
        { email: emailRef.value },
        {
          validateStatus(status) {
            return status === 400 || status === 401;
          },
        }
      )
      .then((res) => {
        setDisable({email: false});
        setIsTimerRunning(true);

        if (res.status >= 400) {
          //400 or 401에러라면 toaster로 메시지 띄우기
          toaster.create({
            type: "error",
            title: "오류",
            description: res.data.message,
            duration: 5000,
          });

          return;
        }

        const { code } = res.data;
        if (code !== otpRef.value) {
          //otp가 틀리면 에러
          setInvalid({ otp: true });
          return;
        }

        //code인증되면 입력 방지 및 메시지 띄우기
        setDisable({email: true, signup: false});
        setIsTimerRunning(false);
        toaster.create({
          type: "success",
          title: "완료",
          description: "이메일이 인증되었습니다."
        });
      })
      .catch((err) => {
        setDisable({email: false});
        console.error("sendEmail함수에서 에러남.\n", err);
        toaster.create({
          type: "error",
          title: "오류",
          description: (
            <>
              서버의 오류로 메시지를 전송하지 못하였습니다. 나중에 다시 시도하여
              주십시오.
            </>
          ),
        });
      });
  }

  //비밀번호 확인하는 함수
  function checkPw() {
    const flag = validaetPw(pwRef.value);

    if(!flag) setInvalid({pw: true});
    else setInvalid({pw: false});

    if(pwRef.value !== pwCheckRef.value) setInvalid({pwCheck: true});
    else setInvalid({pwCheck: false});

    return flag;
  }

  //nickname확인하는 함수
  //todo checkNickname 함수 및 회원가입하는 함수 코드 짜야함.
  function checkNickname() {

  }  

  return (
    <main class="Main" id={styles.Main}>
      <Toast toast={toaster} />

      <div id={styles.Wrapper}>
        <EmailInput
          class={styles.Field}
          isRunning={isTimerRunning()}
          InputProps={{
            class: styles.Input,
            ref: (el) => (emailRef = el),
            autocomplete: "email",
          }}
          inputmode="email"
          inputMode="email"
          invalid={invalid.email}
          BtnProps={{
            onClick: async () => sendEmail(),
          }}
        />

        <Field
          class={styles.Field}
          inputmode="text"
          InputProps={{
            class: styles.Input,
            ref: (el) => (otpRef = el),
            autocomplete: "off",
          }}
          invalid={invalid.otp}
          ErrorText="이메일로 전송된 코드가 입력하신 인증코드와 다릅니다."
          disabled={disable.email}
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
            autocomplete: "nickname",
          }}
          invalid={invalid.nickname}
        />

        <div id={styles.SocialAuthBtnWrapper}>
        </div>

        <div id={styles.SignupBtnWrapper}>
          <Btn 
          id={styles.SignupBtn}
          disabled={disable.signup}
          >
            회원가입
          </Btn>
        </div>
      </div>
    </main>
  );
}