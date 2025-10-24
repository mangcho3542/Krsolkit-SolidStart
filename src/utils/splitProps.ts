// splitProps.ts
import { splitProps as solidSplitProps, type JSX } from "solid-js";

// Styling 타입
export interface Styling {
  style: JSX.CSSProperties;
  class: string;
  classList: JSX.HTMLAttributes<any>["classList"];
}

/* =========================
   1) 스타일 키/매핑
   ========================= */

const STYLE_KEYS = [
  // Box Model
  "width",
  "height",
  "minWidth",
  "maxWidth",
  "minHeight",
  "maxHeight",
  "padding",
  "paddingTop",
  "paddingBottom",
  "paddingRight",
  "paddingLeft",
  "margin",
  "marginTop",
  "marginBottom",
  "marginRight",
  "marginLeft",
  "boxSizing",

  // Border
  "border",
  "borderWidth",
  "borderStyle",
  "borderColor",
  "borderRadius",

  // Background (custom alias)
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
] as const;

type StyleKey = (typeof STYLE_KEYS)[number];

const ALIAS_MAP: Partial<Record<StyleKey, string>> = {
  // Background
  bgColor: "background-color",
  bgImage: "background-image",
  bgSize: "background-size",
  bgPosition: "background-position",
  bgRepeat: "background-repeat",
  bgAttachment: "background-attachment",

  // 오타 보정
  paddingRight: "padding-right",

  // 유지
  gridGap: "grid-gap",
};

const toKebabCase = (str: string) =>
  str.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase()).replace(/^ms-/, "-ms-");

/* =========================
   2) 유틸
   ========================= */

function parseStyleString(style?: string): Record<string, string> {
  const out: Record<string, string> = {};
  if (!style) return out;
  style.split(";").forEach((part) => {
    const [rawKey, ...rest] = part.split(":");
    if (!rawKey) return;
    const key = rawKey.trim();
    const value = rest.join(":").trim();
    if (!key || !value) return;
    out[key] = value;
  });
  return out;
}

function buildStyling<P extends Record<string, any>>(
  props: P,
  baseClass?: string
): Styling {
  const style: JSX.CSSProperties = {};

  // base style 병합 (string/object 모두 지원)
  const baseStyle = (props as any).style as
    | JSX.CSSProperties
    | string
    | undefined;
  if (typeof baseStyle === "string") {
    Object.assign(style, parseStyleString(baseStyle));
  } else if (baseStyle && typeof baseStyle === "object") {
    Object.assign(style, baseStyle);
  }

  // 커스텀 CSSProperties 키 -> kebab-case/별칭으로 주입
  for (const key of STYLE_KEYS) {
    const v = (props as any)[key];
    if (v == null) continue;
    const cssKey = ALIAS_MAP[key] ?? toKebabCase(String(key));
    (style as any)[cssKey] = v;
  }

  // class / className 합치기
  let cls = [(props as any).class, (props as any).className]
    .filter(Boolean)
    .join(" ")
    .trim();
  if (
    (props as any).useDefaultStyle !== undefined ||
    (props as any).useDefaultStyle
  ) {
    cls += " " + (baseClass ?? "");
    cls = cls.trim();
  }

  // classList 그대로
  const classList = (props as any)
    .classList as JSX.HTMLAttributes<any>["classList"];

  return { style, class: cls, classList };
}

/* =========================
   3) 타입 헬퍼
   ========================= */

type StylingKeys = StyleKey | "style" | "class" | "className" | "classList";

type GroupKeys<
  P,
  G extends readonly (readonly (keyof P)[])[]
> = G[number][number];

type FinalRest<P, G extends readonly (readonly (keyof P)[])[]> = Omit<
  P,
  GroupKeys<P, G> | StylingKeys
>;

/* =========================
   4) splitProps 구현 (오버로드 포함, 인자에 any 제거)
   ========================= */

// 오버로드: baseClass 없이 groups만 전달하는 경우
export function splitProps<
  P extends Record<string, any>,
  G extends readonly (readonly (keyof P)[])[]
>(
  props: P,
  ...groups: G
): [...{ [I in keyof G]: Pick<P, G[I][number]> }, Styling, FinalRest<P, G>];

// 오버로드: baseClass 포함하는 경우
export function splitProps<
  P extends Record<string, any>,
  G extends readonly (readonly (keyof P)[])[]
>(
  props: P,
  baseClass: string,
  ...groups: G
): [...{ [I in keyof G]: Pick<P, G[I][number]> }, Styling, FinalRest<P, G>];

// 실제 구현: 인자 타입은 구체적 제네릭 타입을 사용해서 any를 제거함
export function splitProps<
  P extends Record<string, any>,
  G extends readonly (readonly (keyof P)[])[]
>(
  props: P,
  baseClassOrGroup?: string | readonly (keyof P)[],
  ...restGroups: Array<readonly (keyof P)[]>
) {
  let baseClass: string | undefined;
  let groups: Array<readonly (keyof P)[]> = [];

  if (baseClassOrGroup === undefined) {
    // 호출: splitProps(props, ...groups)
    baseClass = undefined;
    groups = restGroups as any;
  } else if (typeof baseClassOrGroup === "string") {
    // 호출: splitProps(props, baseClass, ...groups)
    baseClass = baseClassOrGroup;
    groups = restGroups as any;
  } else if (Array.isArray(baseClassOrGroup)) {
    // 호출: splitProps(props, group1, group2...) (baseClass 생략)
    baseClass = undefined;
    groups = [baseClassOrGroup as any, ...(restGroups as any)];
  } else {
    // 안전망
    baseClass = undefined;
    groups = restGroups as any;
  }

  // solid-js의 splitProps에 props와 groups만 전달
  const solidResult = (solidSplitProps as any).apply(null, [
    props,
    ...groups,
  ]) as any[];

  const groupCount = groups.length;

  // 그룹들
  const pickedGroups = solidResult.slice(0, groupCount) as {
    [I in keyof typeof groups]: any;
  };

  // 초기 rest
  const initialRest = solidResult[groupCount] as Omit<
    P,
    GroupKeys<P, typeof groups>
  >;

  // 스타일링 생성 (props 기반으로, baseClass 전달)
  const styling = buildStyling(props, baseClass);

  // rest에서 style/class/커스텀 스타일 키 제거
  const {
    style: _style,
    class: _class,
    className: _className,
    classList: _classList,
    ...restDraft
  } = initialRest as any;

  for (const key of STYLE_KEYS) {
    if (key in restDraft) delete (restDraft as any)[key];
  }

  const rest = restDraft as FinalRest<P, typeof groups>;

  // 최종 반환: [...원래 그룹들, styling, rest]
  return [...(pickedGroups as any), styling, rest] as any;
}
