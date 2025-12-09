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

export type StyleT<T> = T & {
  style?: JSX.CSSProperties;
}

export type DivProps = StyleT<Omit<JSX.HTMLAttributes<HTMLDivElement>, "style">>;
export type ParagraphProps = StyleT<Omit<JSX.HTMLAttributes<HTMLParagraphElement>, "style">>;
export type SpanProps = StyleT<Omit<JSX.HTMLAttributes<HTMLSpanElement>, "style">>;
export type ButtonProps = StyleT<Omit<JSX.HTMLAttributes<HTMLButtonElement>, "style">>;
export type DialogProps = StyleT<Omit<JSX.HTMLAttributes<HTMLDialogElement>, "style">>;
export type ImageProps= StyleT<Omit<JSX.HTMLAttributes<HTMLImageElement>, "style">>;