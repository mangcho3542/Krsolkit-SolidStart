import styles from "@styles/Slider.module.css";
import {
  Slider as ArkSlider,
  SliderRootProps,
  SliderLabelProps,
  SliderValueTextProps,
  SliderControlProps,
  SliderRangeProps,
  SliderTrackProps,
  SliderThumbProps,
} from "@ark-ui/solid";
import { JSXElement, splitProps } from "solid-js";
import { splitComponentProps } from "@/utils/splitComponentProps";
import { ClientOnly } from "@ark-ui/solid";

interface LabelProps extends SliderLabelProps {
  useDefaultStyle?: boolean;
}
interface ValueTextProps extends SliderValueTextProps {
  useDefaultStyle?: boolean;
}
interface ControlProps extends SliderControlProps {
  useDefaultStyle?: boolean;
}
interface RangeProps extends SliderRangeProps {
  useDefaultStyle?: boolean;
}
interface TrackProps extends SliderTrackProps {
  useDefaultStyle?: boolean;
}
interface ThumbProps extends Omit<SliderThumbProps, "index"> {
  useDefaultStyle?: boolean;
}

export interface SliderProps extends Omit<SliderRootProps, "value"> {
  LabelProps?: LabelProps;
  Label?: JSXElement;
  ValueTextProps?: ValueTextProps;
  ControlProps?: ControlProps;
  RangeProps?: RangeProps;
  TrackProps?: TrackProps;
  ThumbProps?: ThumbProps;
}

export function Slider(props: SliderProps) {
  const [local, other, rest] = splitProps(
    props,
    ["min", "max", "thumbAlignment"],
    [
      "LabelProps",
      "Label",
      "ValueTextProps",
      "ControlProps",
      "RangeProps",
      "TrackProps",
      "ThumbProps",
    ]
  );

  return (
    <ClientOnly>
      <ArkSlider.Root
        min={local.min ?? 0}
        max={local.max ?? 100}
        style={{ width: "100%" }}
        thumbAlignment={local.thumbAlignment ?? "center"}
        {...rest}
      >
        <div class={styles.LabelWrapper}>
          <ArkSlider.Label
            {...splitComponentProps(other.LabelProps, styles.Label)}
          >
            {other.Label}
          </ArkSlider.Label>

          <ArkSlider.ValueText
            {...splitComponentProps(other.ValueTextProps, styles.ValueText)}
          />
        </div>

        <ArkSlider.Control
          {...splitComponentProps(other.ControlProps, styles.Control)}
        >
          <ArkSlider.Track
            {...splitComponentProps(other.TrackProps, styles.Track)}
          >
            <ArkSlider.Range
              {...splitComponentProps(other.RangeProps, styles.Range)}
            />
          </ArkSlider.Track>

          <ArkSlider.Thumb
            index={0}
            {...splitComponentProps(other.ThumbProps, styles.Thumb)}
          >
            <ArkSlider.HiddenInput />
          </ArkSlider.Thumb>
        </ArkSlider.Control>
      </ArkSlider.Root>
    </ClientOnly>
  );
}

export default Slider;