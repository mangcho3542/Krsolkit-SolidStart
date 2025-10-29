import styles from "@styles/Stack.module.css";
import { ComponentProps } from "@/types/ComponentProps";
import { createMemo, splitProps } from "solid-js";
import { convertCss } from "@/utils/converCss";

export interface StackProps extends ComponentProps {
  useDefaultStyle?: boolean;
}

export default function Stack(props: StackProps) {
  const [local, rest] = splitProps(props, ["children", "useDefaultStyle", "class", "classList", "id", "css"]);

  const style = createMemo(() => convertCss(local.css));
  return (
    <div
      class={local.class}
      classList={{
          [styles.Stack]: local.useDefaultStyle === undefined
          ? true
          : local.useDefaultStyle
      }}
      style={{
        "flex-direction": style()["flex-direction"] ?? "column",
        ...style()
      }}
      id={local.id}
      {...rest}
    >
      {local.children}
    </div>
  );
}
