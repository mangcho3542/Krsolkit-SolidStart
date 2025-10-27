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

  if (props.useDefaultStyle !== undefined && props.useDefaultStyle) {
    const obj = omit(props, ["useDefaultStyle"]);
    obj.classList = {
      ...(style.class ? {[style.class]: true}: {}),
      ...style.classList
    }
    return obj;
  }  
  else return omit(props, ["useDefaultStyle"]);
}