import { JSX, JSXElement } from "solid-js";
import { CssProperties } from "./CssProperties";

export interface ComponentProps
  extends Omit<JSX.HTMLAttributes<HTMLElement>, "style" | "ref" | "translate">,
    CssProperties {
  class?: string;
  classList?: { [k: string]: boolean | undefined };
  css?: CssProperties;
  children?: JSXElement;
}

export interface ComponentBaseProps {
  class?: string;
  classList?: { [k: string]: boolean | undefined };
  id?: string;
  css?: CssProperties;
  children?: JSXElement;
}

export interface ComponentBaseStyleProps {
  class?: string;
  classList?: { [k: string]: boolean | undefined };
  id?: string;
  style?: JSX.CSSProperties;
  children?: JSXElement;
}

export type PUS<T extends Omit<ComponentBaseStyleProps, "style">> = Omit<
  T,
  "style"
> & {
  useDefaultStyle?: boolean;
  style?: JSX.CSSProperties;
};
