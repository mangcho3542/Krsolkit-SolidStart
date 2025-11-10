import styles from "@styles/PasswordInput.module.css";
import {
  PasswordInput as PI,
  PasswordInputRootProps as RootProps,
  PasswordInputLabelProps as PiLabelProps,
  PasswordInputControlProps as PiControlProps,
  PasswordInputInputProps as PiInputProps,
  PasswordInputVisibilityTriggerProps as PiVisibleProps,
  PasswordInputIndicatorProps as PiIndicatorProps,
} from "@ark-ui/solid/password-input";
import { JSXElement } from "solid-js";
import { splitProps } from "solid-js";
import { splitComponentProps } from "@/utils/splitComponentProps";
import type { ComponentBaseStyleProps, PUS } from "@/types/ComponentProps";
import { NoHydration } from "solid-js/web";

type LabelProps = PUS<PiLabelProps>;
type ControlProps = PUS<PiControlProps>;
type InputProps = PUS<PiInputProps>;
type VisibleProps = PUS<PiVisibleProps>;
type IndicatorProps = Omit<PUS<PiIndicatorProps>, "fallback">;

interface SvgProps extends Omit<ComponentBaseStyleProps, "children"> {}

type PasswordInputProps = PUS<RootProps> & {
  LabelProps?: LabelProps;
  Label?: JSXElement;
  ControlProps?: ControlProps;
  InputProps?: InputProps;
  VisibleTriggerProps?: VisibleProps;
  IndicatorProps?: Omit<IndicatorProps, "fallback">;
  EyeProps?: SvgProps;
  EyeOffProps?: SvgProps;
};

function EyeIconComp(props: SvgProps) {
  return (
    <NoHydration>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        width="24"
        height="24"
        {...splitComponentProps(props, styles.EyeIcon)}
      >
        <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
        <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
        <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
        <path d="m2 2 20 20" />
      </svg>
    </NoHydration>
  );
}

function EyeOffComp(props: SvgProps) {
  return (
    <NoHydration>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        width="24"
        height="24"
        {...splitComponentProps(props, styles.EyeOffIcon)}
      >
        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    </NoHydration>
  );
}

export function PasswordInput(props: PasswordInputProps) {
  const [local, style, rest] = splitProps(
    props,
    [
      "LabelProps",
      "Label",
      "ControlProps",
      "InputProps",
      "VisibleTriggerProps",
      "IndicatorProps",
      "EyeProps",
      "EyeOffProps",
    ],
    ["class", "id", "classList", "style", "useDefaultStyle"]
  );

  return (
    <PI.Root {...rest} {...splitComponentProps(style, styles.Root)}>
      <PI.Label {...splitComponentProps(local.LabelProps, styles.Label)}>
        {local.Label}
      </PI.Label>

      <PI.Control {...splitComponentProps(local.ControlProps, styles.Control)}>
        <PI.Input {...splitComponentProps(local.InputProps, styles.Input)} />
        <PI.VisibilityTrigger
          {...splitComponentProps(
            local.VisibleTriggerProps,
            styles.VisibleTrigger
          )}
        >
          <PI.Indicator
            {...splitComponentProps(local.IndicatorProps, styles.Indicator)}
            fallback={
              <EyeIconComp
                {...splitComponentProps(local.EyeProps, styles.EyeIcon)}
              />
            }
          >
            <EyeOffComp {...local.EyeOffProps} />
          </PI.Indicator>
        </PI.VisibilityTrigger>
      </PI.Control>
    </PI.Root>
  );
}

export default PasswordInput;