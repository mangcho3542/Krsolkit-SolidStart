import styles from "@styles/Highlight.module.css";
import { PUS, SpanProps } from "@/types/ComponentProps";
import { splitComponentProps } from "@utils/splitComponentProps";
import { For, splitProps } from "solid-js";

export interface HighlightProps extends PUS<SpanProps> {
	children: string;
	query?: string | string[];
	QueryProps?: PUS<SpanProps>;
	color?: string;
	bgColor?: string;
}

export function Highlight(props: HighlightProps) {
	const [local, others, rest] = splitProps(
		props,
		["query", "children", "color", "bgColor"],
		["QueryProps"]
	);

	function display(str: string) {
		if (!local.query) return <>{str}</>;

		if (typeof local.query === "string") {
			if (str === local.query)
				return (
					<span
						{...splitComponentProps(others.QueryProps, styles.Query)}
						data-scope={others.QueryProps?.["data-scope"] ?? "highlight"}
						data-part={others.QueryProps?.["data-part"] ?? "query"}
					>
						{str}
					</span>
				);
		} else {
			if (local.query.includes(str))
				return (
					<span
						{...splitComponentProps(others.QueryProps, styles.Query)}
						data-scope={others.QueryProps?.["data-scope"] ?? "highlight"}
						data-part={others.QueryProps?.["data-part"] ?? "query"}
					>
						{str}
					</span>
				);
		}

		return <>{str + " "}</>;
	}

	return (
		<span
			{...splitComponentProps(rest, styles.Root)}
			data-scope={rest["data-scope"] ?? "highlight"}
			data-part={rest["data-part"] ?? "root"}
      style={{
        ...rest.style,
        "--color": local.color ?? "#54abf3",
        "--bg-color": local.bgColor ?? "#cff9ff"
      }}
		>
			<For each={local.children.split(" ")}>{(str) => display(str)}</For>
		</span>
	);
}

export default Highlight;
