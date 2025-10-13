import { Title } from "@solidjs/meta";
import Text from "@components/Text";
import styles from "./index.module.css";

export default function Home() {
  return (
    <main id={styles.Main}>
      <Title>ClassHelper</Title>

      <Text id={styles.MainText}>
        ClassHelper
      </Text>

      <Text display="block" fontSize="2.5rem" paddingLeft="2%" border="1px solid black">
        고등 영단어 학습을 위한 플랫폼
      </Text>


    </main>
  );
}
