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
import { createMemo, JSXElement, mergeProps } from "solid-js";
import { splitProps } from "solid-js";
import styles from "@styles/Slider.module.css";
import { CssProperties } from "@/types/CssProperties";
import { convertCss } from "@/utils/converCss";
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

function withDefaultClass(obj: Obj | undefined, baseClass: string) {
  if (!obj) return { class: baseClass };

  const className = obj.class ?? "";
  return {
    class: className,
    classList: {
      ...obj.classList,
      baseClass: obj.useDefaultStyle === undefined ? true : obj.useDefaultStyle,
    },
    id: obj.id,
  };
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

  const valueTextProps = withDefaultClass(
    local.ValueTextProps,
    styles.ValueText
  );

  const controlProps = withDefaultClass(local.ControlProps, styles.Control);

  const trackProps = withDefaultClass(local.TrackProps, styles.Track);

  const rangeProps = withDefaultClass(local.RangeProps, styles.Range);

  const thumbProps = withDefaultClass(local.ThumbProps, styles.Thumb);

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
      <Stack flexDirection="row">
        <ArkSlider.Label {...local.LabelProps}>{local.Label}</ArkSlider.Label>
        <ArkSlider.ValueText {...valueTextProps} />
      </Stack>
      <ArkSlider.Control {...controlProps}>
        <ArkSlider.Track {...trackProps}>
          <ArkSlider.Range {...rangeProps} />
        </ArkSlider.Track>
        <ArkSlider.Thumb {...thumbProps} index={0}>
          <ArkSlider.HiddenInput />
        </ArkSlider.Thumb>
      </ArkSlider.Control>
    </ArkSlider.Root>
  );
}

export default Slider;