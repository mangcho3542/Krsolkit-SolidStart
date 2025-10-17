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
import Stack from "./Stack";
import { JSXElement, mergeProps } from "solid-js";
import { splitProps } from "@/utils/splitProps";

export interface SliderProps extends Omit<SliderRootProps, "defaultValue"> {
  LabelProps?: SliderLabelProps;
  Label?: JSXElement;
  ValueTextProps?: SliderValueTextProps;
  ControlProps?: SliderControlProps;
  TrackProps?: SliderTrackProps;
  RangeProps?: SliderRangeProps;
  ThumbProps?: Omit<SliderThumbProps, "index">;
  defaultValue?: number;
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

  const ValueTextProps: SliderValueTextProps = mergeProps(
    {
      style: {
        display: "inline-block",
        "margin-left": "auto"
      }
    },
    defaultProps.ValueTextProps ?? {}
  );

  const ThumbProps: SliderThumbProps = mergeProps(
    {
      index: 0,
      style: {
        width: "20px",
        height: "20px",
        "background-color": "#FFFFFF",
        border: "2px solid #18181b",
        "border-radius": "9999px",
        "box-shadow": "0px 1px 2px color-mix(in srgb, #18181b 10%, transparent), 0px 0px 1px color-mix(in srgb, #18181b 20%, transparent)",
        cursor: "pointer",
      }
    },
    defaultProps.ThumbProps ?? {}
  );

  const ControlProps: SliderControlProps = mergeProps(
    {
      style: {
        position: "relative" as const,
        display: "flex",
        "align-items": "center",
        width: "100%",
        "min-height": "20px",
      }
    },
    defaultProps.ControlProps ?? {}
  );

  const TrackProps: SliderTrackProps = mergeProps(
    {
      style: {
        position: "relative" as const,
        width: "100%",
        height: "8px",
        "background-color": "color-mix(in srgb, #e4e4e7 72%, transparent)",
        "border-radius": "9999px",
        overflow: "hidden",
        "box-shadow": "inset 0 0 0 1px color-mix(in srgb, black 5%, transparent)",
        "flex-grow": "1",
      }
    },
    defaultProps.TrackProps ?? {}
  );

  const RangeProps: SliderRangeProps = mergeProps(
    {
      style: {
        position: "absolute" as const,
        height: "8px",
        "background-color": "#18181b",
        "border-radius": "0px",
      }
    },
    defaultProps.RangeProps ?? {}
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