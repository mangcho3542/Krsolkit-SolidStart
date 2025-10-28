import Dialog from "@/components/Dialog";
import styles from "./test.module.css";
import Btn from "@components/Btn";
import { createSignal } from "solid-js";

export default function test() {
  const [open, setOpen] = createSignal<bool>(false);

  return (
    <main class="Main" id={styles.Main}>
      <div id={styles.BtnWrapper}>
        <Btn id={styles.TrgBtn} onClick={() => {setOpen(true)}}>
          Open Dialog
        </Btn>
      </div>

      <Dialog id={styles.DialogRoot}
      Title="타이틀"
      DescProps={{id: styles.DialogDesc}}
      Desc="설명"
      ContentProps={{id: styles.DialogContent}}
      Content="콘텐트"
      open={open()}
      onClose={() => {setOpen(false);}}
      />
    </main>
  );
}
