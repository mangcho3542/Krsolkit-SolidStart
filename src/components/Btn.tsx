import { ComponentBaseProps } from "@/types/ComponentProps";
import { splitProps, JSX } from "solid-js";
import styles from "@styles/Btn.module.css";
import { convertCss } from "@/utils/converCss";

export interface BtnIntrinsic
  extends Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, ""> {}

export interface BtnProps extends ComponentBaseProps, BtnIntrinsic {
  ref?: HTMLButtonElement | ((el: HTMLButtonElement) => void);
  children?: JSX.Element;
  useDefaultStyle?: bool;
}

export default function Btn(props: BtnProps): JSX.Element {
  const [local, rest] = splitProps(props, [
    "class",
    "useDefaultStyle",
    "classList",
    "id",
    "css",
    "children",
    "ref",
  ]);

  return (
    <button
      class={local.class}
      classList={{
        ...local.classList,
        [styles.Btn]:
          local.useDefaultStyle === undefined ? true : local.useDefaultStyle,
      }}
      id={local.id}
      style={convertCss(local.css)}
      ref={local.ref}
      {...rest}
    >
      {local.children}
    </button>
  );
}