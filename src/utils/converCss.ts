import { CssProperties } from "@/types/CssProperties";
import { JSX } from "solid-js";
import { kebabCase } from "./word";

export function convertCss(style?: CssProperties): JSX.CSSProperties {
  if(!style) return {};
  return Object.fromEntries(
    Object.entries(style).map(([key, value]) => [kebabCase(key), value])
  );
}