import styles from "@styles/NumberInput.module.css";
import { PUS, ButtonProps, DivProps, InputProps } from "@types";
import { splitComponentProps } from "@utils";
import { createEffect, createMemo, createSignal, splitProps } from "solid-js";
import { Field, FieldProps } from "./Field";

type TrgProps = PUS<ButtonProps> & {
	onClick?: (
		e: MouseEvent & { currentTarget: HTMLButtonElement; target: Element }
	) => any;
};

export interface NumberInputProps extends FieldProps {
	InputProps?: Omit<PUS<InputProps>, "inputMode" | "pattern"> & {
		type?: "number";
	};
	ContainerProps?: PUS<DivProps>;
	ControlProps?: PUS<DivProps>;
	IncTrgProps?: TrgProps;
	DecTrgProps?: TrgProps;
	useTrg?: boolean;
	inputMode?: InputProps["inputMode"];
	defaultValue?: number;
	max?: number;
	min?: number;
	step?: number;
	pattern?: string;
	allowMouseWheel?: boolean;
	clampValueOnBlur?: boolean;
}

export function NumberInput(props: NumberInputProps) {
	const [local, others, rest] = splitProps(
		props,
		[
			"inputMode",
			"defaultValue",
			"min",
			"max",
			"step",
			"pattern",
			"allowMouseWheel",
			"disabled",
			"readonly",
			"invalid",
			"clampValueOnBlur",
		],
		[
			"LabelProps",
			"Label",
			"useTrg",
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

	let btnRef: HTMLButtonElement | undefined;

	const max = createMemo(() => {
		if (local.max && local.max <= Number.MAX_SAFE_INTEGER)
			return Math.abs(local.max);

		return Number.MAX_SAFE_INTEGER;
	});
	const min = createMemo(() => {
		if (local.min && local.min >= Number.MIN_SAFE_INTEGER)
			return -1 * Math.abs(local.min);
		return Number.MIN_SAFE_INTEGER;
	});

	const step = createMemo(() =>
		local.step &&
		local.step >= Number.MIN_SAFE_INTEGER &&
		local.step <= Number.MAX_SAFE_INTEGER
			? Math.abs(local.step)
			: 1
	);

	const [value, setValue] = createSignal(
		local.defaultValue ?? local.min ?? (min() + max()) / 2
	);
	const [focused, setFocused] = createSignal(false); //input focus 나타내는 signal

	//InputProps
	const InputProps = createMemo(() => {
		if (others.InputProps) {
			if (
				others.InputProps.useDefaultStyle === undefined ||
				others.InputProps.useDefaultStyle
			) {
				others.InputProps.class =
					(others.InputProps.class ?? "") + styles.Input;
			}

			return others.InputProps;
		} else {
			return {
				class: styles.Input,
			};
		}
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
	if (local.allowMouseWheel === undefined || local.allowMouseWheel) {
		createEffect(() => {
			if (focused()) {
				if (typeof window === "undefined") return;
				window.addEventListener("wheel", onWheel, { passive: false });
			} else {
				window.removeEventListener("wheel", onWheel);
			}
		});
	}

	//value 바뀔 때마다 clamp하는 함수
	function clamp(v: number) {
		const steppedValue = Math.round(v / step()) * step();
		return Math.max(min(), Math.min(max(), steppedValue));
	}

	return (
		<Field.Root
			{...rest}
			disabled={local.disabled}
			readonly={local.readonly}
			invalid={local.invalid}
			data-scope={rest["data-scope"] ?? "number-input"}
			data-part={rest["data-part"] ?? "root"}
		>
			<Field.Label {...others.LabelProps}>{others.Label}</Field.Label>

			<div
				{...splitComponentProps(others.ControlProps, styles.Control)}
				data-scope={others.ControlProps?.["data-scope"] ?? "number-input"}
				data-part={others.ControlProps?.["data-part"] ?? "control"}
				dir="ltr"
				role="group"
				aria-disabled={local.disabled ?? "false"}
			>
				<Field.Input
					{...InputProps()}
					onInput={(e) => {
						setValue(e.currentTarget.valueAsNumber);
						others.InputProps?.onInput?.(e);
					}}
					onfocusin={(e) => {
						setFocused(true);
						others.InputProps?.onfocusin?.(e);
					}}
					onfocusout={(e) => {
						setFocused(false);
						if (local.clampValueOnBlur === undefined || local.clampValueOnBlur)
							setValue(clamp(e.currentTarget.valueAsNumber));
						others.InputProps?.onfocusout?.(e);
					}}
					type={others.InputProps?.type ?? "number"}
					min={min()}
					max={max()}
					inputMode={local.inputMode ?? "decimal"}
					pattern={local.pattern}
					value={value()}
					aria-valuemax={max()}
					aria-valuemin={min()}
					aria-valuenow={value()}
				/>

				<div
					{...splitComponentProps(others.ContainerProps, styles.Container)}
					data-scope={others.ContainerProps?.["data-scope"] ?? "number-input"}
					data-part={others.ContainerProps?.["data-part"] ?? "Container"}
					aria-disabled={local.disabled}
					aria-readonly={local.readonly}
					{...(local.disabled && { "data-disabled": "" })}
				>
					<button
						{...splitComponentProps(others.IncTrgProps, styles.IncTrg)}
						data-scope={others.IncTrgProps?.["data-scope"] ?? "number-input"}
						data-part={others.IncTrgProps?.["data-part"] ?? "increment-trg"}
						onClick={(e) => {
							if (!local.disabled && !local.readonly)
								setValue((v) => v + step());
							others.IncTrgProps?.onClick?.(e);
						}}
						onpointerdown={(e) => {
							if (btnRef) btnRef.setAttribute("data-pointer", "");
							others.IncTrgProps?.onpointerdown?.(e);
						}}
						onpointerup={(e) => {
							if (btnRef) btnRef.removeAttribute("data-pointer");
							others.IncTrgProps?.onpointerup?.(e);
						}}
					>
						<svg viewBox="0 0 24 24" class={styles.Icon}>
							<path d="m18 15-6-6-6 6" />
						</svg>
					</button>

					<button
						{...splitComponentProps(others.DecTrgProps, styles.DecTrg)}
						ref={(el) => {
							btnRef = el;
							if (others.DecTrgProps?.ref) {
								if (typeof others.DecTrgProps.ref === "function")
									others.DecTrgProps.ref(el);
								else others.DecTrgProps.ref = el;
							}
						}}
						data-scope={others.DecTrgProps?.["data-scope"] ?? "number-input"}
						data-part={others.DecTrgProps?.["data-part"] ?? "decrement-trigger"}
						onClick={(e) => {
							if (!local.disabled && !local.readonly)
								setValue((v) => v - step());
							others.DecTrgProps?.onClick?.(e);
						}}
						onpointerdown={(e) => {
							e.currentTarget.setAttribute("data-pointer", "");
							others.DecTrgProps?.onpointerdown?.(e);
						}}
						onpointerup={(e) => {
							e.currentTarget.removeAttribute("data-pointer");
							others.DecTrgProps?.onpointerdown?.(e);
						}}
					>
						<svg viewBox="0 0 24 24" class={styles.Icon}>
							<path d="m6 9 6 6 6-6" />
						</svg>
					</button>
				</div>
			</div>

			{local.invalid ? (
				<Field.ErrorText {...others.ErrorTextProps}>
					{others.ErrorText}
				</Field.ErrorText>
			) : (
				<Field.HelperText {...others.HelperTextProps}>
					{others.HelperText}
				</Field.HelperText>
			)}
		</Field.Root>
	);
}
