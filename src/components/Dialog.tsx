import { splitProps } from "solid-js";
import { SvgProps, Svg } from "./Svg";
import CloseIcon from "@images/CloseIcon.svg";
import styles from "@styles/Dialog.module.css";

interface CloseIconProps extends Omit<SvgProps, "src"> {
  useDefaultStyle?: boolean;
}

function CloseBtn(props: CloseIconProps) {
  const [local, rest] = splitProps(props, ["class", "useDefaultStyle"]);

  return (
    <Svg
      src={CloseIcon}
      class={
        local.class ??
        " " + (local.useDefaultStyle !== undefined && local.useDefaultStyle)
          ? styles.CloseBtn
          : ""
      }
      {...rest}
    />
  );
}

function Dialog() {}
