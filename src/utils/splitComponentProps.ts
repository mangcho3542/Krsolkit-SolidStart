import { ComponentProps, PUS } from "@types";

export function splitComponentProps<
	T extends PUS<ComponentProps> & {
		[key: `data-${string}`]: any;
	}
>(
	props: T | undefined,
	defaultClass?: string
): T & { [key: `data-${string}`]: any; [key: `aria-${string}`]: any } {
	if (!props) {
		return defaultClass ? ({ class: defaultClass } as T) : ({} as T);
	}

	const { id, class: cls, classList, style, useDefaultStyle, ...rest } = props;
	const mergedClass = [cls, useDefaultStyle ?? true ? defaultClass : undefined]
		.filter(Boolean)
		.join(" ")
		.trim();

	return {
		...rest,
		...(id !== undefined ? { id } : {}),
		...(classList !== undefined ? { classList } : {}),
		...(style !== undefined ? { style } : {}),
		...(mergedClass ? { class: mergedClass } : {}),
	} as T;
}
