import { JSXElement, splitProps } from "solid-js";
import { DivProps } from "@/types/ComponentProps";
import { twMerge } from "tailwind-merge";

export interface CardProps extends DivProps {
	Icon?: JSXElement;
	DescProps?: DivProps & { direction?: "row" | "col" };
	direction?: "row" | "col";
}

export function Card(props: CardProps) {
	const [local, rest] = splitProps(props, [
		"Icon",
		"DescProps",
		"direction",
		"children",
	]);

	return (
		<div
			{...rest}
			class={twMerge(
				`flex-${local.direction === "row" ? "row" : "col"} rounded-md border`,
				"border-solid border-(--border-color)",
				rest.class,
			)}
			data-scope="Card"
			data-part="root"
		>
			{local.Icon}
			<div
				{...local.DescProps}
				class={twMerge(
					`flex-${local.DescProps?.direction === "row" ? "row" : "col"} `,
					local.DescProps?.class
				)}
			>
				{local.children}
			</div>
		</div>
	);
}
