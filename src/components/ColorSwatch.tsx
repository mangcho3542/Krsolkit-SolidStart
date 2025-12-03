import { ComponentProps } from "@/types/ComponentProps";
import { Dynamic } from "solid-js/web";
import { Hex, RGB, RGBA, HSL, HSLA } from "@/types/ColorType";
import { createMemo, JSX, ValidComponent } from "solid-js";
import { splitProps } from "solid-js";
import styles from "@styles/ColorSwatch.module.css";
import { splitComponentProps } from "@/utils/splitComponentProps";

export interface ColorSwatchProps
  extends ComponentProps {
  color: Hex | RGB | RGBA | HSL | HSLA;
  as?: ValidComponent | keyof JSX.IntrinsicElements;
  useDefaultStyle?: boolean;
}

export function ColorSwatch(props: ColorSwatchProps) {
  const [local, rest] = splitProps(props, [
    "color",
    "as",
  ]);

  const getRest = createMemo(() => {
    let res = splitComponentProps(rest, styles.ColorSwatch);
    if(res.style) res.style.color = local.color
    else res = {...res, style: {color: local.color}};
    return res;
  });

  return (
    <Dynamic
      component={local.as ?? "span"}
      {...getRest()}
    >
      &nbsp;
    </Dynamic>
  );
}

export default ColorSwatch;
