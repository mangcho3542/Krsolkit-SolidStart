import styles from "./test.module.css";
import PasswordInput from "@/components/PasswordInput"

export default function test() {
  return (
    <main class="Main">
      <div id={styles.PiWrapper}>
        <PasswordInput />
      </div>
    </main>
  )
}