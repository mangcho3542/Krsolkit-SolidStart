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
import { splitProps } from "@utils/splitProps";
import EyeIcon from "@images/EyeIcon.svg";
import EyeOff from "@images/EyeOff.svg";
import { SvgProps, Svg } from "./Svg";
import { Hex } from "@/types/ColorType";

interface PasswordInputProps extends RootProps {
  LabelProps?: LabelProps;
  Label?: JSXElement;
  ControlProps?: ControlProps;
  InputProps?: InputProps;
  VisibleTriggerProps?: VisibleProps;
  IndicatorProps?: Omit<IndicatorProps, "fallback">;
  EyeProps?: Omit<SvgProps, "src">;
  EyeOffProps?: Omit<SvgProps, "src">;
}

function EyeIconComp(props: Omit<SvgProps, "src">) {
  return (
    <Svg
      class={props.class}
      classList={props.classList}
      id={props.id}
      color={props.color ?? ("#262628" as Hex)}
      src={EyeIcon}
    />
  );
}

function EyeOffComp(props: Omit<SvgProps, "src">) {
  return (
    <Svg
      class={props.class}
      classList={props.classList}
      id={props.id}
      color={props.color ?? ("#262628" as Hex)}
      src={EyeOff}
    />
  );
}

export function PasswordInput(props: PasswordInputProps) {
  const [local, style, others] = splitProps(props, [
    "LabelProps",
    "Label",
    "ControlProps",
    "InputProps",
    "VisibleTriggerProps",
    "IndicatorProps",
    "EyeProps",
    "EyeOffProps",
  ]);

  return (
    <PI.Root {...style} {...others}>
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