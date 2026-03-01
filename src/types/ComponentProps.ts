import { JSX, JSXElement } from "solid-js";
import { DOMElement } from "solid-js/jsx-runtime";

export interface ComponentProps {
	class?: string;
	classList?: { [k: string]: boolean | undefined };
	id?: string;
	style?: JSX.CSSProperties;
	children?: JSXElement;
	[key: `data-${string}`]: any;
}

export type PUS<T extends object> = Omit<T, "style"> & {
	useDefaultStyle?: boolean;
	style?: JSX.CSSProperties;
	[key: `data-${string}`]: any;
};

export type StyleT<T> = Omit<T, "style"> & {
	style?: JSX.CSSProperties;
	[key: `data-${string}`]: any;
};

export type DivProps = StyleT<JSX.HTMLAttributes<HTMLDivElement>>;
export type ParagraphProps = StyleT<JSX.HTMLAttributes<HTMLParagraphElement>>;
export type SpanProps = StyleT<JSX.HTMLAttributes<HTMLSpanElement>>;

export type ButtonClickEvent = MouseEvent & {
	currentTarget: HTMLButtonElement;
	target: Element;
};

export type ButtonProps = StyleT<
	Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, "onClick">
> & {
	onClick?: (e: ButtonClickEvent) => any;
	onclick?: (e: ButtonClickEvent) => any;
	onpointerdown?: (
		e: PointerEvent & {
			currentTarget: HTMLButtonElement;
			target: DOMElement;
		},
	) => any;
	onpointerup?: (
		e: PointerEvent & {
			currentTarget: HTMLButtonElement;
			target: DOMElement;
		},
	) => any;
};
export type DialogProps = StyleT<JSX.HTMLAttributes<HTMLDialogElement>>;
export type ImageProps = StyleT<JSX.HTMLAttributes<HTMLImageElement>>;
export type SvgProps = StyleT<JSX.SvgSVGAttributes<SVGSVGElement>>;
export type LabelProps = StyleT<JSX.HTMLAttributes<HTMLLabelElement>>;

export type InputEventT = Event & {
	currentTarget: HTMLInputElement;
	target: HTMLInputElement;
};

export type InputProps = StyleT<
	Omit<
		JSX.InputHTMLAttributes<HTMLInputElement>,
		"onFocusIn" | "onFocusOut" | "onChange"
	>
> & {
	onfocusin?: (
		e: FocusEvent & {
			currentTarget: HTMLInputElement;
			target: HTMLInputElement;
		},
	) => void;
	onfocusout?: (
		e: FocusEvent & {
			currentTarget: HTMLInputElement;
			target: HTMLInputElement;
		},
	) => void;
	onChange?: (
		e: Event & {
			currentTarget: HTMLInputElement;
			target: HTMLInputElement;
		},
	) => void;
	onInput?: (
		e: InputEvent & {
			currentTarget: HTMLInputElement;
			target: HTMLInputElement;
		},
	) => void;
};
