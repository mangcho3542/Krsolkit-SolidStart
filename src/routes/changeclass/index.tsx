import styles from "./chageclass.module.css";
import { Title } from "@solidjs/meta";
import Main from "./Main";

export default function ChangeClass() {
  return (
    <main class="Main" id={styles.Main}>
      <Title>자리 바꾸기</Title>

      <Main />
    </main>
  );
}