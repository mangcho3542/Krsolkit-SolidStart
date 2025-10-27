import { JSX, JSXElement } from "solid-js";
import { CSSProperties } from "./CSSProperties";

export interface ComponentProps
  extends Omit<JSX.HTMLAttributes<HTMLElement>, "style" | "ref">,
    CSSProperties {
  class?: string;
  classList?: { [k: string]: boolean | undefined };
  children?: JSXElement;
}

export interface ComponentBaseProps {
  class?: string;
  classList?: { [k: string]: boolean | undefined };
  id?: string;
  style?: JSX.CSSProperties | string;
}