import { ComponentProps } from "@/types/ComponentProps";
import { Dynamic } from "solid-js/web";
import { Hex, RGB, RGBA, HSL, HSLA } from "@/types/ColorType";
import { JSX, ValidComponent } from "solid-js";
import { splitProps } from "@/utils/splitProps";
import styles from "@styles/ColorSwatch.module.css";
import { omit } from "@/utils/object";

export interface ColorSwatchProps
  extends Pick<ComponentProps, "class" | "classList" | "id"> {
  color: Hex | RGB | RGBA | HSL | HSLA;
  as?: ValidComponent | keyof JSX.IntrinsicElements;
  useDefaultStyle?: boolean;
}

export function ColorSwatch(props: ColorSwatchProps) {
  const [local, styling, rest] = splitProps(props, styles.ColorSwatch, [
    "color",
    "as",
    "useDefaultStyle",
  ]);

  const style = {
    ...omit(styling.style, ["background-color"]),
    "background-color": local.color,
  };

  return (
    <Dynamic
      component={local.as ?? "div"}
      class={
        styling.class + local.useDefaultStyle ? " " + styles.ColorSwatch : ""
      }
      classList={{
        ...styling.classList,
      }}
      style={style}
      {...rest}
    />
  );
}

export default ColorSwatch;