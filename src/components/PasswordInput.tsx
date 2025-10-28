import {
  PasswordInput as PI,
  PasswordInputRootProps as RootProps,
  PasswordInputLabelProps as LabelProps,
  PasswordInputControlProps as ControlProps,
  PasswordInputInputProps as InputProps,
  PasswordInputVisibilityTriggerProps as VisibleProps,
  PasswordInputIndicatorProps as IndicatorProps,
} from "@ark-ui/solid/password-input";
import { JSXElement } from "solid-js";
import { splitProps } from "solid-js";
import EyeIcon from "@images/EyeIcon.svg?raw";
import EyeOff from "@images/EyeOff.svg?raw";
import { SvgProps, Svg } from "./Svg";
import { Hex } from "@/types/ColorType";
import { CssProperties } from "@/types/CssProperties";
import { convertCss } from "@/utils/converCss";

interface PasswordInputProps extends RootProps {
  LabelProps?: LabelProps;
  Label?: JSXElement;
  ControlProps?: ControlProps;
  InputProps?: InputProps;
  VisibleTriggerProps?: VisibleProps;
  IndicatorProps?: Omit<IndicatorProps, "fallback">;
  EyeProps?: Omit<SvgProps, "src">;
  EyeOffProps?: Omit<SvgProps, "src">;
  css?: CssProperties;
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
  const [local, rest] = splitProps(props, [
    "LabelProps",
    "Label",
    "ControlProps",
    "InputProps",
    "VisibleTriggerProps",
    "IndicatorProps",
    "EyeProps",
    "EyeOffProps",
    "css"
  ]);

  return (
    <PI.Root style={convertCss(local.css)} {...rest}>
      <PI.Label {...local.LabelProps}>{local.Label}</PI.Label>

      <PI.Control {...local.ControlProps}>
        <PI.Input {...local.InputProps} />
        <PI.VisibilityTrigger {...local.VisibleTriggerProps}>
          <PI.Indicator
            {...local.IndicatorProps}
            fallback={<EyeIconComp {...local.EyeProps} />}
          >
            <EyeOffComp {...local.EyeOffProps} />
          </PI.Indicator>
        </PI.VisibilityTrigger>
      </PI.Control>
    </PI.Root>
  );
}

export default PasswordInput;