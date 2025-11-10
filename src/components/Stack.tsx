import styles from "@styles/Stack.module.css";
import { ComponentProps } from "@/types/ComponentProps";
import { splitProps } from "solid-js";
import { splitComponentProps } from "@/utils/splitComponentProps";

export interface StackProps extends ComponentProps {
  useDefaultStyle?: boolean;
}

export default function Stack(props: StackProps) {
  const [local, rest] = splitProps(props, ["children"]);

  return (
    <div
      {...splitComponentProps(rest, styles.Stack)}
    >
      {local.children}
    </div>
  );
}
