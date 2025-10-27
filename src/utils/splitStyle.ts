import { ComponentProps } from "@/types/ComponentProps";
import { omit } from "./object";
import { JSX, mergeProps } from "solid-js";

interface SplitStyleProps extends StyleI {
  useDefaultStyle?: boolean;
  [k: string]: any;
}

interface StyleI extends Pick<ComponentProps, "class" | "classList" | "id"> {
  style?: JSX.CSSProperties;
}

export function splitStyle(props: SplitStyleProps, style: StyleI) {
  if (props.useDefaultStyle !== undefined && props.useDefaultStyle) {
    const obj = omit(props, ["useDefaultStyle"]);
    obj.classList = {
      ...(style.class ? {[style.class]: true}: {}),
      ...style.classList
    }
    obj.style = mergeProps(props.style, style.style);
    return obj;
  }  
  else return omit(props, ["useDefaultStyle"]);
}