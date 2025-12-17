import styles from "@styles/Stack.module.css";
import { DivProps } from "@types";
import { splitProps } from "solid-js";
import { splitComponentProps } from "@utils";

export interface StackProps extends DivProps {
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
