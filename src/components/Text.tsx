import { ComponentProps } from "@/types/ComponentProps";
import { convertCss } from "@/utils/converCss";
import { splitProps, createMemo } from "solid-js";

export default function Text(props: ComponentProps) {
  const [local, rest] = splitProps(props, ["css", "children"]);

  const style = createMemo(() => convertCss(local.css));
  return (
    <p
      style={style()}
      {...rest}
    >
      {local.children}
    </p>
  );
}
