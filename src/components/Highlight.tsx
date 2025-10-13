import { Highlight as ArkHighlight, HighlightProps as ArkHighlightProps } 
from "@ark-ui/solid";
import { splitProps } from "solid-js";

export interface HighlightProps extends Omit<ArkHighlightProps, "text"> {
    children: string;
}

export function Highlight(props: HighlightProps) {
    const [local, style, rest] = splitProps(props, ["query", "children"], 
        ["class", "style"]);

    return (
        <ArkHighlight query={local.query} text={local.children} class={style.class} 
        {...rest} />
    )
}

export default Highlight;