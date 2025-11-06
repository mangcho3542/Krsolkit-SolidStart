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
    return defaultClass ? {class: defaultClass} : {}
  }

  const res = {
    class:
      (props.class ? props.class + " " : "") + props.useDefaultStyle ===
        undefined || true
        ? (defaultClass ?? "")
        : "",
    id: props.id ?? "",
    classList: props.classList ?? {},
    style: props.style ?? {},
  };

  return res;
}