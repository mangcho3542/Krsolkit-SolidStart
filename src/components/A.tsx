import { A as Anchor, AnchorProps } from "@solidjs/router";
import { splitProps } from "solid-js";
import { twMerge } from "tailwind-merge";

export interface AProps extends Omit<AnchorProps, "ClassList"> {
	href: string;
}

export function A(props: AProps) {
	const [local, rest] = splitProps(props, [
		"target",
		"children",
	]);

	return (
		<Anchor
			{...rest}
			class={twMerge(
				"no-underline inline-block text-inherit relative box-border",
				"after:absolute",
				"after:bottom-0",
				"after:left-0",
				"after:content-none",
				"after:w-full",
				"after:border-b-2",
				"after:border-solid",
				"after:border-[#bdbdbd]",
				"after:h-px",
				"after:-translate-y-[0.2rem]",
				"after:opacity-0",
				"after:transition-all",
				"duration-500",
				"hover:after:opacity-100",
				"hover:after:translate-y-[0.1rem]",
				rest.class,
			)}
			target={local.target ?? "_self"}
		>
			{local.children}
		</Anchor>
	);
}

export default A;
