import { ComponentBaseProps } from "@/types/ComponentProps";
import { AllColorType } from "@/types/ColorType";

export interface SvgProps extends ComponentBaseProps {
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
