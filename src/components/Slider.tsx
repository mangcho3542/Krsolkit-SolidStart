import {
  Slider as ArkSlider,
  SliderRootProps,
  SliderLabelProps,
  SliderValueTextProps,
  SliderControlProps,
  SliderTrackProps,
  SliderRangeProps,
  SliderThumbProps,
} from "@ark-ui/solid/slider";
import { JSXElement } from "solid-js";
import { splitProps } from "@/utils/splitProps";

export interface SliderProps extends SliderRootProps {
  LabelProps?: SliderLabelProps;
  Label?: JSXElement;
  ValueTextProps?: SliderValueTextProps;
  ControlProps?: SliderControlProps;
  TrackProps?: SliderTrackProps;
  RangeProps?: SliderRangeProps;
  ThumbProps?: Omit<SliderThumbProps, "index">;
}

export function Slider(props: SliderProps) {
  const [local, styling, rest] = splitProps(props, [
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

  return (
    <ArkSlider.Root
      {...styling}
      {...rest}
      aria-label={local["aria-label"]}
      aria-labelledby={local["aria-labelledby"]}
      asChild={local.asChild}
      defaultValue={local.defaultValue}
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
      <ArkSlider.Label {...local.LabelProps}>{local.Label}</ArkSlider.Label>
      <ArkSlider.ValueText {...local.ValueTextProps} />
      <ArkSlider.Control {...local.ControlProps}>
        <ArkSlider.Track {...local.TrackProps}>
          <ArkSlider.Range {...local.RangeProps} />
        </ArkSlider.Track>

        <ArkSlider.Thumb index={0} {...local.ThumbProps}>
          <ArkSlider.HiddenInput />
        </ArkSlider.Thumb>
      </ArkSlider.Control>
    </ArkSlider.Root>
  );
}

export default Slider;