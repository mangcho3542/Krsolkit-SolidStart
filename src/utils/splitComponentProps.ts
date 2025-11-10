import { ComponentBaseStyleProps } from "@/types/ComponentProps";

interface I extends Omit<ComponentBaseStyleProps, "children"> {
  useDefaultStyle?: boolean;
  [k: string]: any;
}

export function splitComponentProps<T extends I>(
  props: T | undefined,
  defaultClass?: string
): Partial<T> {
  if (!props) {
    return (defaultClass ? { class: defaultClass } : {}) as Partial<T>;
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
