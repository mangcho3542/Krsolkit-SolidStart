import { ButtonProps } from "@/types/ComponentProps";
import { splitProps, JSX } from "solid-js";
import { twMerge } from "tailwind-merge";

export interface BtnProps extends ButtonProps {
	disabled?: boolean;
}

export function Btn(props: BtnProps): JSX.Element {
	const [local, rest] = splitProps(props, [
		"children",
		"disabled",
		"aria-disabled",
		"type",
	]);

	return (
		<button
			{...rest}
			class={twMerge(
				"block text-center rounded-md min-w-10 min-h-10 cursor-pointer",
				"border-0 box-border bg-(--bg-reversed-color) text-(--text-reversed-color)",
				"disabled:opacity-50-",
				"disabled:cursor-not-allowed",
				rest.class,
			)}
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
