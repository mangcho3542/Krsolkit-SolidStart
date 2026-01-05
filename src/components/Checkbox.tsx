import styles from "@styles/Checkbox.module.css";
import { DivProps, LabelProps, PUS, SvgProps } from "@types";
import { createEffect, createMemo, createSignal, splitProps } from "solid-js";
import { splitComponentProps } from "@utils";
import HiddenInput from "./HiddenInput";
import { nanoid } from "nanoid";

export interface CheckboxProps extends Omit<PUS<LabelProps>, "onChange"> {
	ControlProps?: PUS<DivProps>;
	IconProps?: SvgProps;
	LabelProps?: PUS<DivProps>;
	Label?: string;
	defaultChecked?: boolean;
	onChange?: (e: { value: boolean; name: string }) => any;
	name?: string;
	disabled?: boolean;
	invalid?: boolean;
	readonly?: boolean;
}

export function Checkbox(props: CheckboxProps) {
	const [local, states, rest] = splitProps(
		props,
		[
			"ControlProps",
			"IconProps",
			"LabelProps",
			"Label",
			"defaultChecked",
			"onChange",
			"name",
		],
		["disabled", "invalid", "readonly"]
	);

	const [checked, setChecked] = createSignal(
		local.defaultChecked !== undefined ? !!local.defaultChecked : false
	);

	const [focused, setFocused] = createSignal(false);

	const state = createMemo(() => {
		if (states.disabled) return "disabled";
		if (states.invalid) return "invalid";
		if (states.readonly) return "readonly";
		return "";
	});

	const inputId = `input-${nanoid(8)}`;

	//checked 바뀔때마다 onChange 호출
	createEffect(() => {
		local.onChange?.({ value: checked(), name: local.name ?? "" });
	});

	function toggle() {
		if (state() !== "") return;
		setChecked((c) => !c);
	}

	function onKeyDown(e: KeyboardEvent) {
		if (e.key === " " || e.key === "Spacebar" || e.key === "Enter") {
			e.preventDefault();
			toggle();
		}
	}

	return (
		<label
			{...splitComponentProps(rest, styles.Root)}
			for={inputId}
			data-state={state()}
		>
			<HiddenInput
				type="checkbox"
				id={inputId}
				name={local.name}
				checked={checked()}
				disabled={states.disabled}
				readOnly={states.readonly}
				{...(states.invalid && { "aria-invalid": true })}
				{...(states.disabled && { "aria-disabled": true })}
				{...(states.readonly && { "aria-readonly": true })}
			/>

			<div
				{...splitComponentProps(local.ControlProps, styles.Control)}
				role="checkbox"
				tabindex={state() === "" ? 0 : -1}
				aria-checked={checked()}
				aria-disabled={states.disabled || undefined}
				onClick={(e) => {
					if (state() === "") {
						toggle();
						e.currentTarget.focus();
					}
				}}
				onKeyDown={onKeyDown}
				onFocusIn={() => setFocused(true)}
				onFocusOut={() => setFocused(false)}
				data-state={state()}
				{...(checked() && { "data-checked": "" })}
				{...(focused() && { "data-focus": "" })}
			>
				<svg
					viewBox="0 0 24 24"
					{...splitComponentProps(local.IconProps, styles.Icon)}
				>
					{checked() && <polyline points="20 6 9 17 4 12" />}
				</svg>
			</div>

			{local.Label && (
				<div {...splitComponentProps(local.LabelProps, styles.Label)}>
					{local.Label}
				</div>
			)}
		</label>
	);
}
