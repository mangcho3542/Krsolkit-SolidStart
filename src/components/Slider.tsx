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
import { createMemo, JSXElement } from "solid-js";
import { splitProps } from "solid-js";
import styles from "@styles/Slider.module.css";
import { CssProperties } from "@/types/CssProperties";
import { convertCss } from "@/utils/converCss";
import { splitComponentProps } from "@/utils/splitComponentProps";

interface SliderLabelProps extends ArkSliderLabelProps {
  useDefaultStyle?: boolean;
}
interface SliderValueTextProps extends ArkSliderValueTextProps {
  useDefaultStyle?: boolean;
}
interface SliderControlProps extends ArkSliderControlProps {
  useDefaultStyle?: boolean;
}
interface SliderTrackProps extends ArkSliderTrackProps {
  useDefaultStyle?: boolean;
}
interface SliderRangeProps extends ArkSliderRangeProps {
  useDefaultStyle?: boolean;
}
interface SliderThumbProps extends ArkSliderThumbProps {
  useDefaultStyle?: boolean;
}

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
  css?: CssProperties;
}

interface Obj {
  class?: string;
  classList?: { [k: string]: boolean | undefined };
  id?: string;
  useDefaultStyle?: boolean;
}

export function Slider(p: SliderProps) {
  const [local, style, other, rest] = splitProps(
    p,
    [
      "useDefaultStyle",
      "aria-label",
      "aria-labelledby",
      "asChild",
      "defaultValue",
      "disabled",
      "form",
      "getAriaValueText",
      "css",
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
    ],
    ["class", "id", "classList"],
    [
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
    <ArkSlider.Root
      {...splitComponentProps(style, styles.Root)}
      {...rest}
      aria-label={local["aria-label"]}
      aria-labelledby={local["aria-labelledby"]}
      asChild={local.asChild}
      defaultValue={
        local.defaultValue !== undefined
          ? [local.defaultValue]
          : [local.min ?? 0]
      }
      disabled={local.disabled}
      form={local.form}
      getAriaValueText={local.getAriaValueText}
      ids={local.ids}
      invalid={local.invalid}
      max={local.max ?? 100}
      min={local.min ?? 0}
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
      <div style={{ display: "inline-block", width: "100%" }}>
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
          {...splitComponentProps(other.ThumbProps, styles.Thumb)}
          index={0}
        >
          <ArkSlider.HiddenInput />
        </ArkSlider.Thumb>
      </ArkSlider.Control>
    </ArkSlider.Root>
  );
}

export default Slider;