import { ComponentProps } from "@/types/ComponentProps";
import { splitProps } from "@/utils/splitProps";
import { createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { shuffle } from "@/utils/shuffle";
import styles from "./chageclass.module.css";
import Btn from "@components/Btn";

interface StudentTableProps extends Omit<ComponentProps, "children"> {
  row: number;
  column: number;
}

export default function StudentTable(props: StudentTableProps) {
  const [local, styling, other] = splitProps(props, ["row", "column"]);

  //실제 배치될 학생들의 이름(번호)
  const [content, setContent] = createStore<string[][]>(
    Array.from({ length: local.column }, () =>
      Array.from({ length: local.row }, () => "")
    )
  );

  //실제 배치될 학생들의 수
  const [num, setNum] = createSignal<number>(local.column * local.row);

  //배치될지 말지 결정하는 signal
  const [isAssignable, setIsAssignable] = createStore<boolean[][]>(
    Array.from({ length: local.column }, () =>
      Array.from({ length: local.row }, () => true)
    )
  );

  //보여줄지 말지 결정하는 signal
  const [canShow, setCanShow] = createSignal(false);

  //effect
  //row, column변할때마다 canShow, isAssignable, conent 업데이트
  createEffect(() => {
    local.row;
    local.column;
    setCanShow(false);
    updateAssignable();
  });

  createEffect(() => {
    setNum(local.column * local.row);
  });

  //function
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
    setNum((n) => (isAssignable[i]?.[j] ? n + 1 : n - 1));
  }

  //자리 배치하는 함수
  function handleBtnClick() {
    let tmpAry: string[] = [];
    let tmpStr = "";
    for (let i = 0; i < num(); i++) {
      tmpAry[i] = `${i + 1}번`;
      tmpStr += `${i + 1}번 `;
    }

    console.log(tmpStr);

    tmpAry = shuffle(tmpAry);

    let k = 0;
    for (let i = 0; i < local.column; i++) {
      for (let j = 0; j < local.row; j++) {

        //isAssignable[i][j]가 false라면 ""
        if (!isAssignable[i][j]) {
          setContent(i, j, "");
        }
        
        //isAssignable[i][j]가 true라면 번호 배치
        else {
          setContent(i, j, tmpAry[k]);
          k++;
        }
      }
    }

    //canShow true로 설정해서 보여주기
    setCanShow(true);
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
