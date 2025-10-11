import { JSX } from "solid-js/h/jsx-runtime";
import { CSSProperties } from "@/types/CSSProperties";

export type StyleAndRest<T> = {
  style: JSX.CSSProperties;
  rest: Omit<T, keyof CSSProperties>;
};

export function splitProps<T extends Record<string, any>>(
  props: T
): StyleAndRest<T> {
  const style: JSX.CSSProperties = {};
  const rest: Record<string, any> = {};

  // 런타임에서 검사할 CSS 키 배열 (CSSProperties의 키들과 일치해야 함)
  const cssKeys = new Set<string>([
    // Box Model
    "width",
    "height",
    "minWidth",
    "maxWidth",
    "minHeight",
    "maxHeight",
    "padding",
    "margin",
    "boxSizing",
    // Border
    "border",
    "borderWidth",
    "borderStyle",
    "borderColor",
    "borderRadius",
    // Background (custom keys 포함 — 나중에 mapping)
    "bgColor",
    "bgImage",
    "bgSize",
    "bgPosition",
    "bgRepeat",
    "bgAttachment",
    // Typography
    "color",
    "fontSize",
    "fontWeight",
    "fontStyle",
    "fontFamily",
    "lineHeight",
    "letterSpacing",
    "wordSpacing",
    "textAlign",
    "textDecoration",
    "textTransform",
    "whiteSpace",
    "wordBreak",
    "textOverflow",
    // Display & Position
    "display",
    "position",
    "top",
    "right",
    "bottom",
    "left",
    "zIndex",
    // Flexbox
    "flexDirection",
    "flexWrap",
    "flex",
    "flexGrow",
    "flexShrink",
    "flexBasis",
    "justifyContent",
    "alignItems",
    "alignSelf",
    "gap",
    "order",
    // Grid
    "gridTemplateColumns",
    "gridTemplateRows",
    "gridColumn",
    "gridRow",
    "gridArea",
    "gridGap",
    // Visual Effects
    "opacity",
    "boxShadow",
    "transform",
    "transition",
    "visibility",
    // Animation
    "animation",
    "animationName",
    "animationDuration",
    "animationTimingFunction",
    "animationDelay",
    "animationIterationCount",
    "animationDirection",
    "animationFillMode",
    "animationPlayState",
    // Overflow & Scroll
    "overflow",
    // User Interaction
    "cursor",
    "pointerEvents",
    "userSelect",
    "resize",
    // Outline
    "outline",
    "outlineColor",
    "outlineStyle",
    "outlineWidth",
    "outlineOffset",
    // Object
    "objectFit",
    "objectPosition",
  ]);

  // 커스텀 키 -> JSX.CSSProperties 키 매핑
  const map: Record<string, keyof JSX.CSSProperties> = {
    bgColor: "background-color",
    bgImage: "background-image",
    bgSize: "background-size",
    bgPosition: "background-position",
    bgRepeat: "background-repeat",
    bgAttachment: "background-attachment",
    gridGap: "grid-gap"
  };

  for (const key of Object.keys(props)) {
    const val = (props as any)[key];

    if (cssKeys.has(key)) {
      const cssName = map[key] ?? key;
      style[cssName] = val;
    } else {
      rest[key] = val;
    }
  }

  return { style, rest } as StyleAndRest<T>;
}

export default splitProps;