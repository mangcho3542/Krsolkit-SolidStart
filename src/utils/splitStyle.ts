import { ComponentProps } from "@/types/ComponentProps";
import { omit } from "./object";
import { JSX } from "solid-js";

interface SplitStyleProps extends StyleI {
  useDefaultStyle?: boolean;
  [k: string]: any;
}

interface StyleI extends Pick<ComponentProps, "class" | "classList" | "id"> {
  style?: string | JSX.CSSProperties;
}

export function splitStyle(props: SplitStyleProps | undefined, style: StyleI) {
  if(!props) return style;

  return {
    ...omit(props, ["classList"]),
    classList: {
      ...props.classList,
      [style.class ?? ""]: props.useDefaultStyle === undefined ? true : props.useDefaultStyle
    }
  }
}