import { ComponentBaseProps } from "@/types/ComponentProps";
import { AllColorType } from "@/types/ColorType";
import { JSX, splitProps } from "solid-js";

export interface SvgProps extends ComponentBaseProps, JSX.SvgSVGAttributes<SVGSVGElement> {
  value: string;
  color?: AllColorType;
}

export function Svg(props: SvgProps) {
  const [local, rest] = splitProps(props, ["class", "classList", "id", "style", "value"]);
  
  return (
    <div
      class={local.class}
      classList={local.classList}
      id={local.id}
      style={{ color: props.color ?? "var(--svg-color)"}}
      innerHTML={props.value}
    />
  );
}

export default Svg;