import Dialog from "@/components/Dialog";
import styles from "./test.module.css";
import Btn from "@components/Btn";
import { createSignal } from "solid-js";

export default function test() {
  const [open, setOpen] = createSignal<bool>(false);

  return (
    <main class="Main">
      <div id={styles.BtnWrapper}>
        <Btn id={styles.TrgBtn}>
          Open Dialog
        </Btn>
      </div>

      <Dialog class={styles.DialogRoot}

        />
    </main>
  );
}
