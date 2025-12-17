import {
  Highlight as ArkHighlight,
  HighlightProps as ArkHighlightProps,
} from "@ark-ui/solid";
import { splitProps } from "solid-js";

export interface HighlightProps extends Omit<ArkHighlightProps, "text"> {
  children: string;
}

export function Highlight(props: HighlightProps) {
  const [local, rest] = splitProps(props, ["query", "children"]);

  return (
    <ArkHighlight
      query={local.query}
      text={local.children}
      {...rest}
    />
  );
}

export default Highlight;
