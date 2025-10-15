import { 
    Field as ArkField, 
    FieldRootProps,
    FieldInputProps,
    FieldLabelProps,
    FieldHelperTextProps,
    FieldErrorTextProps
} from "@ark-ui/solid/field";
import { JSXElement } from "solid-js";
import { splitProps } from "@/utils/splitProps";

export interface FieldProps extends FieldRootProps {
    InputProps?: FieldInputProps;
    LabelProps?: FieldLabelProps;
    Label?: JSXElement;
    HelperTextProps?: FieldHelperTextProps;
    HelperText?: JSXElement; 
    ErrorTextProps?: FieldErrorTextProps;
    ErrorText?: JSXElement;
}

export function Field(props: FieldProps) {
    const [local, style, others] = splitProps(props, [
        "InputProps", "LabelProps", "Label", "HelperTextProps", "HelperText", 
        "ErrorText", "ErrorTextProps", "required"
    ]);

    return (
        <ArkField.Root {...style} {...others}>
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
    )
}

export default Field;