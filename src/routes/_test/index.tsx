import Dialog from "@/components/Dialog";
import styles from "./test.module.css";
import Btn from "@components/Btn";
import { createEffect, createSignal, onCleanup } from "solid-js";

export default function test() {
  const [TrgRef, setTrgRef] = createSignal<HTMLButtonElement | undefined>(undefined);

  createEffect(() => {
    if(!TrgRef()) return;
    function handler() {console.log("클릭됨\nTrgRef\n", TrgRef());}

    TrgRef()!.addEventListener("click", handler);
    onCleanup(() => {
      TrgRef()!.removeEventListener("click", handler);
    })
  });

  return (
    <main class="Main" id={styles.Main}>
      <div id={styles.BtnWrapper}>
        <Btn id={styles.TrgBtn} ref={setTrgRef}>
          Open Dialog
        </Btn>
      </div>

      <Dialog
        id={styles.DialogRoot}
        Title="타이틀"
        DescProps={{ id: styles.DialogDesc }}
        Desc="설명"
        ContentProps={{ id: styles.DialogContent }}
        Content="콘텐트"
        TrgRef={TrgRef()}
      />
    </main>
  );
}
