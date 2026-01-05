import styles from "./chageclass.module.css";
import QuestionImg from "@images/QuestionCircleIcon.svg?raw";
import { Slider, Dialog, Svg } from "@components";
import StudentTable from "./StudentTable";
import { createSignal } from "solid-js";
import DlgBody from "./DlgContent";

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
        TrgRef={trgRef}
        TitleProps={{ id: styles.DlgTitle }}
        Title="자리 바꾸기"
        BodyProps={{ id: styles.DlgBody }}
        Body={<DlgBody />}
        id={styles.DlgRoot}
      />

      <div id={styles.SliderWrapper} style={{display: "flex", "flex-direction": "column"}}>
        <Slider
          step={1}
          defaultValue={5}
          min={1}
          max={10}
          class={styles.SliderRoot}
          Label="분단 수"
          onValueChange={(e) => {
            setCol(e.valueAsNumber);
          }}
          useValueText
        />

        <Slider
          step={1}
          defaultValue={6}
          min={1}
          max={10}
          class={styles.SliderRoot}
          Label="행의 수"
          onValueChange={(e) => {
            setRow(e.valueAsNumber);
          }}
          useValueText
        />
      </div>

      <StudentTable class={styles.TableWrapper} column={col()} row={row()} />
    </>
  );
}