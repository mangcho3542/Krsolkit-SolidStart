import { ComponentProps, PUS } from "@/types/ComponentProps";
import { splitProps, JSX } from "solid-js";
import styles from "@styles/Btn.module.css";

export interface BtnIntrinsic
  extends Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, ""> {}

export interface BtnProps extends ComponentProps, PUS<BtnIntrinsic> {
  ref?: HTMLButtonElement | ((el: HTMLButtonElement) => void);
}

export default function Btn(props: BtnProps): JSX.Element {
  const [local, rest] = splitProps(props, ["children"]);

  return <button {...rest}>{local.children}</button>;
}