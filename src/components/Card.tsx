import { ComponentBaseStyleProps } from "@/types/ComponentProps";
import { JSXElement, splitProps } from "solid-js";
import styles from "@styles/Card.module.css";
import { splitComponentProps } from "@/utils/splitComponentProps";

interface PUD extends ComponentBaseStyleProps {
  useDefaultStyle?: boolean;
}

export interface CardProps extends PUD {
  Icon?: JSXElement;
  DescProps?: PUD;
}

export function Card(props: CardProps) {
  const [local, rest] = splitProps(props, ["Icon", "DescProps", "children"]);

  return (
    <div
    {...splitComponentProps(rest, styles.Card)}
    >
      {local.Icon}
      <div {...splitComponentProps(local.DescProps, styles.CardDesc)}>
        {local.children}
      </div>
    </div>
  )
}