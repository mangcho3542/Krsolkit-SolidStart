import { SvgProps, Svg } from "./Svg";
import { splitProps } from "solid-js";
import CloseIcon from "@images/CloseIcon.svg";
import { splitStyle } from "@/utils/splitStyle";
import styles from "@styles/CloseBtn.module.css";

export interface CloseBtnProps extends Omit<SvgProps, "src"> {
  useDefaultStyle?: boolean;
}

export function CloseBtn(props: CloseBtnProps) {
  const [local, rest] = splitProps(props, [
    "class",
    "classList",
    "id",
    "useDefaultStyle",
  ]);

  return (
    <Svg
      src={CloseIcon}
      {...rest}
      {...splitStyle(local, { class: styles.CloseBtn })}
    />
  );
}

export default CloseBtn;