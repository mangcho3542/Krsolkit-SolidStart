import { ComponentProps } from "@/types/ComponentProps";
import { Hex, RGB, RGBA, HSL, HSLA } from "@/types/ColorType";
import { Dynamic } from "solid-js/web";
import { JSX, ValidComponent } from "solid-js";
import { splitProps } from "solid-js";
import styles from "@styles/ColorSwatch.module.css";
import { splitComponentProps } from "@utils/splitComponentProps";

export interface ColorSwatchProps extends ComponentProps {
	color: Hex | RGB | RGBA | HSL | HSLA;
	as?: ValidComponent | keyof JSX.IntrinsicElements;
	useDefaultStyle?: boolean;
}

export function ColorSwatch(props: ColorSwatchProps) {
	const [local, rest] = splitProps(props, ["color", "as"]);

	return (
		<Dynamic component={local.as ?? "span"}
		{...splitComponentProps(rest, styles.ColorSwatch)}
		data-scope={rest["data-scope"] ?? "ColorSwatch"}
		style={{
			...rest.style ?? {},
			"background-color": local.color
		}}
		>

		</Dynamic>
	);
}

export default ColorSwatch;
