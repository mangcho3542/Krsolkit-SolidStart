import { ComponentBaseProps } from "@/types/ComponentProps";

interface Props extends ComponentBaseProps {
  useDefaultStyle?: bool;
  [k: string]: any;
}

function splitComponentProps(props: Props | undefined, defaultClass: string) {
  if(!props) return {};

  return {
    class:props.class,
    id: props.id,
    classList: {
      defaultClass: props.useDefaultStyle === undefined
      ? true
      : props.useDefaultStyle
    }
  }
}