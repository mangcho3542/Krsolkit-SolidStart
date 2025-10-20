import { ComponentProps } from "@/types/ComponentProps";
import { splitProps } from "@/utils/splitProps";
import { createEffect, createSignal, onMount } from "solid-js";
import { shuffleMultiple } from "@/utils/shuffle";
import styles from "./chageclass.module.css";
import Btn from "@components/Btn";

interface StudentTableProps extends Omit<ComponentProps, "children"> {
  row: number;
  column: number;
}

export default function StudentTable(props: StudentTableProps) {
  const [local, styling, other] = splitProps(props, ["row", "column"]);

  //실제 배치될 학생들의 이름(번호)
  const [content, setContent] = createSignal<string[][]>([]);

  //배치될지 말지 결정하는 signal
  const [isAssignable, setIsAssignable] = createSignal<boolean[][]>(
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
  });

  //function
  //row, column변할 때마다 content 재생성하는 함수
  function updateContent() {
    let res: string[][] = [];
    for (let i = 0; i < local.column; i++) {
      let ary: string[] = [];
      for (let j = 0; j < local.row; j++) {
        ary.push(`${i + 1 + 6 * j}번`);
      }

      res.push(ary);
    }

    setContent(res);
  }

  //row, column 변할 때마다 isAssignable 재생성 하는 함수
  function updateAssignable() {
    const res = new Array<boolean[]>(local.column).fill(
      new Array<boolean>(local.row).fill(true)
    );
    setIsAssignable(res);
  }

  //클릭될 때마다 isAssignable 바꿔줄 함수
  function changeIsAssignable(i: number, j: number) {
    setIsAssignable((asg) => {
      asg[i][j] = !asg[i][j];
      return asg;
    });
  }

  //자리 배치하는 함수
  function handleBtnClick() {
    setCanShow(true);
    shuffleMultiple(content());
    setContent([...content()]);
  }

  return (
    <>
      <div id={styles.BtnWrapper}>
        <Btn class={styles.Btn} onClick={handleBtnClick}>
          자리 배치하기
        </Btn>
      </div>

      <div {...styling} {...other}>
        {Array.from({ length: local.column }, (_, i) => (
          <div class={styles.TableColumn} 
          style={{
            width: `${100 / (local.column + 1)}px`
            
          }}>
            {Array.from({ length: local.row }, (_, j) => (
              <div
                class={
                  styles.Table +
                  " " +
                  (isAssignable()[i][j] ? "AvailTable" : "UnavailTable")
                }
                onClick={() => {
                  changeIsAssignable(i, j);
                }}
              >
                {canShow() && isAssignable()[i][j] && content()[i][j]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
