import Slider from "@components/Slider";
import styles from "./test.module.css";

export default function test() {
  return (
    <div id={styles.Main}>
      <div id={styles.SliderWrapper}>
        <Slider 
        Label="라벨"
        />
      </div>
    </div>
  );
}