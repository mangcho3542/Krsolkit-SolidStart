import { Accessor, createSignal, Setter, onCleanup } from "solid-js";
import { createStore, SetStoreFunction, Store } from "solid-js/store";

export interface useTimerProps {
	second?: number;
	autoStart?: boolean;
	direction?: "up" | "down";
	onTick?: (time: number) => any;
	onEnd?: VoidFunction;
}

export interface ClockT {
	hour: number;
	min: number;
	sec: number;
}

export class timer {
	private id?: NodeJS.Timeout;
	private tick: VoidFunction;
	private second: number;
	private direction: "up" | "down";
	private onTick?: (time: number) => any;
	private onEnd?: VoidFunction;

	private setRunning: Setter<boolean>;
	private setPaused: Setter<boolean>;
	private setTime: Setter<number>;
	private setClock: SetStoreFunction<ClockT>;

	public running: Accessor<boolean>;
	public paused: Accessor<boolean>;
	public time: Accessor<number>;
	public clock: Store<ClockT>;

	public getSecond(): number {
		return this.second;
	}

	//tick하는 함수
	private startTick(): void {
		this.id = setInterval(this.tick, 1000);
	}

	//tick을 멈추는 함수
	private clearTick(): void {
		clearInterval(this.id);
		this.id = undefined;
	}

	//dir이 down일 때 tick
	private countdown(): void {
		let flag: boolean = false; //time이 0인지 나타내줄 함수
		let time: number;

		this.setTime((t) => {
			if (t == 1) flag = true;
			else {
				if (this.clock.sec === 0) {
					//초가 0초였다면
					if (this.clock.min === 0) {
						//분도 0이었다면 hour을 1감소/sec: 59
						this.setClock(({ hour }) => ({ hour: hour - 1, min: 59, sec: 59 }));
					} else {
						//분이 0이 아니라면 분을 1감소/sec: 59
						this.setClock(({ min }) => ({ min: min - 1, sec: 59 }));
					}
				} else {
					//초가 0초가 아니라면 1감소
					this.setClock("sec", (sec) => sec - 1);
				}
			}

			time = t;

			return t - 1;
		});

		this.onTick?.(time!);

		//time이 0이라면
		if (flag) {
			this.stop();
		}
	}

	//dir이 up일 때 tick
	private countup(): void {
		let flag: boolean = false; //time이 0인지 나타내줄 함수
		let time: number;

		this.setTime((t) => {
			if (t == this.second - 1) flag = true;
			else {
				if (this.clock.sec === 59) {
					//sec가 59이라면
					if (this.clock.min === 59) {
						//min이 59라면
						this.setClock(({ hour }) => ({ hour: hour + 1, min: 0, sec: 0 }));
					} else {
						//min이 59가 아니라면
						this.setClock(({ min }) => ({ min: min + 1, sec: 0 }));
					}
				} else {
					//sec가 59가 아니라면 1증가
					this.setClock("sec", (sec) => sec + 1);
				}
			}

			time = t;
			return t + 1; // countup이므로 +1로 수정
		});

		this.onTick?.(time!);

		//time이 second에 도달했다면
		if (flag) {
			this.stop();
		}
	}

	//Timer 종료하는 함수
	private stop(): void {
		this.setRunning(false);
		this.setPaused(false);
		this.clearTick();
		this.onEnd?.();
	}

	constructor(props?: useTimerProps) {
		const {
			second = 300,
			autoStart = true,
			direction: dir = "down",
			onTick,
			onEnd,
		} = props ?? {};
		this.second = second;
		this.direction = dir;
		this.onTick = onTick;
		this.onEnd = onEnd;

		this.tick =
			this.direction === "down"
				? this.countdown.bind(this)
				: this.countup.bind(this);

		[this.running, this.setRunning] = createSignal<boolean>(
			autoStart ? true : false,
		);
		[this.paused, this.setPaused] = createSignal<boolean>(
			autoStart ? false : true,
		);
		[this.time, this.setTime] = createSignal<number>(
			dir === "down" ? second : 0,
		);

		[this.clock, this.setClock] = createStore<ClockT>(
			dir === "down"
				? {
						hour: Math.floor(second / 3600),
						min: Math.floor((second % 3600) / 60),
						sec: second % 60,
					}
				: {
						hour: 0,
						min: 0,
						sec: 0,
					},
		);
	}

	//시작하는 함수. Only 초기 시작만 담당
	public start(): void {
		//second와 현재 time이 같고, running이 fasle일때만 true로 설정
		if (!this.id && !this.running()) {
			this.setRunning((r) => !r);
			this.startTick();
		}
	}

	//타이머 멈추는 함수
	public pause(): void {
		if (!this.paused()) {
			this.clearTick();
			this.setRunning(false);
			this.setPaused(true);
		}
	}

	//타이머 pause상태에서 마저 진행시키는 함수
	public resume(): void {
		if (this.paused()) {
			this.setRunning(true);
			this.setPaused(false);
			this.startTick();
		}
	}

	//타이머 재시작하는 함수
	public restart(): void {
		this.setTime(this.direction === "down" ? this.second : 0);
		this.setPaused(false);
		this.start();
	}

	//onCleanup때 실행될 함수
	public clean(): void {
		this.clearTick();
	}
}

export function useTimer(props?: useTimerProps): timer {
	const timerContext: timer = new timer(props);

	onCleanup(() => {
		timerContext.clean();
	});

	return timerContext;
}
