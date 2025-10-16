type sn = string | number;

export interface CSSProperties {
  // Box Model
  width?: sn;
  height?: sn;
  minWidth?: sn;
  maxWidth?: sn;
  minHeight?: sn;
  maxHeight?: sn;
  padding?: sn;
  paddingTop?: sn;
  paddingBottom?: sn;
  paddingRirhgt?: sn;
  paddingLeft?: sn;
  margin?: sn;
  marginTop?: sn;
  marginBottom?: sn;
  marginRight?: sn;
  marginLeft?: sn;
  boxSizing?: "content-box" | "border-box" | string;

  // Border
  border?: string;
  borderWidth?: sn;
  borderStyle?:
    | "solid"
    | "dashed"
    | "dotted"
    | "double"
    | "groove"
    | "ridge"
    | "inset"
    | "outset"
    | "none"
    | "hidden"
    | string;
  borderColor?: string;
  borderRadius?: sn;

  // Background
  bgColor?: string;
  bgImage?: string;
  bgSize?: "auto" | "cover" | "contain" | string;
  bgPosition?: string;
  bgRepeat?:
    | "repeat"
    | "repeat-x"
    | "repeat-y"
    | "no-repeat"
    | "space"
    | "round"
    | string;
  bgAttachment?: "scroll" | "fixed" | "local" | string;

  // Typography
  color?: string;
  fontSize?: sn;
  fontWeight?:
    | "normal"
    | "bold"
    | "bolder"
    | "lighter"
    | 100
    | 200
    | 300
    | 400
    | 500
    | 600
    | 700
    | 800
    | 900
    | number
    | string;
  fontStyle?: "normal" | "italic" | "oblique" | string;
  fontFamily?: string;
  lineHeight?: sn;
  letterSpacing?: sn;
  wordSpacing?: sn;
  textAlign?:
    | "left"
    | "right"
    | "center"
    | "justify"
    | "start"
    | "end"
    | string;
  textDecoration?: "none" | "underline" | "overline" | "line-through" | string;
  textTransform?: "none" | "capitalize" | "uppercase" | "lowercase" | string;
  whiteSpace?:
    | "normal"
    | "nowrap"
    | "pre"
    | "pre-wrap"
    | "pre-line"
    | "break-spaces"
    | string;
  wordBreak?: "normal" | "break-all" | "keep-all" | "break-word" | string;
  textOverflow?: "clip" | "ellipsis" | string;

  // Display & Position
  display?:
    | "block"
    | "inline"
    | "inline-block"
    | "flex"
    | "inline-flex"
    | "grid"
    | "inline-grid"
    | "none"
    | string;
  position?: "static" | "relative" | "absolute" | "fixed" | "sticky";
  top?: sn;
  right?: sn;
  bottom?: sn;
  left?: sn;
  zIndex?: number;

  // Flexbox
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  flexWrap?: "nowrap" | "wrap" | "wrap-reverse" | string;
  flex?: sn;
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: sn;
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  alignSelf?:
    | "auto"
    | "flex-start"
    | "flex-end"
    | "center"
    | "baseline"
    | "stretch"
    | string;
  gap?: sn;
  order?: number;

  // Grid
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gridColumn?: string;
  gridRow?: string;
  gridArea?: string;
  gridGap?: sn;

  // Visual Effects
  opacity?: number;
  boxShadow?: string;
  transform?: string;
  transition?: string;
  visibility?: "visible" | "hidden" | "collapse" | string;

  // Animation
  animation?: string;
  animationName?: string;
  animationDuration?: string;
  animationTimingFunction?:
    | "linear"
    | "ease"
    | "ease-in"
    | "ease-out"
    | "ease-in-out"
    | "step-start"
    | "step-end"
    | string;
  animationDelay?: string;
  animationIterationCount?: "infinite" | number | string;
  animationDirection?:
    | "normal"
    | "reverse"
    | "alternate"
    | "alternate-reverse"
    | string;
  animationFillMode?: "none" | "forwards" | "backwards" | "both" | string;
  animationPlayState?: "running" | "paused" | string;

  // Overflow & Scroll
  overflow?: "visible" | "hidden" | "scroll" | "auto" | "clip" | string;

  // User Interaction
  cursor?:
    | "auto"
    | "default"
    | "pointer"
    | "wait"
    | "text"
    | "move"
    | "help"
    | "not-allowed"
    | "none"
    | "context-menu"
    | "progress"
    | "cell"
    | "crosshair"
    | "vertical-text"
    | "alias"
    | "copy"
    | "no-drop"
    | "grab"
    | "grabbing"
    | "all-scroll"
    | "col-resize"
    | "row-resize"
    | "n-resize"
    | "e-resize"
    | "s-resize"
    | "w-resize"
    | "ne-resize"
    | "nw-resize"
    | "se-resize"
    | "sw-resize"
    | "ew-resize"
    | "ns-resize"
    | "nesw-resize"
    | "zoom-in"
    | "zoom-out"
    | string;
  pointerEvents?:
    | "auto"
    | "none"
    | "visiblePainted"
    | "visibleFill"
    | "visibleStroke"
    | "visible"
    | "painted"
    | "fill"
    | "stroke"
    | "all"
    | "inherit"
    | string;
  userSelect?: "none" | "auto" | "text" | "contain" | "all" | string;
  resize?:
    | "none"
    | "both"
    | "horizontal"
    | "vertical"
    | "block"
    | "inline"
    | string;

  // Outline
  outline?: string;
  outlineColor?: string;
  outlineStyle?: string;
  outlineWidth?: sn;
  outlineOffset?: sn;

  // Object
  objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down" | string;
  objectPosition?: string;
}
