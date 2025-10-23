import { ComponentProps } from "@/types/ComponentProps";
import { splitProps } from "@/utils/splitProps";
import { createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { shuffle } from "@/utils/shuffle";
import { place } from "./place"; 
import styles from "./chageclass.module.css";
import Btn from "@components/Btn";

interface StudentTableProps extends Omit<ComponentProps, "children"> {
  row: number;
  column: number;
}

export default function StudentTable(props: StudentTableProps) {
  const [local, styling, other] = splitProps(props, ["row", "column"]);

  //실제 배치될 학생들의 이름(번호)
  const [content, setContent] = createStore<string[][]>([]);

  //실제 배치될 학생들의 수
  const [num, setNum] = createSignal<number>(local.column * local.row);

  //배치될지 말지 결정하는 signal
  const [isAssignable, setIsAssignable] = createStore<boolean[][]>(
    new Array<boolean[]>(local.column).fill(
      new Array<boolean>(local.row).fill(true)
    )
  );

  //보여줄지 말지 결정하는 signal
  const [canShow, setCanShow] = createSignal(false);

  //effect
  //row, column변할때마다 canShow, isAssignable, conent 업데이트
  createEffect(() => {
    setCanShow(false);
    updateContent();
    updateAssignable();
    setNum(local.column * local.row);
  });

  //function
  //row, column변할 때마다 content 재생성하는 함수
  function updateContent() {
    let cnt = 1;
    let res: string[][] = [];
    for(let i = 0; i < local.column; i++) {
      let ary: string[] = [];
      for(let j = 0; j < local.row; j++) {
        if(cnt <= num()) {ary.push(`${cnt}번`); cnt++;}
        else {ary.push("")}
      }
      res.push(ary);
    }

    setContent(res);
  }

  //row, column 변할 때마다 isAssignable 재생성 하는 함수
  function updateAssignable() {
    setIsAssignable(
      Array.from({ length: local.column }, (_1, _2) =>
        Array.from({ length: local.row }, (_3, _4) => true)
      )
    );
  }

  //클릭될 때마다 isAssignable 바꿔줄 함수
  function changeIsAssignable(i: number, j: number) {
    setIsAssignable(i, j, (v) => !v);
    setNum((n) => n-1);
  }

  //자리 배치하는 함수
  function handleBtnClick() {
    setCanShow(true);
    let t: string[] = [];
    for(let row of content) {
      for(let s of row) {
        t.push(s);
      }
    }

    t = shuffle(t);
    console.log("shuffle한 결과 : ", t);
    setContent(place(t, isAssignable));
    console.log(t);
  }

  return (
    <>
      <div id={styles.BtnWrapper}>
        <Btn class={styles.Btn} onClick={handleBtnClick}>
          자리 배치하기
        </Btn>
      </div>

      <div {...styling} {...other}>
        {Array.from({ length: local.column }, (_1, i) => (
          <div
            class={styles.TableColumn}
            style={{
              width: `${100 / (local.column + 1)}%`,
            }}
          >
            {Array.from({ length: local.row }, (_2, j) => (
              <div
                class={
                  styles.Table +
                  " " +
                  (isAssignable[i]?.[j]
                    ? styles.AvailTable
                    : styles.UnavailTable)
                }
                onClick={() => {
                  changeIsAssignable(i, j);
                }}
              >
                {canShow() && isAssignable[i]?.[j] && content[i][j]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
