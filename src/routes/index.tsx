import { Title } from "@solidjs/meta";
import Text from "@components/Text";
import styles from "./index.module.css";
import { onMount } from "solid-js";

export default function Home() {
  onMount(() => {
    console.log("userAgent\n", navigator.userAgent);
    console.log("deviceWidth: ", window.screen.width);
    console.log("deviceHeight: ", window.screen.height);
  });

  return (
    <main id={styles.Main}>
      <Title>ClassHelper</Title>

      <Text id={styles.MainText}>
        ClassHelper
      </Text>

      <Text fontSize="2.5rem" paddingLeft="2%"
      margin={0}
      >
        고등 영단어 학습을 위한 플랫폼
      </Text>


    </main>
  );
}
