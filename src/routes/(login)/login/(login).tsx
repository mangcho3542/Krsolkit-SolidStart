import { Title, Meta } from "@solidjs/meta";
import styles from "./login.module.css";
import Field from "@/components/Field";

export default function Login() {
  return (
    <>
      <Title>로그인</Title>
      <Meta name="description" content="로그인 페이지입니다." />
      <Meta property="og:title" content="ClassHelper-로그인" />
      <Meta property="og:description" content="로그인 페이지입니다." />
      <Meta property="og:url" content="https://classhelper.kr/login" />
      <Meta property="og:image" content="https://classhelper.kr/favicon.png" />
      <main
        class="Main"
        style={{
          "align-items": "center",
          padding: "4% 2%",
        }}
      >
        <div id={styles.Wrapper}>
          <h1
            style={{
              display: "inline-block",
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
          LabelProps={{class: styles.FieldLabel}}
          aria-placeholder="이메일"
          required={true}
          />

          
        </div>
      </main>
    </>
  );
}
