import { InputProps } from "@types";
import { splitProps } from "solid-js";

export interface HiddenInputProps extends InputProps {}

export function HiddenInput(props: HiddenInputProps) {
	const [local, rest] = splitProps(props, ["style", "type"]);

	return (
		<input
			style={{
				...local.style,
				visibility: "hidden",
				display: "none"
			}}
			type={local.type ?? "text"}
			aria-hidden
			hidden
			{...rest}
		/>
	);
}

export default HiddenInput;