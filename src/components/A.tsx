import { A as Anchor, AnchorProps } from "@solidjs/router";
import styles from "@styles/A.module.css";
import { splitProps } from "solid-js";

export interface AProps extends AnchorProps {
	href: string;
	useDefaultStyle?: boolean;
}

export function A(props: AProps) {
	const [local, rest] = splitProps(props, [
		"href",
		"target",
		"children",
		"useDefaultStyle",
		"class",
		"classList",
		"id",
		"inactiveClass",
		"activeClass",
	]);

	return (
		<Anchor
			class={local.class}
			classList={{
				[styles.A]:
					local.useDefaultStyle === undefined ? true : local.useDefaultStyle,
			}}
			id={local.id}
			target={local.target ?? "_self"}
			href={local.href}
			inactiveClass={local.inactiveClass}
			activeClass={local.activeClass}
			{...rest}
		>
			{local.children}
		</Anchor>
	);
}

export default A;
