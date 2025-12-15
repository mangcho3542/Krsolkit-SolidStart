import { PUS, ButtonProps } from "@/types/ComponentProps";
import { splitProps, JSX } from "solid-js";
import { splitComponentProps } from "@/utils/splitComponentProps";
import styles from "@styles/Btn.module.css";

export type BtnProps = PUS<ButtonProps>;

export default function Btn(props: BtnProps): JSX.Element {
  const [local, rest] = splitProps(props, ["children"]);

  return <button {...splitComponentProps(rest, styles.Btn)}>{local.children}</button>;
}