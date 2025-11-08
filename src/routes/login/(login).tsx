import { Title, Meta } from "@solidjs/meta";
import styles from "./login.module.css";

export default function Login() {
  return (
    <>
      <Title>로그인</Title>
      <Meta name="description" content="로그인 페이지입니다." />
      <Meta property="og:title" content="ClassHelper-로그인" />
      <Meta property="og:description" content="로그인 페이지입니다." />
      <Meta property="og:url" content="https://classhelper.kr/login" />
      
      <main class="Main">
        <div id={styles.Wrapper}>
          
        </div>
      </main>
    </>
  );
}
