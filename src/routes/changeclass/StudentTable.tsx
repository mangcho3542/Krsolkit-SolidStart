import { ComponentProps } from "@/types/ComponentProps";
import { splitProps } from "@/utils/splitProps";
import { createEffect, createSignal, JSXElement } from "solid-js";
import { TupleType } from "@/types/Tuple";

interface StudentTableProps extends ComponentProps {
  row: number;
  column: number;
  TableColumnProps?: ComponentProps;
  TableProps?: ComponentProps;
  children?: JSXElement;
  assignAry: boolean[];
}

export default function StudentTable(props: StudentTableProps) {
  const [local, styling, other] = splitProps(props, [
    "row",
    "column",
    "TableColumnProps",
    "TableProps",
    "children",
  ]);

  const [content, setContent] = createSignal([[]]);

  createEffect(() => {
    for(let i = 0; i < local.row; i++) {
      let ary: number[] = [];
      for(let j = 0; j < local.column; j++) {
        ary.push()
      }
    }
  })

  return (
  <div {...styling} {...other}>
    {Array.from({length: local.row}, (_, i) => (
      <div {...local.TableColumnProps}>
        {Array.from({length: local.column}, (_, j) => (
          <div {...local.TableProps}>
          </div>
        ))}
      </div>
    ))}
  </div>
  );
}
