import { ComponentBaseStyleProps } from "@/types/ComponentProps";

interface I extends Omit<ComponentBaseStyleProps, "children"> {
  useDefaultStyle?: boolean;
  [k: string]: any;
}

export function splitComponentProps(
  props: I | undefined,
  defaultClass: string | undefined
): typeof props {
  if (!props) {
    return defaultClass ? { class: defaultClass } : {};
  }

  const res = {
    class:
      (props.class !== undefined ? props.class + " " : "") +
      (props.useDefaultStyle === undefined || props.useDefaultStyle === true
        ? defaultClass ?? ""
        : ""),
    ...(props.id && { id: props.id }),
    ...(props.classList && { classList: props.classList }),
    ...(props.style && { style: props.style }),
  };

  return res;
}