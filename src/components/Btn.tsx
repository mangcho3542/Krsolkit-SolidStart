import { PUS, ButtonProps } from "@types";
import { splitProps, JSX } from "solid-js";
import { splitComponentProps } from "@utils";
import styles from "@styles/Btn.module.css";

export type BtnProps = PUS<ButtonProps>;

export function Btn(props: BtnProps): JSX.Element {
	const [local, rest] = splitProps(props, ["children"]);

	return (
		<button {...splitComponentProps(rest, styles.Btn)}>{local.children}</button>
	);
}

export default Btn;
