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
import { omit } from "@/utils/object";

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
  useDefaultStyle?: boolean; // 슬라이더 전체에 대한 기본 스타일 on/off
}

type HasDefaultStyle = { useDefaultStyle?: boolean; class?: string };

// 기본 클래스를 안전하게 적용하고 사용자 class와 병합
function withDefaultClass<T extends HasDefaultStyle>(
  obj: T | undefined,
  defaultClass: string,
  rootUseDefault: boolean
) {
  const rest = obj
    ? omit(obj, ["useDefaultStyle"])
    : ({} as Record<string, unknown>);
  const wantDefault = obj?.useDefaultStyle ?? rootUseDefault;

  const userClass = (rest as any).class as string | undefined;
  const mergedClass = [wantDefault ? defaultClass : "", userClass ?? ""]
    .filter(Boolean)
    .join(" ");

  return mergedClass ? { ...rest, class: mergedClass } : rest;
}

export function Slider(p: SliderProps) {
  // 이전과 동일하게 min/max와 defaultValue 기본값을 정해줌
  const props = mergeProps(
    {
      min: 0,
      max: 100,
      defaultValue: p.min ?? 0, // 이전 컴포넌트와 동일한 기본값 정책
    },
    p
  );

  const [local, styling, rest] = splitProps(props, [
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

  // 루트 useDefaultStyle의 기본값은 true로 동작
  const rootUseDefault = local.useDefaultStyle ?? true;

  const valueTextProps = withDefaultClass(
    local.ValueTextProps,
    styles.ValueText,
    rootUseDefault
  );
  const controlProps = withDefaultClass(
    local.ControlProps,
    styles.Control,
    rootUseDefault
  );
  const trackProps = withDefaultClass(
    local.TrackProps,
    styles.Track,
    rootUseDefault
  );
  const rangeProps = withDefaultClass(
    local.RangeProps,
    styles.Range,
    rootUseDefault
  );
  const thumbProps = withDefaultClass(
    local.ThumbProps,
    styles.Thumb,
    rootUseDefault
  );

  return (
    <ArkSlider.Root
      class={styling.class}
      classList={styling.classList}
      style={{
        display: styling.style?.display ?? "flex",
        "flex-direction": styling.style?.["flex-direction"] ?? "column",
        ...styling.style,
      }}
      {...rest}
      aria-label={local["aria-label"]}
      aria-labelledby={local["aria-labelledby"]}
      asChild={local.asChild}
      // 0도 올바르게 처리되도록 복구
      defaultValue={
        local.defaultValue !== undefined ? [local.defaultValue] : undefined
      }
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
