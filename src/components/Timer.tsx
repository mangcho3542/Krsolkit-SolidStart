import styles from "@styles/Timer.module.css";
import { splitComponentProps } from "@utils/splitComponentProps";
import { DivProps, PUS } from "@/types/ComponentProps";
import { useTimer, useTimerProps, timer } from "@hooks/useTimer";
import { createMemo, JSXElement, splitProps } from "solid-js";

//TimerProps
type TimerBaseProps = PUS<DivProps> & {
	splitter?: JSXElement;
	SplitterProps?: PUS<DivProps>;
	TextProps?: PUS<DivProps>;
	format?: "HMS" | "MS";
};

type TimerPropsT1 = TimerBaseProps & useTimerProps;
type TimerPropsT2 = TimerBaseProps & { timer: timer };

export type TimerProps = TimerPropsT1 | TimerPropsT2;

export function Timer(props: TimerProps = {} as TimerPropsT1) {
	let timer: timer;
	let others: Pick<TimerBaseProps, "SplitterProps" | "TextProps" | "splitter">;
	let rest: PUS<DivProps>;

	if ("timer" in props) {
		timer = props.timer;

		[others, rest] = splitProps(props, [
			"SplitterProps",
			"splitter",
			"TextProps",
		]);
	} else {
		let TimerProps: useTimerProps;

		// TimerPropsT1 케이스: TimerContext를 생성
		[TimerProps, others, rest] = splitProps(
			props,
			["second", "autoStart", "direction", "onTick", "onEnd"],
			["SplitterProps", "splitter", "TextProps"],
		);

		timer = useTimer(TimerProps);
	}

	const format = props.format ?? "MS";

	const min = createMemo(() => {
		if (format === "HMS") return timer.clock.min;
		else return timer.clock.hour * 60 + timer.clock.min;
	});

	const TextProps = createMemo(() =>
		splitComponentProps(others.TextProps, styles.Text),
	);

	const SplitterProps = createMemo(() =>
		splitComponentProps(others.SplitterProps, styles.Splitter),
	);

	return (
		<div
			{...splitComponentProps(rest, styles.Timer)}
			data-scope={rest["data-scope"] ?? "timer"}
			data-part={rest["data-part"] ?? "root"}
		>
			{format === "HMS" && (
				<div
					{...TextProps()}
					data-scope={others.TextProps?.["data-scope"] ?? "timer"}
					data-part={others.TextProps?.["data-part"] ?? "hour"}
				>
					{timer.clock.hour}
				</div>
			)}

			<div
				{...SplitterProps()}
				data-scope={others.SplitterProps?.["data-scope"] ?? "timer"}
				data-part={others.SplitterProps?.["data-part"] ?? "splitter"}
        aria-hidden
			>
				{others.splitter ?? ":"}
			</div>

			<div
				{...TextProps()}
				data-scope={others.TextProps?.["data-scope"] ?? "timer"}
				data-part={others.TextProps?.["data-part"] ?? "min"}
			>
				{min()}
			</div>

			<div
				{...SplitterProps()}
				data-scope={others.SplitterProps?.["data-scope"] ?? "timer"}
				data-part={others.SplitterProps?.["data-part"] ?? "splitter"}
        aria-hidden
			>
				{others.splitter ?? ":"}
			</div>

			<div {...TextProps()} data-scope="timer" data-part="sec">
				{timer.clock.sec}
			</div>
		</div>
	);
}
