import { ComponentProps } from "@/types/ComponentProps";
import { splitProps } from "@utils/splitProps";

export default function Box(props: ComponentProps) {
  const [local, style, rest] = splitProps(props, ["children"]);

  return (
    <div {...style} {...rest}>
      {local.children}
    </div>
  );
}
