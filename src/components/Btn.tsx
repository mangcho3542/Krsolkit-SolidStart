import { ComponentProps } from "@/types/ComponentProps";
import { splitProps } from "@/utils/splitProps";
import { mergeProps, JSX } from "solid-js";
import styles from "@styles/Btn.module.css";

interface BtnProps extends ComponentProps {
  ref?: HTMLButtonElement | ((el: HTMLButtonElement) => void);
}

export default function Btn(props: BtnProps): JSX.Element {
  const [local, styling, others] = splitProps(props, ["children", "ref"]);

  const defaultStyle = {
    "min-width": "40px",
    "min-height": "40px",
    "border-radius": "4px",
  };

  const style = mergeProps(defaultStyle, styling.style ?? {});

  return (
    <button
      class={styles.Btn + " " + styling.class}
      classList={styling.classList}
      style={style}
      ref={local.ref}
      {...others}
    >
      {local.children}
    </button>
  );
}
