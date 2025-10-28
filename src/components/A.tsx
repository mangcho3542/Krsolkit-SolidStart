import { A as Anchor } from "@solidjs/router";
import { ComponentProps } from "@/types/ComponentProps";
import styles from "@styles/A.module.css";
import { splitProps } from "solid-js";
import { convertCss } from "@/utils/converCss";

export interface AProps extends ComponentProps {
  href: string;
  target?: "_self" | "_blank" | "_parent" | "_top";
  useDefaultStyle?: boolean;
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
    "css"
  ]);

  return (
    <Anchor
      class={local.class}
      classList={{
        [styles.A]: local.useDefaultStyle === undefined
        ? true
        : local.useDefaultStyle
      }}
      id={local.id}
      style={convertCss(local.css)}
      target={local.target ?? "_self"}
      href={local.href}
      {...rest}
    >
      {local.children}
    </Anchor>
  );
}
