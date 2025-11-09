import styles from "@styles/PasswordInput.module.css";
import {
  PasswordInput as PI,
  PasswordInputRootProps as RootProps,
  PasswordInputLabelProps as PiLabelProps,
  PasswordInputControlProps as PiControlProps,
  PasswordInputInputProps as PiInputProps,
  PasswordInputVisibilityTriggerProps as PiVisibleProps,
  PasswordInputIndicatorProps as PiIndicatorProps
} from "@ark-ui/solid/password-input";
import { JSX, JSXElement } from "solid-js";
import { splitProps } from "solid-js";
import EyeIcon from "@images/EyeIcon.svg?raw";
import EyeOff from "@images/EyeOff.svg?raw";
import { SvgProps, Svg } from "./Svg";
import { Hex } from "@/types/ColorType";
import { splitComponentProps } from "@/utils/splitComponentProps";
import type { PUS } from "@/types/ComponentProps";

type LabelProps = PUS<PiLabelProps>;
type ControlProps = PUS<PiControlProps>;
type InputProps = PUS<PiInputProps>;
type VisibleProps = PUS<PiVisibleProps>;
type IndicatorProps = Omit<PUS<PiIndicatorProps>, "fallback">;

type PasswordInputProps = PUS<RootProps> & {
  LabelProps?: LabelProps;
  Label?: JSXElement;
  ControlProps?: ControlProps;
  InputProps?: InputProps;
  VisibleTriggerProps?: VisibleProps;
  IndicatorProps?: Omit<IndicatorProps, "fallback">;
  EyeProps?: Omit<SvgProps, "src">;
  EyeOffProps?: Omit<SvgProps, "src">;
}

function EyeIconComp(props: Omit<SvgProps, "value">) {
  return (
    <Svg
      class={props.class}
      classList={props.classList}
      id={props.id}
      color={props.color ?? ("#262628" as Hex)}
      value={EyeIcon}
    />
  );
}

function EyeOffComp(props: Omit<SvgProps, "value">) {
  return (
    <Svg
      class={props.class}
      classList={props.classList}
      id={props.id}
      color={props.color ?? ("#262628" as Hex)}
      value={EyeOff}
    />
  );
}

export function PasswordInput(props: PasswordInputProps) {
  const [local, style, rest] = splitProps(props, [
    "LabelProps",
    "Label",
    "ControlProps",
    "InputProps",
    "VisibleTriggerProps",
    "IndicatorProps",
    "EyeProps",
    "EyeOffProps"
  ], 
  [
    "class",
    "id",
    "classList",
    "style",
    "useDefaultStyle"
  ]);

  return (
    <PI.Root {...rest} {...splitComponentProps(style, styles.Root)}>
      <PI.Label {...splitComponentProps(local.LabelProps, styles.Label)}>{local.Label}</PI.Label>

      <PI.Control {...splitComponentProps(local.ControlProps, styles.Control)}>
        <PI.Input {...splitComponentProps(local.InputProps, styles.Input)} />
        <PI.VisibilityTrigger {...splitComponentProps(local.VisibleTriggerProps, styles.VisibleTrigger)}>
          <PI.Indicator
            {...splitComponentProps(local.IndicatorProps, styles.Indicator)}
            fallback={<EyeIconComp {...splitComponentProps(local.EyeProps, styles.Eye)} />}
          >
            <EyeOffComp {...splitComponentProps(local.EyeOffProps, styles.EyeOff)} />
          </PI.Indicator>
        </PI.VisibilityTrigger>
      </PI.Control>
    </PI.Root>
  );
}

export default PasswordInput;