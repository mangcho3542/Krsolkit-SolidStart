import { ComponentProps } from "@/types/ComponentProps";
import { splitProps } from "@/utils/splitProps";
import { createSignal, JSXElement } from "solid-js";
import { TupleType } from "@/types/Tuple";

interface StudentTableProps<
  R extends number,
  C extends number,
  Length extends number
> extends ComponentProps {
  row: R;
  column: C;
  TableRowProps?: ComponentProps;
  TableProps?: ComponentProps;
  values?: TupleType<string, Length>;
  children?: JSXElement;
}

export default function StudentTable<
  R extends number,
  C extends number,
  Length extends number
>(props: StudentTableProps<R, C, Length>) {
  const [local, styling, other] = splitProps(props, [
    "row",
    "column",
    "TableRowProps",
    "TableProps",
    "children",
  ]);

  const [cnt, setCnt] = createSignal(new Array(local.row * local.column));

  return <div {...styling} {...other}></div>;
}
