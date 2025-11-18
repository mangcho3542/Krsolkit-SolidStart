import styles from "@styles/Field.module.css";
import styles2 from "./signup.module.css";
import { splitComponentProps } from "@/utils/splitComponentProps";
import {
  Field as ArkField,
  FieldRootProps,
  FieldInputProps,
  FieldLabelProps,
  FieldHelperTextProps,
  FieldErrorTextProps,
} from "@ark-ui/solid/field";
import { Timer, TimerProps } from "@components/Timer";
import { JSX, JSXElement, splitProps } from "solid-js";
import Btn, { BtnProps } from "@/components/Btn";

interface InputProps extends Omit<FieldInputProps, "style"> {
  useDefaultStyle?: boolean;
  style?: JSX.CSSProperties;
}

interface LabelProps extends Omit<FieldLabelProps, "style"> {
  useDefaultStyle?: boolean;
  style?: JSX.CSSProperties;
}

interface HelperTextProps extends Omit<FieldHelperTextProps, "style"> {
  useDefaultStyle?: boolean;
  style?: JSX.CSSProperties;
}

interface ErrorTextProps extends Omit<FieldErrorTextProps, "style"> {
  useDefaultStyle?: boolean;
  style?: JSX.CSSProperties;
}

export interface EmailInputProps extends Omit<FieldRootProps, "style" | "HelperText">, Omit<TimerProps, "second"> {
  InputProps?: InputProps;
  LabelProps?: LabelProps;
  Label?: JSXElement;
  HelperTextProps?: HelperTextProps;
  ErrorTextProps?: ErrorTextProps;
  ErrorText?: JSXElement;
  style?: JSX.CSSProperties;
  BtnProps?: BtnProps;
}

export function EmailInput(props: EmailInputProps) {
  const [local, style, rest] = splitProps(
    props,
    [
      "InputProps",
      "LabelProps",
      "Label",
      "HelperTextProps",
      "ErrorText",
      "ErrorTextProps",
      "BtnProps",
      "required",
      "isRunning",
      "onEnd"
    ],
    ["class", "id", "classList", "style"]
  );

  return (
    <ArkField.Root
      {...rest}
      {...splitComponentProps(style, styles.Root)}
      required={local.required}
    >
      <ArkField.Label {...splitComponentProps(local.LabelProps, styles.Label)}>
        {local.Label}
        <ArkField.RequiredIndicator class={styles.RequiredIndicator} />
      </ArkField.Label>

      <div id={styles2.InputGroup}>
        <ArkField.Input
          {...splitComponentProps(local.InputProps, styles2.EmailInput)}
          inputmode="email"
        />
        <div id={styles2.EmailBtnWrapper}>
          <Btn id={styles2.EmailBtn} {...local.BtnProps}>
            이메일 인증
          </Btn>
        </div>
      </div>

      <ArkField.HelperText
        {...splitComponentProps(local.HelperTextProps, styles.HelperText)}
      >
        <div id={styles2.TimerWrapper}>
          <Timer second={300} isRunning={local.isRunning} onEnd={local.onEnd} />
        </div>
      </ArkField.HelperText>

      <ArkField.ErrorText
        {...splitComponentProps(local.ErrorTextProps, styles.ErrorText)}
      >
        {local.ErrorText}
      </ArkField.ErrorText>
    </ArkField.Root>
  );
}

export default EmailInput;