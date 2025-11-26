import styles from "@styles/Field.module.css";
import { splitComponentProps } from "@/utils/splitComponentProps";
import {
  Field as ArkField,
  FieldRootProps,
  FieldInputProps,
  FieldLabelProps,
  FieldHelperTextProps,
  FieldErrorTextProps,
} from "@ark-ui/solid/field";
import { JSX, JSXElement, splitProps } from "solid-js";

export interface InputProps extends Omit<FieldInputProps, "style"> {
  useDefaultStyle?: boolean;
  style?: JSX.CSSProperties;
}

export interface LabelProps extends Omit<FieldLabelProps, "style"> {
  useDefaultStyle?: boolean;
  style?: JSX.CSSProperties;
}

export interface HelperTextProps extends Omit<FieldHelperTextProps, "style"> {
  useDefaultStyle?: boolean;
  style?: JSX.CSSProperties;
}

export interface ErrorTextProps extends Omit<FieldErrorTextProps, "style"> {
  useDefaultStyle?: boolean;
  style?: JSX.CSSProperties;
}

export interface FieldProps extends Omit<FieldRootProps, "style"> {
  InputProps?: InputProps;
  LabelProps?: LabelProps;
  Label?: JSXElement;
  HelperTextProps?: HelperTextProps;
  HelperText?: JSXElement;
  ErrorTextProps?: ErrorTextProps;
  ErrorText?: JSXElement;
  style?: JSX.CSSProperties;
}

export function Field(props: FieldProps) {
  const [local, style, rest] = splitProps(
    props,
    [
      "InputProps",
      "LabelProps",
      "Label",
      "HelperTextProps",
      "HelperText",
      "ErrorText",
      "ErrorTextProps",
      "required",
      "disabled",
    ],
    ["class", "id", "classList", "style"]
  );

  return (
    <ArkField.Root
      {...rest}
      {...splitComponentProps(style, styles.Root)}
      required={local.required}
      disabled={local.disabled}
    >
      <ArkField.Label
        {...splitComponentProps(local.LabelProps, styles.Label)}
        classList={{
          [styles.DisabledLabel]: local.disabled
        }}
      >
        {local.Label}
        <ArkField.RequiredIndicator class={styles.RequiredIndicator} />
      </ArkField.Label>

      <ArkField.Input
        {...splitComponentProps(local.InputProps, styles.Input)}
      />

      <ArkField.HelperText
        {...splitComponentProps(local.HelperTextProps, styles.HelperText)}
      >
        {local.HelperText}
      </ArkField.HelperText>

      <ArkField.ErrorText
        {...splitComponentProps(local.ErrorTextProps, styles.ErrorText)}
      >
        {local.ErrorText}
      </ArkField.ErrorText>
    </ArkField.Root>
  );
}

export default Field;
