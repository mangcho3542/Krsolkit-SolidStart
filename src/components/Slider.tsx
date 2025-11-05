import styles from "@styles/Slider.module.css";
import { ComponentBaseStyleProps } from "@/types/ComponentProps";
import { splitComponentProps } from "@/utils/splitComponentProps";
import { createMemo, createSignal, JSXElement, splitProps } from "solid-js";

interface PUD extends ComponentBaseStyleProps {
  useDefaultStyle?: boolean;
}

interface SliderProps extends PUD {
  LabelWrapperProps?: PUD;
  LabelProps?: PUD;
  Label?: JSXElement;
  ValueTextProps?: PUD;
  RangeProps?: PUD;
  ThumbProps?: PUD;
  TrackProps?: PUD;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
}

export function Slider(props: SliderProps) {
  const [local, other, rest] = splitProps(
    props,
    ["defaultValue", "min", "max", "step"],
    [
      "LabelWrapperProps",
      "LabelProps",
      "Label",
      "ValueTextProps",
      "RangeProps",
      "ThumbProps",
      "TrackProps",
    ]
  );

  const min = createMemo(() => local.min ?? 0);
  const max = createMemo(() => local.max ?? 0);

  return (
    <div {...splitComponentProps(rest, styles.Root)}>
      <div
        {...splitComponentProps(other.LabelWrapperProps, styles.LabelWrapper)}
      >
        {other.Label && (
          <label {...splitComponentProps(other.LabelProps, styles.Label)}>
            {other.Label}
          </label>
        )}

        {}
      </div>
    </div>
  );
}
