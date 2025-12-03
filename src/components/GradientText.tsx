import styles from "@styles/GradientText.module.css";
import { TupleType } from "@/types/TupleType";
import { JSX, splitProps } from "solid-js";

export interface GradientTextProps extends JSX.HTMLAttributes<HTMLDivElement> {
	colors?: TupleType<string, 5>;
	animationSpeed?: number;
	showBorder?: boolean;
    
}

export function GradientText(props: GradientTextProps) {
	const [local, rest] = splitProps(props, [
		"children",
		"colors",
		"animationSpeed",
		"showBorder",
	]);

	const style = {
		"background-image": `linear gradient(to right, ${(
			local.colors ?? ["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]
		).join(", ")})`,
		"animation-duration": `${local.animationSpeed ?? 8}`,
	};

	return (
		<div
			class={styles.GragientText + rest.class ? " " + rest.class : ""}
			classList={rest.classList}
			id={rest.id}
			style={rest.style}
		>
			{local.showBorder && (
				<div class={styles.GradientOverlay} style={style}></div>
			)}
			<div class={styles.TextContent}></div>
		</div>
	);
}
