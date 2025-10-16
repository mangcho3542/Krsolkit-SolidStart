import styles from "@styles/Stack.module.css";
import { ComponentProps } from "@/types/ComponentProps";
import { splitProps } from "@utils/splitProps";

export interface StackProps extends Omit<ComponentProps, "display"> {}

export default function Stack(props: StackProps) {
  const [local, styling, rest] = splitProps(props, ["children"]);

  return (
    <div
      class={styles.Stack + " " + styling.class}
      classList={styling.classList}
      style={styling.style}
      {...rest}
    >
      {local.children}
    </div>
  );
}
