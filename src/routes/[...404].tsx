import { Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";
import styles from "@styles/404.module.css";
import A from "@components/A";

export default function NotFound() {
  return (
    <main class="Main" style={{ "align-items": "center" }}>
      <Title>Not Found</Title>
      <HttpStatusCode code={404} />
      <h1
        style={{
          display: "block",
          "font-family": "SuitSemiBold, var(--default-font-family)",
          "font-size": "1.6rem",
        }}
      >
        존재하지 않는 페이지
      </h1>
      <p class={styles.Text}>
        <h2>페이지를 찾을 수 없습니다!</h2> <br />
        요청하신 페이지가 삭제되었거나 주소가 변경되었을 수도 있습니다. 다시
        확인해 주십시오&#128522;
      </p>
      <br />
      <A
        href="/"
        style={{
          "font-family": "SuitSemiBold, var(--default-font-family)",
          "font-size": "1.3rem",
        }}
      >
        홈으로 가기
      </A>
    </main>
  );
}
