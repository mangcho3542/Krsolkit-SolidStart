import { ComponentBaseProps } from "@/types/ComponentProps";
import { AllColorType } from "@/types/ColorType";
import { JSX } from "solid-js";

export interface SvgProps extends ComponentBaseProps, JSX.SvgSVGAttributes<SVGSVGElement> {
  src: string;
  color?: AllColorType;
}

export function Svg(props: SvgProps) {
  return (
    <div
      class={props.class}
      classList={props.classList}
      id={props.id}
      style={{ color: props.color ?? "#000000" }}
      innerHTML={props.src}
    />
  );
}

export default Svg;