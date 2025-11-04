import { A as Anchor } from "@solidjs/router";
import { ComponentBaseStyleProps } from "@/types/ComponentProps";
import styles from "@styles/A.module.css";
import { splitProps } from "solid-js";

export interface AProps extends ComponentBaseStyleProps {
  href: string;
  target?: "_self" | "_blank" | "_parent" | "_top";
  useDefaultStyle?: boolean;
  inactiveClass?: string;
  activeClass?: string;
}

export default function A(props: AProps) {
  const [local, rest] = splitProps(props, [
    "href",
    "target",
    "children",
    "useDefaultStyle",
    "class",
    "classList",
    "id",
    "inactiveClass",
    "activeClass",
  ]);

  return (
    <Anchor
      class={local.class}
      classList={{
        [styles.A]:
          local.useDefaultStyle === undefined ? true : local.useDefaultStyle,
      }}
      id={local.id}
      target={local.target ?? "_self"}
      href={local.href}
      inactiveClass={local.inactiveClass}
      activeClass={local.activeClass}
      {...rest}
    >
      {local.children}
    </Anchor>
  );
}