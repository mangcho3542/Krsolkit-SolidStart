import { ComponentProps } from "@/types/ComponentProps";
import { omit } from "./object";

interface SplitStyleProps extends StyleI {
  useDefaultStyle?: boolean;
  [k: string]: any;
}

interface StyleI extends Pick<ComponentProps, "class" | "classList" | "id"> {}

export function splitStyle(props: SplitStyleProps, style: StyleI) {
  if (props.useDefaultStyle !== undefined && props.useDefaultStyle)
    return {
      ...omit(props, ["useDefaultStyle", "class"]),
      ...style,
    };
  else return omit(props, ["useDefaultStyle"]);
}