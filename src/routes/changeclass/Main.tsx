import styles from "./chageclass.module.css";
import QuestionImg from "@images/QuestionCircleIcon.svg?raw";
import { Slider, Dialog, Svg } from "@components";
import StudentTable from "./StudentTable";
import { createSignal } from "solid-js";
import DlgContent from "./DlgContent";

export default function Main() {
  const [col, setCol] = createSignal(5);
  const [row, setRow] = createSignal(6);
  const [trgRef, setTrgRef] = createSignal<HTMLButtonElement | undefined>();

  return (
    <>
      <header id={styles.Header}>자리 바꾸기</header>

      <div id={styles.QuestionBtnWrapper}>
        <button id={styles.QBtn} ref={setTrgRef}>
          <Svg value={QuestionImg} id={styles.QImg} />
        </button>
      </div>

      {/**Dialog */}
      <Dialog
        TrgRef={trgRef()}
        WrapperProps={{ id: styles.DlgWrapper }}
        TitleProps={{ id: styles.DlgTitle }}
        Title="자리 바꾸기"
        ContentProps={{ id: styles.DlgContent }}
        Content={<DlgContent />}
        id={styles.DlgRoot}
      />

      <div id={styles.SliderWrapper} style={{display: "flex", "flex-direction": "column"}}>
        <Slider
          step={1}
          defaultValue={[5]}
          min={1}
          max={10}
          class={styles.SliderRoot}
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
          Label="행의 수"
          onValueChange={(e) => {
            setRow(e.value[0]);
          }}
        />
      </div>

      <StudentTable class={styles.TableWrapper} column={col()} row={row()} />
    </>
  );
}