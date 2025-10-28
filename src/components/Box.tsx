import { ComponentProps } from "@/types/ComponentProps";
import { convertCss } from "@/utils/converCss";
import { splitProps } from "solid-js";

export default function Box(props: ComponentProps) {
  const [local, rest] = splitProps(props, ["css", "children"]);

  return (
    <div {...rest} style={convertCss(local.css)}>
      {local.children}
    </div>
  );
}
