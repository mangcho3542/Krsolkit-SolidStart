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

export type DivProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, "style"> & {
  style?: JSX.CSSProperties;
};
export type ParagraphProps = Omit<JSX.HTMLAttributes<HTMLParagraphElement>, "style"> & {
  style?: JSX.CSSProperties;
};
export type SpanProps = Omit<JSX.HTMLAttributes<HTMLSpanElement>, "style"> & {
  style?: JSX.CSSProperties;
};
export type ButtonProps = Omit<JSX.HTMLAttributes<HTMLButtonElement>, "style"> & {
  style?: JSX.CSSProperties;
}