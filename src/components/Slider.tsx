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
import Stack from "./Stack";
import { createMemo, JSXElement } from "solid-js";
import { splitProps } from "solid-js";
import styles from "@styles/Slider.module.css";
import { CssProperties } from "@/types/CssProperties";
import { convertCss } from "@/utils/converCss";

interface SliderLabelProps  extends ArkSliderLabelProps {
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

export function Slider(props: SliderProps) {
  const [local, rest] = splitProps(props, [
    "LabelProps",
    "Label",
    "ValueTextProps",
    "ControlProps",
    "TrackProps",
    "RangeProps",
    "ThumbProps",
    "useDefaultStyle", // 루트에서 읽어와서 하위에 전달
    // Ark props
    "aria-label",
    "aria-labelledby",
    "asChild",
    "defaultValue",
    "disabled",
    "form",
    "getAriaValueText",
    "id",
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
    "class",
    "classList",
    "id",
  ]);

  const style = createMemo(() => convertCss(local.css));

  return (
    <ArkSlider.Root
      class={local.class}
      classList={{ ...local.classList }}
      style={{
        display: style().display ?? "flex",
        "flex-direction": style()["flex-direction"] ?? "column",
        ...style(),
      }}
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
      id={local.id}
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
      <div style={{display:"inline-block", width: "100%"}}>
        <ArkSlider.Label 
        class={local.LabelProps?.class}
        id={local.LabelProps?.id}
        classList={{
          [styles.Label]: local.LabelProps?.useDefaultStyle === undefined
          ? true
          : local.LabelProps.useDefaultStyle,
          ...local.LabelProps?.classList
        }}
        >
          {local.Label}
        </ArkSlider.Label>

        <ArkSlider.ValueText 
        class={local.ValueTextProps?.class}
        id={local.ValueTextProps?.id}
        classList={{
          [styles.ValueText]: local.ValueTextProps === undefined
          ? true 
          : local.ValueTextProps.useDefaultStyle === undefined
            ? true
            : local.ValueTextProps.useDefaultStyle,
          ...local.ValueTextProps?.classList
        }}
        />
      </div>

      <ArkSlider.Control
      class={local.ControlProps?.class}
      id={local.ControlProps?.id}
      classList={{
        [styles.Control]: local.ControlProps === undefined 
        ? true
        : local.ControlProps?.useDefaultStyle === undefined
          ? true
          : local.ControlProps.useDefaultStyle,
        ...local.ControlProps?.classList
      }}
      >
        <ArkSlider.Track 
        class={local.TrackProps?.class}
        id={local.TrackProps?.id}
        classList={{
          [styles.Track]: local.TrackProps === undefined
          ? true
          : local.TrackProps?.useDefaultStyle === undefined
            ? true
            : local.TrackProps.useDefaultStyle,
          ...local.TrackProps?.classList
        }}
        >
          <ArkSlider.Range 
          class={local.RangeProps?.class}
          id={local.RangeProps?.id}
          classList={{
            [styles.Range]: local.RangeProps === undefined
            ? true
            : local.RangeProps.useDefaultStyle === undefined
              ? true
              : local.RangeProps.useDefaultStyle,
            ...local.RangeProps?.classList
          }}
          />
        </ArkSlider.Track>
        <ArkSlider.Thumb
        class={local.ThumbProps?.class}
        id={local.ThumbProps?.id}
        classList={{
          [styles.Thumb]: local.ThumbProps === undefined
          ? true
          : local.ThumbProps.useDefaultStyle === undefined
            ? true
            : local.ThumbProps.useDefaultStyle
        }}
        index={0}>
          <ArkSlider.HiddenInput />
        </ArkSlider.Thumb>
      </ArkSlider.Control>
    </ArkSlider.Root>
  );
}

export default Slider;