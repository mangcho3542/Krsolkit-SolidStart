import { A as Anchor } from "@solidjs/router";
import { ComponentProps } from "@/types/ComponentProps";
import { splitProps } from "@/utils/splitProps";
import styles from "@styles/A.module.css";

export interface AProps extends ComponentProps {
  href: string;
  target?: "_self" | "_blank" | "_parent" | "_top";
}

export default function A(props: AProps) {
  const [local, style, rest] = splitProps(props, [
    "target",
    "href",
    "children",
  ]);

  return (
    <Anchor
      class={styles.A + " " + style.class}
      classList={style.classList}
      target={local.target ?? "_self"}
      href={local.href}
      {...rest}
    >
      {local.children}
    </Anchor>
  );
}