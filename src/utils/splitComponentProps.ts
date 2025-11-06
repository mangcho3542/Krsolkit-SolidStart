import { ComponentBaseStyleProps } from "@/types/ComponentProps";

interface I extends Omit<ComponentBaseStyleProps, "children"> {
  useDefaultStyle?: boolean;
  [k: string]: any;
}

export function splitComponentProps(
  props: I | undefined,
  defaultClass: string
): typeof props {
  if (!props) {
    console.log("defaultClass return함.");
    console.log("defaultClass : ", defaultClass);
    return { class: defaultClass };
  }

  const res = {
    class:
      (props.class ? props.class + " " : "") + props.useDefaultStyle ===
        undefined || true
        ? defaultClass
        : "",
    id: props.id ?? "",
    classList: props.classList ?? {},
    style: props.style ?? {},
  };

  console.log(res);
  return res;
}