import { PUS, ButtonProps } from "@/types/ComponentProps";
import { splitProps, JSX } from "solid-js";
import { splitComponentProps } from "@utils/splitComponentProps";
import styles from "@styles/Btn.module.css";

export interface BtnProps extends PUS<ButtonProps> {
	disabled?: boolean;
}

export function Btn(props: BtnProps): JSX.Element {
	const [local, rest] = splitProps(props, [
		"children",
		"disabled",
		"aria-disabled",
		"type"
	]);

	return (
		<button
			{...splitComponentProps(rest, styles.Btn)}
			{...(local.disabled && {
				disabled: true,
			"aria-disabled": true,
			})}
			type={local.type ?? "button"}
		>
			{local.children}
		</button>
	);
}