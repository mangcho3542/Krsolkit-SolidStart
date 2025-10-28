import { ComponentProps } from "@/types/ComponentProps";
import { Dynamic } from "solid-js/web";
import { Hex, RGB, RGBA, HSL, HSLA } from "@/types/ColorType";
import { JSX, ValidComponent } from "solid-js";
import { splitProps } from "solid-js";
import styles from "@styles/ColorSwatch.module.css";
import { convertCss } from "@/utils/converCss";

export interface ColorSwatchProps
  extends Pick<ComponentProps, "class" | "classList" | "id" | "css"> {
  color: Hex | RGB | RGBA | HSL | HSLA;
  as?: ValidComponent | keyof JSX.IntrinsicElements;
  useDefaultStyle?: boolean;
}

export function ColorSwatch(props: ColorSwatchProps) {
  const [local, rest] = splitProps(props, [
    "color",
    "as",
    "class",
    "classList",
    "id",
    "useDefaultStyle",
    "css",
  ]);

  return (
    <Dynamic
      component={local.as ?? "div"}
      class={local.class}
      classList={{
        [styles.ColorSwatch]:
          local.useDefaultStyle === undefined ? true : local.useDefaultStyle,
        ...local.classList,
      }}
      style={convertCss(local.css)}
      {...rest}
    />
  );
}

export default ColorSwatch;
