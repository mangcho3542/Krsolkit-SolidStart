import styles from "@styles/Slider.module.css";
import {
	JSXElement,
	splitProps,
	createSignal,
	onCleanup,
	onMount,
	createMemo,
	createEffect,
} from "solid-js";
import { splitComponentProps } from "@utils";
import { DivProps, PUS } from "@types";
import HiddenInput from "./HiddenInput";

interface ValueChangeI {
  value: string;
  valueAsNumber: number;
}

export type SliderLabelWrapperProps = PUS<DivProps>;
export type SliderLabelProps = PUS<DivProps>;
export type SliderValueTextProps = PUS<DivProps>;
export type SliderControlProps = PUS<DivProps>;
export type SliderTrackProps = PUS<DivProps>;
export type SliderRangeProps = PUS<DivProps>;
export type SliderThumbProps = PUS<DivProps>;
export interface SliderProps extends PUS<DivProps> {
	LabelWrapperProps?: SliderLabelWrapperProps;
	LabelProps?: SliderLabelProps;
	Label?: JSXElement;
	ValueTextProps?: SliderValueTextProps;
	useValueText?: boolean;
	ControlProps?: SliderControlProps;
	TrackProps?: SliderTrackProps;
	RangeProps?: SliderRangeProps;
	ThumbProps?: SliderThumbProps;
	defaultValue?: number;
	min?: number;
	max?: number;
	step?: number;
	orientation?: "vertial" | "vertical" | "horizontal";
	name?: string;
	onValueChange?: (e: ValueChangeI) => void;
}

export function Slider(props: SliderProps) {
	const [local, rest] = splitProps(props, [
		"LabelWrapperProps",
		"LabelProps",
		"Label",
		"ValueTextProps",
		"useValueText",
		"ControlProps",
		"TrackProps",
		"RangeProps",
		"ThumbProps",
		"defaultValue",
		"min",
		"max",
		"step",
		"orientation",
		"name",
		"onValueChange",
	]);

	const isVertical = (local.orientation ?? "horizontal") === "vertical";

	// 메모
	const max = createMemo(() => local.max ?? 100);
	const min = createMemo(() => local.min ?? 0);
	const step = createMemo(() => local.step ?? 1);

	// ------- 헬퍼들: 먼저 선언(호이스팅 / TDZ 문제 방지) -------
	function countDecimals(n: number) {
		if (!isFinite(n)) return 0;
		const s = String(n);
		// 소수부와 지수부 추출 (예: "1.2300e-2")
		const match = s.match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
		if (!match) return 0;
		const decPart = match[1] ?? "";
		const expPart = match[2] ? parseInt(match[2], 10) : 0;
		const decLen = decPart.length;
		return Math.max(0, decLen - expPart);
	}

	const clamp = (v: number, m: number = min(), M: number = max()) =>
		Math.min(M, Math.max(m, v));

	function roundToStep(raw: number) {
		const s = step();
		if (!s || s <= 0) return clamp(raw);
		const precision = countDecimals(s);
		const n = Math.round((raw - min()) / s) * s + min();
		const fixed = Number(n.toFixed(precision));
		return clamp(fixed);
	}

	const valueToPercent = (v: number) =>
		((clamp(v) - min()) / (max() - min() || 1)) * 100;

	// ------- 시그널 초기화: 헬퍼들이 다 정의된 뒤에 함 -------
	const [value, setValue] = createSignal(local.defaultValue ?? local.min ?? 0);

	// 이제 visualPercent 재정의 (value가 있어야 함)
	const visualPercentReal = createMemo(() => {
		const p = valueToPercent(value()); // 0..100
		return 1 + (p * 98) / 100; // 1 .. 99
	});

	let trackRef: HTMLDivElement | undefined;
	let thumbRef: HTMLDivElement | undefined;

	// pointer -> value 변환 (트랙 상대 위치 -> 값)
	function setValueFromPointer(clientX: number, clientY: number) {
		if (!trackRef) return;
		const rect = trackRef.getBoundingClientRect();
		let ratio = 0;
		if (isVertical) {
			const y = clientY - rect.top;
			ratio = 1 - y / rect.height; // 위가 max, 아래가 min
		} else {
			const x = clientX - rect.left;
			ratio = x / rect.width;
		}
		ratio = Math.min(1, Math.max(0, ratio));
		const raw = min() + ratio * (max() - min());
		setValue(roundToStep(raw));
	}

	// 드래그 이벤트 관리
	function startPointerDragFromThumb(e: PointerEvent) {
		(e.currentTarget as Element).setPointerCapture?.(e.pointerId);
		const move = (ev: PointerEvent) => {
			ev.preventDefault();
			setValueFromPointer(ev.clientX, ev.clientY);
		};

		const up = (ev: PointerEvent) => {
			try {
				(e.currentTarget as Element).releasePointerCapture?.(e.pointerId);
			} catch {}
			window.removeEventListener("pointermove", move);
			window.removeEventListener("pointerup", up);
		};

		window.addEventListener("pointermove", move);
		window.addEventListener("pointerup", up);
	}

	// 트랙 클릭(또는 트랙에서 바로 드래그 시작)
	function onTrackPointerDown(e: PointerEvent) {
		setValueFromPointer(e.clientX, e.clientY);

		const move = (ev: PointerEvent) => {
			ev.preventDefault();
			setValueFromPointer(ev.clientX, ev.clientY);
		};
		const up = () => {
			window.removeEventListener("pointermove", move);
			window.removeEventListener("pointerup", up);
		};
		window.addEventListener("pointermove", move);
		window.addEventListener("pointerup", up);
	}

	// 키보드 접근성
	function onThumbKeyDown(e: KeyboardEvent) {
		let v = value();
		const bigStep = (max() - min()) / 10 || step();
		switch (e.key) {
			case "ArrowLeft":
			case "ArrowDown":
				v = roundToStep(v - step());
				e.preventDefault();
				break;
			case "ArrowRight":
			case "ArrowUp":
				v = roundToStep(v + step());
				e.preventDefault();
				break;
			case "PageDown":
				v = roundToStep(v - bigStep);
				e.preventDefault();
				break;
			case "PageUp":
				v = roundToStep(v + bigStep);
				e.preventDefault();
				break;
			case "Home":
				v = min();
				e.preventDefault();
				break;
			case "End":
				v = max();
				e.preventDefault();
				break;
			default:
				return;
		}
		setValue(v);
	}

	const displayValue = createMemo(() => {
		const prec = countDecimals(step());
		const v = value();
		return prec === 0 ? String(Math.round(v)) : v.toFixed(prec);
	});

	// resize observer (선택적)
	let ro: ResizeObserver | undefined;
	onMount(() => {
		if (!trackRef) return;
		ro = new ResizeObserver(() => {});
		ro.observe(trackRef);
	});
	onCleanup(() => ro?.disconnect());

  //onValueChange
  createEffect(() => {
    const event: ValueChangeI = {
      value: displayValue(),
      valueAsNumber: Number(displayValue())
    };

    local.onValueChange?.(event);
  });

	return (
		<div
			{...splitComponentProps(rest, styles.Root)}
			data-orientation={isVertical ? "vertical" : "horizontal"}
		>
			<div
				{...splitComponentProps(local.LabelWrapperProps, styles.LabelWrapper)}
			>
				<div {...splitComponentProps(local.LabelProps, styles.Label)}>
					{local.Label}
				</div>
				{local.useValueText && (
					<div {...splitComponentProps(local.ValueTextProps, styles.ValueText)}>
						{displayValue()}
					</div>
				)}
			</div>

			<div {...splitComponentProps(local.ControlProps, styles.Control)}>
				<div
					{...splitComponentProps(local.TrackProps, styles.Track)}
					ref={(el) => (trackRef = el)}
					onPointerDown={(e) =>
						onTrackPointerDown(e as unknown as PointerEvent)
					}
				>
					<div
						{...splitComponentProps(local.RangeProps, styles.Range)}
						style={
							isVertical
								? {
										bottom: "1%",
										height: `${visualPercentReal() - 1}%`,
										left: "50%",
										transform: "translateX(-50%)",
								  }
								: {
										width: `${visualPercentReal()}%`,
								  }
						}
					/>
				</div>

				<div
					{...splitComponentProps(local.ThumbProps, styles.Thumb)}
					ref={(el) => {
						thumbRef = el;
					}}
					draggable={false}
					role="slider"
					tabindex={0}
					aria-valuemin={min()}
					aria-valuemax={max()}
					aria-valuenow={value()}
					onPointerDown={(e) =>
						startPointerDragFromThumb(e as unknown as PointerEvent)
					}
					onKeyDown={(e) => onThumbKeyDown(e as unknown as KeyboardEvent)}
					style={
						isVertical
							? {
									bottom: `${visualPercentReal()}%`,
									left: "50%",
									transform: "translate(-50%,50%)",
							  }
							: {
									left: `${visualPercentReal()}%`,
							  }
					}
				/>
				{local.name && (
					<HiddenInput
						name={local.name}
						value={displayValue()}
						aria-valuenow={displayValue()}
					/>
				)}
			</div>
		</div>
	);
}

export default Slider;
