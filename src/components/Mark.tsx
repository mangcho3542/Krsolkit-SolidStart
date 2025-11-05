import { ComponentBaseStyleProps } from "@/types/ComponentProps";
import { createMemo, splitProps } from "solid-js";
import styles from "@styles/Mark.module.css";
import { splitComponentProps } from "@/utils/splitComponentProps";

export interface MarkProps extends ComponentBaseStyleProps {
  color?: string;
  bgColor?: string;
  useDefaultStyle?: boolean;
}

export function Mark(props: MarkProps) {
  const [local, rest] = splitProps(props, [
    "color",
    "bgColor",
    "style",
    "children",
  ]);

  const style = createMemo(() => {
    return {
      ...local.style,
      ...(local.color && { color: local.color }),
      ...(local.bgColor
        ? { "background-color": local.bgColor }
        : rest.useDefaultStyle
        ? { "background-color": "#D1FAFF" }
        : {})
    };
  });

  return (
    <mark style={style()} {...splitComponentProps(rest, styles.Mark)}>
      {local.children}
    </mark>
  );
}

export default Mark;