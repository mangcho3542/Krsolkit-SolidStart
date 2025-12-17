import {
  Slider as ArkSlider,
  SliderRootProps,
  SliderLabelProps as ArkSliderLabelProps,
  SliderValueTextProps as ArkSliderValueTextProps,
  SliderControlProps as ArkSliderControlProps,
  SliderTrackProps as ArkSliderTrackProps,
  SliderRangeProps as ArkSliderRangeProps,
  SliderThumbProps as ArkSliderThumbProps,
} from "@ark-ui/solid/slider";
import { JSXElement, splitProps, JSX } from "solid-js";
import styles from "@styles/Slider.module.css";
import { splitComponentProps } from "@utils";
import { ComponentProps } from "@types";

interface SliderLabelWrapperProps extends ComponentProps {
  useDefaultStyle?: boolean;
  style?: JSX.CSSProperties;
}
interface SliderLabelProps extends Omit<ArkSliderLabelProps, "style"> {
  useDefaultStyle?: boolean;
  style?: JSX.CSSProperties;
}
interface SliderValueTextProps extends Omit<ArkSliderValueTextProps, "style"> {
  useDefaultStyle?: boolean;
  style?: JSX.CSSProperties;
}
interface SliderControlProps extends Omit<ArkSliderControlProps, "style"> {
  useDefaultStyle?: boolean;
  style?: JSX.CSSProperties;
}
interface SliderTrackProps extends Omit<ArkSliderTrackProps, "style"> {
  useDefaultStyle?: boolean;
  style?: JSX.CSSProperties;
}
interface SliderRangeProps extends Omit<ArkSliderRangeProps, "style"> {
  useDefaultStyle?: boolean;
  style?: JSX.CSSProperties;
}
interface SliderThumbProps extends Omit<ArkSliderThumbProps, "style"> {
  useDefaultStyle?: boolean;
  style?: JSX.CSSProperties;
}

export interface SliderProps extends Omit<SliderRootProps, "style"> {
  LabelWrapperProps?: SliderLabelWrapperProps;
  LabelProps?: SliderLabelProps;
  Label?: JSXElement;
  ValueTextProps?: SliderValueTextProps;
  ControlProps?: SliderControlProps;
  TrackProps?: SliderTrackProps;
  RangeProps?: SliderRangeProps;
  ThumbProps?: Omit<SliderThumbProps, "index">;
  useDefaultStyle?: boolean;
  style?: JSX.CSSProperties;
}

export function Slider(props: SliderProps) {
  const [local, rest] = splitProps(
    props,
    [
      "LabelWrapperProps",
      "LabelProps",
      "Label",
      "ValueTextProps",
      "ControlProps",
      "TrackProps",
      "RangeProps",
      "ThumbProps",
    ]
  );

  return (
    <ArkSlider.Root {...splitComponentProps(style, styles.Root)} {...rest}>
      <div
        {...splitComponentProps(local.LabelWrapperProps, styles.LabelWrapper)}
      >
        <ArkSlider.Label
          {...splitComponentProps(local.LabelProps, styles.Label)}
        >
          {local.Label}
        </ArkSlider.Label>
        <ArkSlider.ValueText
          {...splitComponentProps(local.ValueTextProps, styles.ValueText)}
        />
      </div>

      <ArkSlider.Control
        {...splitComponentProps(local.ControlProps, styles.Control)}
      >
        <ArkSlider.Track
          {...splitComponentProps(local.TrackProps, styles.Track)}
        >
          <ArkSlider.Range
            {...splitComponentProps(local.RangeProps, styles.Range)}
          />
        </ArkSlider.Track>

        <ArkSlider.Thumb
          index={0}
          {...splitComponentProps(local.ThumbProps, styles.Thumb)}
          draggable={true}
        >
          <ArkSlider.HiddenInput />
        </ArkSlider.Thumb>
      </ArkSlider.Control>
    </ArkSlider.Root>
  );
}

export default Slider;