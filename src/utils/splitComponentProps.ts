// splitComponentProps.ts
import {
  ComponentBaseProps,
  ComponentBaseStyleProps,
} from "@/types/ComponentProps";
import { splitProps } from "solid-js";
import { JSX } from "solid-js";
import { convertCss } from "./converCss";

interface BaseProps extends ComponentBaseStyleProps {
  useDefaultStyle?: boolean;
  stlye?: JSX.CSSProperties;
  [k: string]: any;
}

interface BaseStyleProps extends ComponentBaseProps {
  useDefaultStyle?: boolean;
  [k: string]: any;
}

/**
 * 반환값은 원본을 건드리지 않는 새 객체입니다.
 * 기본 클래스(defaultClass)를 기존 class/className/classList에 병합하여 `class` 문자열로 만든 뒤 반환.
 */
export function splitComponentProps<T extends BaseProps>(
  props?: T,
  defaultClass?: string
): ComponentBaseStyleProps {
  if (!props) return { class: defaultClass } as ComponentBaseProps;
  const [res, rest] = splitProps(props, [
    "class",
    "id",
    "clasList",
    "children",
  ]) as [
    ComponentBaseStyleProps,
    Omit<BaseStyleProps, "class" | "id" | "classList" | "children">
  ];

  res.style = convertCss(rest.css);
  if (rest.useDefaultStyle === undefined)
    res.class += " " + (defaultClass ?? "");
  else {
    res.class += " " + (rest.useDefaultStyle ? defaultClass ?? "" : "");
  }

  delete rest.css;
  delete rest.useDefaultStyle;

  return {...res, ...rest};
}

export default splitComponentProps;