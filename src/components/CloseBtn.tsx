import { SvgProps, Svg } from "./Svg";
import { splitProps } from "solid-js";
import CloseIcon from "@images/CloseIcon.svg?raw";
import styles from "@styles/CloseBtn.module.css";
import { BtnProps } from "./Btn";
import { convertCss } from "@/utils/converCss";
import { splitComponentProps } from "@/utils/splitComponentProps";

interface SvgPropsI extends Omit<SvgProps, "value"> {
  useDefaultStyle: boolean;
}

export interface CloseBtnProps extends BtnProps {
  SvgProps?: SvgPropsI;
}

export function CloseBtn(props: CloseBtnProps) {
  const [local, rest] = splitProps(props, [
    "useDefaultStyle",
    "ref",
    "SvgProps",
  ]);

  return (
    <button
      ref={local.ref}
      class={rest.class}
      id={rest.id}
      classList={{
        [styles.CloseBtn]:
          local.useDefaultStyle === undefined ? true : local.useDefaultStyle,
        ...rest.classList,
      }}
      style={convertCss(rest.css)}
      {...rest}
    >
      <Svg
        value={CloseIcon}
        {...splitComponentProps(props.SvgProps, styles.CloseBtnSvg)}
      />
    </button>
  );
}

export default CloseBtn;