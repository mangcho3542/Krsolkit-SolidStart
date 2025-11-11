import { ComponentProps } from "@/types/ComponentProps";

type T = Omit<ComponentProps, "children"> & {
  useDefaultStyle?: boolean;
  [key: string]: any;
}

export function splitComponentProps(
  props: T | undefined,
  defaultClass?: string
): T {
  if (!props) {
    return (defaultClass ? { class: defaultClass } : {});
  }

  const { id, class: cls, classList, style, useDefaultStyle, ...rest } = props;
  const mergedClass = [cls, useDefaultStyle ?? true ? defaultClass : undefined]
    .filter(Boolean)
    .join(" ")
    .trim();

  return {
    ...rest,
    ...(id !== undefined ? { id } : {}),
    ...(classList !== undefined ? { classList } : {}),
    ...(style !== undefined ? { style } : {}),
    ...(mergedClass ? { class: mergedClass } : {}),
  }
}
