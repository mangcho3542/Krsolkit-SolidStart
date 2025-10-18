import { ComponentProps } from "@/types/ComponentProps";
import { splitProps } from "@/utils/splitProps";
import { createEffect, createSignal, onMount } from "solid-js";
import { shuffle } from "@/utils/shuffle";

interface StudentTableProps extends Omit<ComponentProps, "children"> {
  row: number;
  column: number;
  TableColumnProps?: ComponentProps;
  TableProps?: ComponentProps;
  assignAry: boolean[];
  displayFlag?: boolean;
  trigger: boolean;
}

export default function StudentTable(props: StudentTableProps) {
  const [local, styling, other] = splitProps(props, [
    "row",
    "column",
    "TableColumnProps",
    "TableProps",
    "displayFlag",
    "trigger",
  ]);

  //실제 배치될 학생들의 이름(번호)
  const [content, setContent] = createSignal<string[][]>([[]]);

  //학생들 이름 가릴지 말지 정하는 flag
  const [displayFlag, setDisplayFlag] = createSignal(
    local.displayFlag ?? false
  );

  //local.trigger변할 때마다 자리 배치
  createEffect(() => {
    local.trigger;
    shuffle(content());
    setDisplayFlag(true);
  });

  onMount(() => {
    setDisplayFlag(false);
  });

  //props의 row, column이 변할 때마다 row, column 재설정
  createEffect(() => {
    setDisplayFlag(false);
    let res: string[][] = [];
    for (let i = 0; i < local.column; i++) {
      let ary: string[] = [];
      for (let j = 0; j < local.row; j++) {
        ary.push(`${i + 1 + 6 * j}번`);
      }

      res.push(ary);
    }

    setContent(res);
  });

  return (
    <div {...styling} {...other}>
      {Array.from({ length: local.column }, (_, i) => (
        <div {...local.TableColumnProps}>
          {Array.from({ length: local.row }, (_, j) => (
            <div {...local.TableProps}>{displayFlag() && content()[i][j]}</div>
          ))}
        </div>
      ))}
    </div>
  );
}