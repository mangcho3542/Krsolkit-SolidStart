import { ComponentProps } from "@/types/ComponentProps";
import { splitProps } from "@/utils/splitProps";
import { mergeProps, JSX } from "solid-js";

export default function Btn(props: ComponentProps): JSX.Element {
  const [local, styling, others] = splitProps(props, ["children"]);

  const defaultStyle: JSX.CSSProperties = {
    // Display & Layout
    display: "inline-flex",
    "align-items": "center",
    "justify-content": "center",
    "align-self": "auto",
    position: "relative",
    isolation: "isolate",

    // Box Model
    "min-width": "40px",
    "min-height": "40px",
    height: "40px",
    "padding-left": "16px",
    "padding-right": "16px",
    "box-sizing": "border-box",

    // Border
    "border-width": "1px",
    "border-style": "solid",
    "border-color": "rgba(0, 0, 0, 0)",
    "border-radius": "4px",

    // Background
    "background-color": "rgb(24, 24, 27)",
    "background-clip": "border-box",

    // Typography
    "font-family": 'Inter, "Inter Fallback"',
    "font-size": "14px",
    "font-weight": "500",
    "line-height": "20px",
    "text-align": "center",
    "white-space": "nowrap",
    "text-decoration": "none",
    color: "rgb(255, 255, 255)",

    // Interaction
    cursor: "pointer",
    "user-select": "none",

    // Spacing
    gap: "8px",
    "column-gap": "8px",
    "row-gap": "8px",

    // Effects
    "transition-property":
      "background-color, border-color, color, fill, stroke, opacity, box-shadow, translate, transform",
    "transition-duration": "0.2s",
    "transition-timing-function": "ease",

    // Transform
    "vertical-align": "middle",
    "text-overflow": "clip",
    "overflow-x": "visible",
    "overflow-y": "visible",
    "overflow-wrap": "break-word",

    // Additional Properties
    appearance: "none",
    "font-feature-settings": '"cv11"',
    "-webkit-font-smoothing": "antialiased",
    "-webkit-user-select": "none",
  };

  const style = mergeProps(defaultStyle, styling.style ?? {});

  return (
    <button
      class={styling.class}
      classList={styling.classList}
      style={style}
      {...others}
    >
      {local.children}
    </button>
  );
}
