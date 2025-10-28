import { CssProperties } from "@/types/CssProperties";
import { convertCss } from "@/utils/converCss";
import {
  Highlight as ArkHighlight,
  HighlightProps as ArkHighlightProps,
} from "@ark-ui/solid";
import { splitProps } from "solid-js";

export interface HighlightProps extends Omit<ArkHighlightProps, "text"> {
  children: string;
  css?: CssProperties
}

export function Highlight(props: HighlightProps) {
  const [local, rest] = splitProps(props, ["query", "children", "css"]);

  return (
    <ArkHighlight
      query={local.query}
      text={local.children}
      style={convertCss(local.css)}
      {...rest}
    />
  );
}

export default Highlight;
