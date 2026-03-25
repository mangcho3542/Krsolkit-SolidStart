import { ButtonProps, DivProps } from "@/types/ComponentProps";
import { splitProps, JSX } from "solid-js";
import { twMerge } from "tailwind-merge";
import { Spinner } from "./Spinner";

export interface BtnProps extends ButtonProps {
	disabled?: boolean;
	loading?: boolean;
	loadingText?: string;
	SpinnerProps?: DivProps;
}

export function Btn(props: BtnProps): JSX.Element {
	const [local, rest] = splitProps(props, [
		"children",
		"disabled",
		"loading",
		"loadingText",
		"SpinnerProps",
		"aria-disabled",
		"type",
	]);

	return (
		<button
			{...rest}
			class={twMerge(
				"block text-center rounded-md min-w-10 min-h-10 cursor-pointer",
				"border-0 box-border bg-zinc-900 text-zinc-200",
				"dark:bg-zinc-400 dark:text-zinc-900",
				"disabled:opacity-50 disabled:cursor-not-allowed",
				"data-loading:opacity-50",
				rest.class,
			)}
			{...(local.disabled && {
				disabled: true,
				"aria-disabled": true,
			})}
			{...(local.loading && {
				"data-loading": true,
			})}
			type={local.type ?? "button"}
		>
			{local.loading 
			? (
				<>
					<Spinner {...local.SpinnerProps} />
					{local.loadingText}
				</>
			) 
			: (
				local.children
			)}
		</button>
	);
}
