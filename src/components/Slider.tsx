import {
  Slider as ArkSlider,
  SliderRootProps,
  SliderLabelProps,
  SliderValueTextProps as ArkSliderValueTextProps,
  SliderControlProps as ArkSliderControlProps,
  SliderTrackProps as ArkSliderTrackProps,
  SliderRangeProps as ArkSliderRangeProps,
  SliderThumbProps as ArkSliderThumbProps,
} from "@ark-ui/solid/slider";
import Stack from "./Stack";
import { JSXElement, mergeProps } from "solid-js";
import { splitProps } from "@/utils/splitProps";
import styles from "@styles/Slider.module.css";

interface SliderValueTextProps extends ArkSliderValueTextProps {useDefaultStyle?: boolean;}
interface SliderControlProps extends ArkSliderControlProps {useDefaultStyle?: boolean;}
interface SliderTrackProps extends ArkSliderTrackProps {useDefaultStyle?: boolean;}
interface SliderRangeProps extends ArkSliderRangeProps {useDefaultStyle?: boolean;}
interface SliderThumbProps extends ArkSliderThumbProps {useDefaultStyle?: boolean;}

export interface SliderProps extends Omit<SliderRootProps, "defaultValue"> {
  LabelProps?: SliderLabelProps;
  Label?: JSXElement;
  ValueTextProps?: SliderValueTextProps;
  ControlProps?: SliderControlProps;
  TrackProps?: SliderTrackProps;
  RangeProps?: SliderRangeProps;
  ThumbProps?: Omit<SliderThumbProps, "index">;
  defaultValue?: number;
  useDefaultStyle?: boolean;
}

export function Slider(props: SliderProps) {
  const defaultProps = mergeProps(
    {
      defaultValue: props.min ?? 0,
      min: 0,
      max: 100,
    },
    props
  );

  const [local, styling, rest] = splitProps(defaultProps, [
    "LabelProps",
    "Label",
    "ValueTextProps",
    "ControlProps",
    "TrackProps",
    "RangeProps",
    "ThumbProps",
    "aria-label",
    "aria-labelledby",
    "asChild",
    "defaultValue",
    "disabled",
    "form",
    "getAriaValueText",
    "id",
    "ids",
    "invalid",
    "max",
    "min",
    "minStepsBetweenThumbs",
    "name",
    "onFocusChange",
    "onValueChange",
    "onValueChangeEnd",
    "orientation",
    "origin",
    "readOnly",
    "step",
    "thumbAlignment",
    "thumbSize",
    "value",
  ]);

  const ValueTextProps: ArkSliderValueTextProps = {
    class: (local.ValueTextProps?.useDefaultStyle ?? styles.ValueText + " ") + 
    (local.ValueTextProps?.class ?? ""),
    ...local.ValueTextProps
  }

  const ThumbProps: SliderThumbProps = {
    index: 0,
    style: {
      cursor: "pointer"
    },
    class: (local.ThumbProps?.useDefaultStyle ?? styles.Thumb + " ")
    + (local.ThumbProps?.class ?? ""),
    ...local.ThumbProps
  };

  const ControlProps: SliderControlProps = {
    class: (local.ControlProps?.useDefaultStyle ?? styles.Control + " ")
    + (local.ControlProps?.class ?? ""),
    ...local.ControlProps
  };

  const TrackProps: SliderTrackProps = {
    class: (local.TrackProps?.useDefaultStyle ?? styles.Track + " ")
    + (local.TrackProps?.class ?? "")
  };

  const RangeProps: SliderRangeProps = {
    class: (local.RangeProps?.useDefaultStyle ?? styles.Range + " ") 
    + (local.RangeProps?.class ?? ""),
    ...local.RangeProps
  };

  return (
    <ArkSlider.Root
    class={styling.class}
    classList={styling.classList}
    style={{
      display: styling.style.display ?? "flex",
      "flex-direction": styling.style["flex-direction"] ?? "column",
      ...styling.style,
    }}
    {...rest}
    aria-label={local["aria-label"]}
    aria-labelledby={local["aria-labelledby"]}
    asChild={local.asChild}
    defaultValue={local.defaultValue !== undefined ? [local.defaultValue] : undefined}
    disabled={local.disabled}
    form={local.form}
    getAriaValueText={local.getAriaValueText}
    id={local.id}
    ids={local.ids}
    invalid={local.invalid}
    max={local.max}
    min={local.min}
    minStepsBetweenThumbs={local.minStepsBetweenThumbs}
    name={local.name}
    onFocusChange={local.onFocusChange}
    onValueChange={local.onValueChange}
    onValueChangeEnd={local.onValueChangeEnd}
    orientation={local.orientation}
    origin={local.origin}
    readOnly={local.readOnly}
    step={local.step}
    thumbAlignment={local.thumbAlignment}
    thumbSize={local.thumbSize}
    value={local.value}
    >
      <Stack flexDirection="row">
        <ArkSlider.Label {...local.LabelProps}>
          {local.Label}
        </ArkSlider.Label>
        <ArkSlider.ValueText {...ValueTextProps} />
      </Stack>
      <ArkSlider.Control {...ControlProps}>
        <ArkSlider.Track {...TrackProps}>
          <ArkSlider.Range {...RangeProps} />
        </ArkSlider.Track>
        <ArkSlider.Thumb {...ThumbProps}>
          <ArkSlider.HiddenInput />
        </ArkSlider.Thumb>
      </ArkSlider.Control>
    </ArkSlider.Root>
  );
}

export default Slider;