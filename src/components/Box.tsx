import { ComponentProps } from "@/types/ComponentProps";
import { CssProperties } from "@/types/CssProperties";
import { convertCss } from "@/utils/converCss";
import { splitProps } from "solid-js";

export interface BoxProps extends ComponentProps {
  css?: CssProperties;
}

export default function Box(props: BoxProps) {
  const [local, rest] = splitProps(props, ["children", "css"]);

  return (
    <div {...rest} style={convertCss(local.css)}>
      {local.children}
    </div>
  );
}