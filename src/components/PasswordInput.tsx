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

interface ComponentProps {
  class?: string;
  classList?: { [k: string]: boolean | undefined };
  id?: string;
}

interface PasswordInputProps extends RootProps {
  LabelProps?: LabelProps;
  Label?: JSXElement;
  ControlProps?: ControlProps;
  InputProps?: InputProps;
  VisibleTriggerProps?: VisibleProps;
  IndicatorProps?: Omit<IndicatorProps, "fallback">;
  EyeProps?: ComponentProps;
  EyeOffProps?: ComponentProps;
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
            fallback={<image href={EyeIcon} {...local.EyeProps} />}
          >
            <image href={EyeOff} {...local.EyeOffProps} />
          </PI.Indicator>
        </PI.VisibilityTrigger>
      </PI.Control>
    </PI.Root>
  );
}

export default PasswordInput;
