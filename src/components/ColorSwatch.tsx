import { ComponentProps } from "@/types/ComponentProps";
import { Dynamic } from "solid-js/web";
import { Hex, RGB, RGBA, HSL, HSLA } from "@/types/ColorType";
import { JSX, ValidComponent } from "solid-js";
import { splitProps } from "@/utils/splitProps";
import styles from "@styles/ColorSwatch.module.css";

interface ColorSwatchProps extends Pick<ComponentProps, "class" | "classList" | "id"> {
    color: Hex | RGB | RGBA | HSL | HSLA;
    as?: ValidComponent | keyof JSX.IntrinsicElements;
    useDefaultStyle?: boolean;
}

function ColorSwatch(props: ColorSwatchProps) {
    const [local, style, rest] = splitProps(props, styles.ColorSwatch, ["color", "as", "useDefaultStyle"]);

    return (
        <Dynamic 
        component={local.as ?? "div"}
        class={style.class + local.useDefaultStyle ? " " + styles.ColorSwatch : ""}
        classList={{
            ...style.classList,
        }}
        />
    )
}