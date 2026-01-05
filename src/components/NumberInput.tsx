import styles from "@styles/NumberInput.module.css";
import { PUS, ButtonProps, DivProps, InputProps } from "@types";
import { splitComponentProps } from "@utils";
import { nanoid } from "nanoid";
import {
	Accessor,
	createEffect,
	createMemo,
	createSignal,
	splitProps,
} from "solid-js";
import { FieldProps } from "./Field";

type TrgProps = PUS<ButtonProps> & {
	onClick?: (
		e: MouseEvent & { currentTarget: HTMLButtonElement; target: Element }
	) => any;
};

export interface NumberInputProps extends FieldProps {
	ContainerProps?: PUS<DivProps>;
	InputProps?: PUS<InputProps>;
	ControlProps?: PUS<DivProps>;
	IncTrgProps?: TrgProps;
	DecTrgProps?: TrgProps;
	inputMode?: InputProps["inputMode"];
	defaultValue?: number;
	max?: number;
	min?: number;
	step?: number;
	pattern?: RegExp;
	useBtn?: boolean;
	allowMouseWheel?: boolean;
	name?: string;
	disabled?: boolean;
	invalid?: boolean;
	readonly?: boolean;
}

export function NumberInput(props: NumberInputProps) {
	const [local, states, others, rest] = splitProps(
		props,
		[
			"orientation",
			"inputMode",
			"defaultValue",
			"min",
			"max",
			"step",
			"pattern",
			"useBtn",
			"allowMouseWheel",
			"name",
			"required"
		],
		["disabled", "invalid", "readonly"],
		[
			"LabelProps",
			"Label",
			"RequiredIndicatorProps",
			"ContainerProps",
			"ControlProps",
			"IncTrgProps",
			"DecTrgProps",
			"HelperTextProps",
			"HelperText",
			"ErrorTextProps",
			"ErrorText",
			"InputProps",
		]
	);

	const InputId = createMemo(
		() => others.InputProps?.id ?? `input:${nanoid(8)}`
	);

	const HelperTextId = createMemo(
		() => others.HelperTextProps?.id ?? `HelperText-${nanoid(8)}`
	);
	const ErrorTextId = createMemo(
		() => others.ErrorTextProps?.id ?? `ErrorText-${nanoid(8)}`
	);

	const max = createMemo(() => local.max ?? Number.MAX_SAFE_INTEGER);
	const min = createMemo(() => local.min ?? 0);
	const step = createMemo(() =>
		local.step &&
		local.step >= Number.MIN_SAFE_INTEGER &&
		local.step <= Number.MAX_SAFE_INTEGER
			? local.step
			: 1
	);

	const [value, setValue] = createSignal(local.defaultValue ?? local.min ?? 0);
	const [inputFocus, setInputFocus] = createSignal(false);

	const dataStates: Accessor<
		{ "data-state": "disabled" | "invalid" | "readonly" } | {}
	> = createMemo(() => {
		if (states.disabled) return { "data-state": "disabled" };
		else if (states.invalid) return { "data-state": "invalid" };
		else if (states.readonly) return { "data-state": "readonly" };
		else return {};
	});

	//onWheel
	function onWheel(e: WheelEvent) {
		e.preventDefault();
		console.log(e.deltaY);
		const cnt = Math.trunc(e.deltaY / 120);
		if (cnt === 0) return;
		setValue((v) => v - cnt * step());
	}

	//allowMouseWheel
	if (local.allowMouseWheel === undefined || local.allowMouseWheel === true) {
		createEffect(() => {
			if (inputFocus()) {
				if (typeof window === "undefined") return;
				window.addEventListener("wheel", onWheel, {passive: false});
			}
			else {
				window.removeEventListener("wheel", onWheel);
			}
		});
	}

	return (
		<div
			{...splitComponentProps(rest, styles.Root)}
			{...dataStates()}
			data-scope="filed"
			data-part="root"
			data-orientation={local.orientation || "vertical"}
		>
			<label
				{...splitComponentProps(others.LabelProps, styles.Label)}
				for={InputId()}
			>
				{others.Label}
				{local.required && (
					<span
						{...splitComponentProps(
							others.RequiredIndicatorProps,
							styles.RequiredIndicator
						)}
						aria-hidden
						data-scope="field"
						data-part="required-indicator"
					>
						*
					</span>
				)}
			</label>

			<div
				{...splitComponentProps(others.ContainerProps, styles.Container)}
				data-scope="number-input"
				data-part="container"
			>
				<div
					{...splitComponentProps(others.ControlProps, styles.Control)}
					data-scope="number-input"
					data-part="control"
				>
					<button
						{...splitComponentProps(others.IncTrgProps, styles.IncTrg)}
						onClick={(e) => {
							setValue((v) => v + step());
							others.IncTrgProps?.onClick?.(e);
						}}
						data-scope="number-input"
						data-park="inc-trg"
					>
						<svg viewBox="0 0 24 24" class={styles.Icon}>
							<path d="m18 15-6-6-6 6"></path>
						</svg>
					</button>

					<button
						{...splitComponentProps(others.DecTrgProps, styles.DecTrg)}
						onClick={(e) => {
							setValue((v) => v - step());
							others.DecTrgProps?.onClick?.(e);
						}}
						data-scope="number-input"
						data-part="dec-trg"
					>
						<svg viewBox="0 0 24 24" class={styles.Icon}>
							<path d="m6 9 6 6 6-6"></path>
						</svg>
					</button>
				</div>

				<input
					{...splitComponentProps(others.InputProps, styles.Input)}
					id={InputId()}
					type="number"
					inputMode={local.inputMode ?? "decimal"}
					value={value()}
					min={min()}
					max={max()}
					aria-valuemin={local.min ?? 0}
					aria-valuemax={local.max ?? Number.MAX_SAFE_INTEGER}
					aria-valuenow={value()}
					aria-valuetext={value().toString()}
					aria-describedby={states.invalid ? ErrorTextId() : HelperTextId()}
					onFocusIn={(e) => {
						e.currentTarget.setAttribute("data-focus", "");
						setInputFocus(true);
						others.InputProps?.onFocusIn?.(e);
					}}
					onFocusOut={(e) => {
						e.currentTarget.removeAttribute("data-focus");
						setInputFocus(false);
						others.InputProps?.onFocusOut?.(e);
					}}
					onChange={(e) => {
						const v = Number.parseFloat(e.currentTarget.value);
						if (v > max()) setValue(max());
						else if (v < min()) setValue(min());
						else setValue(v);
						others.InputProps?.onChange?.(e);
					}}
				/>
			</div>

			{states.invalid ? (
				<span
					{...splitComponentProps(others.ErrorTextProps, styles.ErrorText)}
					id={ErrorTextId()}
					data-scope="field"
					data-part="error-text"
				>
					{others.ErrorText}
				</span>
			) : (
				<span
					{...splitComponentProps(others.HelperTextProps, styles.HelperText)}
					id={HelperTextId()}
					data-scope="field"
					data-part="helper-text"
				>
					{others.HelperText}
				</span>
			)}
		</div>
	);
}
