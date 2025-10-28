import { CssProperties } from "@/types/CssProperties";
import { convertCss } from "@/utils/converCss";
import {
  Field as ArkField,
  FieldRootProps,
  FieldInputProps,
  FieldLabelProps,
  FieldHelperTextProps,
  FieldErrorTextProps,
} from "@ark-ui/solid/field";
import { JSXElement, splitProps } from "solid-js";


export interface FieldProps extends FieldRootProps {
  InputProps?: FieldInputProps;
  LabelProps?: FieldLabelProps;
  Label?: JSXElement;
  HelperTextProps?: FieldHelperTextProps;
  HelperText?: JSXElement;
  ErrorTextProps?: FieldErrorTextProps;
  ErrorText?: JSXElement;
  css?: CssProperties;
}

export function Field(props: FieldProps) {
  const [local, others] = splitProps(props, [
    "InputProps",
    "LabelProps",
    "Label",
    "HelperTextProps",
    "HelperText",
    "ErrorText",
    "ErrorTextProps",
    "required",
    "css"
  ]);

  return (
    <ArkField.Root style={convertCss(local.css)} {...others}>
      <ArkField.Label {...local.LabelProps}>
        {local.Label}
        {local.required && <ArkField.RequiredIndicator />}
      </ArkField.Label>

      <ArkField.Input {...local.InputProps} />

      <ArkField.HelperText {...local.HelperTextProps}>
        {local.HelperText}
      </ArkField.HelperText>

      <ArkField.ErrorText {...local.ErrorTextProps}>
        {local.ErrorText}
      </ArkField.ErrorText>
    </ArkField.Root>
  );
}

export default Field;
