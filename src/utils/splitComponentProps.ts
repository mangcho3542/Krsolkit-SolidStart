import { ComponentBaseStyleProps } from "@/types/ComponentProps";

interface I extends ComponentBaseStyleProps {
  useDefaultStyle?: boolean;
  [k: string]: any;
}

export function splitComponentProps<T extends I>(
  props: I | undefined,
  defaultClass: string
): typeof props {
  if(!props) return {};

  const { useDefaultStyle = true, class: cls, ...rest } = props;

  const combined = [cls, useDefaultStyle ? defaultClass : ""]
    .filter(Boolean)
    .join(" ")
    .trim();

  return {
    ...rest,
    class: combined,
  } as T;
}