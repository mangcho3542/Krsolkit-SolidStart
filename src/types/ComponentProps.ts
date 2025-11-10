import { JSX, JSXElement } from "solid-js";

export interface ComponentProps {
  class?: string;
  classList?: { [k: string]: boolean | undefined };
  id?: string;
  style?: JSX.CSSProperties;
  children?: JSXElement;
}

export type PUS<T extends Omit<ComponentProps, "style">> = Omit<
  T,
  "style"
> & {
  useDefaultStyle?: boolean;
  style?: JSX.CSSProperties;
};
