import styles from "@styles/Field.module.css";
import { DivProps, InputProps, LabelProps, PUS, SpanProps } from "@/types/ComponentProps";
import { splitComponentProps } from "@utils/splitComponentProps";
import { nanoid } from "nanoid";
import {
	Accessor,
	createMemo,
	JSXElement,
	splitProps,
	createContext,
	useContext,
} from "solid-js";

export interface FieldContextValue {
	required: Accessor<boolean>;
	disabled: Accessor<boolean>;
	invalid: Accessor<boolean>;
	readonly: Accessor<boolean>;
	inputId: Accessor<string>;
	helperTextId: Accessor<string>;
	errorTextId: Accessor<string>;
}

const FieldContext = createContext<FieldContextValue>();

export function useField() {
	const context = useContext(FieldContext);
	if (!context) {
		throw new Error("Field components must be used within Field.Root");
	}
	return context;
}

export interface FieldRootProps extends PUS<DivProps> {
	orientation?: "vertical" | "horizontal";
	disabled?: boolean;
	invalid?: boolean;
	readonly?: boolean;
	required?: boolean;
}

export function FieldRoot(props: FieldRootProps) {
	const [local, states, rest] = splitProps(
		props,
		["orientation", "required", "children"],
		["disabled", "invalid", "readonly"]
	);

	const inputId = createMemo(() => `Input-${nanoid(8)}`);
	const helperTextId = createMemo(() => `HelperText-${nanoid(8)}`);
	const errorTextId = createMemo(() => `ErrorText-${nanoid(8)}`);

	const contextValue: FieldContextValue = {
		required: () => local.required ?? false,
		disabled: () => states.disabled ?? false,
		invalid: () => states.invalid ?? false,
		readonly: () => states.readonly ?? false,
		inputId,
		helperTextId,
		errorTextId,
	};

	const dataStates: Accessor<
		{ "data-state": "disabled" | "invalid" | "readonly" } | {}
	> = createMemo(() => {
		if (states.disabled) return { "data-state": "disabled" };
		else if (states.invalid) return { "data-state": "invalid" };
		else if (states.readonly) return { "data-state": "readonly" };
		else return {};
	});

	return (
		<FieldContext.Provider value={contextValue}>
			<div
				{...dataStates()}
				{...splitComponentProps(rest, styles.Root)}
				data-orientation={local.orientation ?? "vertical"}
				data-scope={props["data-scope"] ?? "field"}
				data-part={props["data-part"] ?? "root"}
			>
				{local.children}
			</div>
		</FieldContext.Provider>
	);
}

export interface FieldLabelProps extends PUS<LabelProps> {
	showRequiredIndicator?: boolean;
	RequiredIndicatorProps?: PUS<SpanProps>;
}

export function FieldLabel(props: FieldLabelProps) {
	const [local, rest] = splitProps(props, [
		"showRequiredIndicator",
		"RequiredIndicatorProps",
		"children",
	]);

	const context = useField();

	const showFlag = createMemo(
		() => local.showRequiredIndicator ?? context.required()
	);

	return (
		<label
			{...splitComponentProps(rest, styles.Label)}
			data-scope={props["data-scope"] ?? "field"}
			data-part={props["data-part"] ?? "label"}
			for={context.inputId()}
		>
			{local.children}
			{showFlag() && (
				<span
					{...splitComponentProps(
						local.RequiredIndicatorProps,
						styles.RequiredIndicator
					)}
					aria-hidden
					data-scope={props.RequiredIndicatorProps?.["data-scope"] ?? "field"}
					data-part={props.RequiredIndicatorProps?.["data-part"] ?? "required-indicator"}
				>
					*
				</span>
			)}
		</label>
	);
}

export interface FieldInputProps extends PUS<InputProps> {
	type?: InputProps["type"];
	name?: string;
}

export function FieldInput(props: FieldInputProps) {
	const [local, rest] = splitProps(props, ["type", "name"]);
	const context = useField();

	return (
		<input
			{...splitComponentProps(rest, styles.Input)}
			type={local.type ?? "text"}
			required={context.required()}
			disabled={context.disabled()}
			readonly={context.readonly()}
			id={context.inputId()}
			onfocusin={(e) => {
				e.currentTarget.setAttribute("data-focus", "");
				rest.onfocusin?.(e);
			}}
			onfocusout={(e) => {
				e.currentTarget.removeAttribute("data-focus");
				rest.onfocusout?.(e);
			}}
			aria-describedby={
				context.invalid() ? context.errorTextId() : context.helperTextId()
			}
			aria-disabled={context.disabled()}
			aria-invalid={context.invalid()}
			aria-readonly={context.readonly()}
			aria-required={context.required()}
			data-scope={props["data-scope"] ?? "field"}
			data-part={props["data-part"] ?? "input"}
			name={local.name}
		/>
	);
}

export function FieldHelperText(props: PUS<SpanProps>) {
	const context = useField();

	return (
		<span
			{...splitComponentProps(props, styles.HelperText)}
			id={context.helperTextId()}
			data-scope="field"
			data-part="helper-text"
		>
			{props.children}
		</span>
	);
}

export function FieldErrorText(props: PUS<SpanProps>) {
	const context = useField();

	return (
		<span
			{...splitComponentProps(props, styles.ErrorText)}
			id={context.errorTextId()}
			data-scope="field"
			data-part="error-text"
		>
			{props.children}
		</span>
	);
}

export interface FieldProps extends FieldRootProps {
	LabelProps?: PUS<LabelProps>;
	Label?: JSXElement;
	InputProps?: PUS<InputProps>;
	HelperTextProps?: PUS<SpanProps>;
	HelperText?: JSXElement;
	ErrorTextProps?: PUS<SpanProps>;
	ErrorText?: JSXElement;
	type?: InputProps["type"];
	name?: string;
}

export function Field(props: FieldProps) {
	const [local, others, rest] = splitProps(
		props,
		[
			"type",
			"name",
			"orientation",
			"disabled",
			"invalid",
			"readonly",
			"required",
		],
		[
			"LabelProps",
			"Label",
			"InputProps",
			"HelperTextProps",
			"HelperText",
			"ErrorTextProps",
			"ErrorText",
		]
	);

	return (
		<FieldRoot
			{...rest}
			orientation={local.orientation}
			disabled={local.disabled}
			invalid={local.invalid}
			readonly={local.readonly}
			required={local.required}
		>
			<FieldLabel {...others.LabelProps}>{others.Label}</FieldLabel>
			<FieldInput {...others.InputProps} type={local.type} name={local.name} />
			{local.invalid ? (
				<FieldErrorText {...others.ErrorTextProps}>
					{others.ErrorText}
				</FieldErrorText>
			) : (
				<FieldHelperText {...others.HelperTextProps}>
					{others.HelperText}
				</FieldHelperText>
			)}
		</FieldRoot>
	);
}

Field.Root = FieldRoot;
Field.Label = FieldLabel;
Field.Input = FieldInput;
Field.HelperText = FieldHelperText;
Field.ErrorText = FieldErrorText;
