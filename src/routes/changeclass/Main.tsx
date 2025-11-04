import styles from "./chageclass.module.css"
import QuestionImg from "@images/QuestionCircleIcon.svg?raw";
import Stack from "@components/Stack";
import Slider from "@components/Slider";
import StudentTable from "./StudentTable";
import { createSignal } from "solid-js";
import Dialog from "@/components/Dialog";
import DlgContent from "./DlgContent";
import Svg from "@/components/Svg";

export default function Main() {
  const [col, setCol] = createSignal(5);
  const [row, setRow] = createSignal(6);
  const [trgRef, setTrgRef] = createSignal<HTMLButtonElement | undefined>();

  return (
    <main class="Main" id={styles.Main}>
      <header id={styles.Header}>자리 바꾸기</header>

      <div id={styles.QuestionBtnWrapper}>
        <button id={styles.QBtn} ref={setTrgRef}>
          <Svg value={QuestionImg} id={styles.QImg} />
        </button>
      </div>


      {/**Dialog */}
      <Dialog
        TrgRef={trgRef()}
        TitleProps={{ id: styles.DlgTitle }}
        Title="자리 바꾸기"
        ContentProps={{ id: styles.DlgContent }}
        Content={<DlgContent />}
        id={styles.DlgRoot}
      />

      <Stack id={styles.SliderWrapper}>
        <Slider
          step={1}
          defaultValue={[5]}
          min={1}
          max={10}
          class={styles.SliderRoot}
          ControlProps={{ class: styles.SliderControl}}
          Label="분단 수"
          onValueChange={(e) => {
            setCol(e.value[0]);
          }}
        />

        <Slider
          step={1}
          defaultValue={[6]}
          min={1}
          max={10}
          class={styles.SliderRoot}
          ControlProps={{ class: styles.SliderControl }}
          Label="행의 수"
          onValueChange={(e) => {
            setRow(e.value[0]);
          }}
        />
      </Stack>

      <StudentTable class={styles.TableWrapper} column={col()} row={row()} />
    </main>
  );
}