import styles from "@styles/PasswordInput.module.css";
import { PUS, ComponentProps, DivProps, ButtonProps } from "@/types/ComponentProps";
import {
	FieldProps,
	FieldRoot,
	FieldLabel,
	FieldInput,
	FieldErrorText,
	FieldHelperText,
} from "./Field";
import { createMemo, createSignal, splitProps } from "solid-js";
import { splitComponentProps } from "@utils/splitComponentProps";

export interface PasswordInputProps extends Omit<FieldProps, "type"> {
	ControlProps?: PUS<DivProps>;
	VisibleTrgProps?: PUS<ButtonProps>;
	EyeIconProps?: PUS<ComponentProps>;
	EyeOffIconProps?: PUS<ComponentProps>;
	visible?: boolean;
	defaultVisible?: boolean;
}

export function PasswordInput(props: PasswordInputProps) {
	const [local, others, rest] = splitProps(
		props,
		[
			"name",
			"invalid",
			"defaultVisible",
			"visible",
		],
		[
			"LabelProps",
			"Label",
			"InputProps",
			"HelperTextProps",
			"HelperText",
			"ErrorTextProps",
			"ErrorText",
			"ControlProps",
			"EyeIconProps",
			"EyeOffIconProps",
			"VisibleTrgProps",
		]
	);

	const [visible, setVisible] = createSignal<boolean>(
		local.visible ?? local.defaultVisible ?? false
	);

	const type = createMemo(() => (visible() ? "text" : "password"));

	const InputProps = createMemo(() => {
		if(others.InputProps) {
			if(others.InputProps.useDefaultStyle === undefined || others.InputProps.useDefaultStyle) {
				others.InputProps.class = (others.InputProps.class ?? "") + styles.Input;
			}

			return others.InputProps;
		}
		else {
			return {
				class: styles.Input
			};
		}
	})

	return (
		<FieldRoot
			{...rest}
			invalid={local.invalid}
			data-scope={rest["data-scope"] ?? "password-input"}
			data-part={rest["data-part"] ?? "root"}
		>
			<FieldLabel
				{...others.LabelProps}
				data-scope={others.LabelProps?.["data-scope"] ?? "password-input"}
				data-part={others.LabelProps?.["data-part"] ?? "label"}
			>
				{others.Label}
			</FieldLabel>
			<div
				{...splitComponentProps(others.ControlProps, styles.Control)}
				data-scope={others.ControlProps?.["data-scope"] ?? "password-input"}
				data-part={others.ControlProps?.["data-part"] ?? "control"}
			>
				<FieldInput
					{...InputProps()}
					type={type()}
					name={local.name}
					data-scope={others.InputProps?.["data-scope"] ?? "password-input"}
					data-part={others.InputProps?.["data-part"] ?? "input"}
					autocomplete={others?.InputProps?.autocomplete ?? "new-password"}
				/>

				<button
					tabIndex="-1"
					aria-label="Toggle password visibility"
					{...splitComponentProps(others.VisibleTrgProps, styles.VisibleTrg)}
					onClick={(e) => {
						setVisible((v) => !v);
						others.VisibleTrgProps?.onClick?.(e);
					}}
				>
					{visible() ? (
						<EyeIcon {...others.EyeIconProps} />
					) : (
						<EyeOffIcon {...others.EyeOffIconProps} />
					)}
				</button>
			</div>

			{local.invalid ? (
				<FieldErrorText
					{...others.ErrorTextProps}
					data-scope={others.ErrorTextProps?.["data-scope"] ?? "password-input"}
					data-part={others.ErrorTextProps?.["data-part"] ?? "error-text"}
				>
					{others.ErrorText}
				</FieldErrorText>
			) : (
				<FieldHelperText
					{...others.HelperTextProps}
					data-scope={others.HelperTextProps?.["data-scope"] ?? "password-input"}
					data-part={others.HelperTextProps?.["data-part"] ?? "helper-text"}
				>
					{others.HelperText}
				</FieldHelperText>
			)}
		</FieldRoot>
	);
}

function EyeIcon(props: PUS<ComponentProps>) {
	return (
		<svg
			{...splitComponentProps(props, styles.Icon)}
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
			<circle cx="12" cy="12" r="3" />
		</svg>
	);
}

function EyeOffIcon(props: PUS<ComponentProps>) {
	return (
		<svg
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			{...splitComponentProps(props, styles.Icon)}
		>
			<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"></path>
			<path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
			<path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
			<path d="m2 2 20 20" />
		</svg>
	);
}
