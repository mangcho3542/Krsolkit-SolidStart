import { JSXElement } from "solid-js";
import { createStore, Store, SetStoreFunction } from "solid-js/store";
import { CreateToasterProps } from "@components";

// 애니메이션 시간 (ms)
const ANIMATION_DURATION = 200;

// createToaster에서 type 변수에 올 수 있는 type들
export type ToasterType = "success" | "error" | "warning" | "info";

// toaster.create에 올 수 있는 타입
interface ToasterBaseType {
	title?: JSXElement;
	type?: ToasterType;
	duration?: number;
	closable?: boolean;
}

// Toast
interface ToastType extends ToasterBaseType {
	open: boolean;
	closing?: boolean;
	id: string;
}

// 타이머 정보 관리용
interface TimerInfo {
	timerId: ReturnType<typeof setTimeout> | null;
	startTime: number;
	remainingTime: number;
	isAnimating: boolean;
}

// 타이머용
const now = () => performance.now();

export type Placement =
	| "top-start"
	| "top"
	| "top-end"
	| "bottom-start"
	| "bottom"
	| "bottom-end";

class Toaster {
	private toastAry: Store<ToastType[]>;
	private setToastAry: SetStoreFunction<ToastType[]>;
	private cnt: number;
	private timers: Map<string, TimerInfo>;
	public placement: Placement;

	constructor(props: CreateToasterProps = {}) {
		[this.toastAry, this.setToastAry] = createStore<ToastType[]>([]);
		this.cnt = 0;
		this.timers = new Map();
		this.placement = props.placement ?? "bottom-end";
	}

	/**
	 * Toast 배열 (public으로 변경)
	 */
	get toasts(): ToastType[] {
		return this.toastAry;
	}

	/**
	 * Toast 숫자
	 */
	get count(): number {
		return this.cnt;
	}

	/**
	 * Toast 생성하는 함수 (private 유지 - 헬퍼 메서드를 통해 호출)
	 */
	create(props: ToasterBaseType): string {
		const id = `toast:${++this.cnt}:${now()}`;
		console.log("Toast Id : ", id);
		const duration = props.duration ? Math.abs(props.duration) : 5000;

		const toast: ToastType = {
			...props,
			id,
			open: true,
			duration,
			closable: props.closable !== undefined ? props.closable : true,
		};

		this.setToastAry((prev) => [...prev, toast]);

		this.timers.set(id, {
			timerId: null,
			startTime: now(),
			remainingTime: duration,
			isAnimating: true,
		});

		setTimeout(() => {
			const timerInfo = this.timers.get(id);
			if (timerInfo) {
				timerInfo.isAnimating = false;
				this.startTimer(id, duration);
			}
		}, ANIMATION_DURATION);

		return id;
	}

	startTimer(id: string, duration: number): void {
		if (duration <= 0) return;

		const timerId = setTimeout(() => {
			this.dismiss(id);
		}, duration);

		const timerInfo = this.timers.get(id);
		if (timerInfo) {
			timerInfo.timerId = timerId;
			timerInfo.startTime = now();
			timerInfo.remainingTime = duration;
		}
	}

	/**
	 * Toast를 닫힘 상태로 변경 (public - 외부에서 호출 가능)
	 */
	dismiss = (id?: string): void => {
		if (id) {
			this.dismissOne(id);
		} else {
			const allIds = [...this.toastAry.map((t) => t.id)];
			allIds.forEach((toastId) => this.dismissOne(toastId));
		}
	};

	private dismissOne(id: string): void {
		const timerInfo = this.timers.get(id);

		if (!timerInfo || timerInfo.isAnimating) return;

		timerInfo.isAnimating = true;

		if (timerInfo.timerId) {
			clearTimeout(timerInfo.timerId);
			timerInfo.timerId = null;
		}

		this.setToastAry((t) => t.id === id, (prev) => ({...prev, open: false, closing: true}));

		setTimeout(() => {
			this.remove(id);
		}, ANIMATION_DURATION);
	}

	/**
	 * Toast 즉시 제거 (public)
	 */
	remove = (id?: string): void => {
		if (id) {
			const timerInfo = this.timers.get(id);
			if (timerInfo?.timerId) {
				clearTimeout(timerInfo.timerId);
			}
			this.timers.delete(id);
			this.setToastAry((prev) => prev.filter((toast) => toast.id !== id));
		} else {
			this.timers.forEach((timerInfo) => {
				if (timerInfo.timerId) {
					clearTimeout(timerInfo.timerId);
				}
			});
			this.timers.clear();
			this.setToastAry([]);
		}
	};

	/**
	 * 타이머 일시정지 (public)
	 */
	pause = (id?: string): void => {
		if (id) {
			this.pauseOne(id);
		} else {
			this.timers.forEach((_, toastId) => this.pauseOne(toastId));
		}
	};

	private pauseOne(id: string): void {
		const timerInfo = this.timers.get(id);

		if (!timerInfo || timerInfo.isAnimating || !timerInfo.timerId) return;

		clearTimeout(timerInfo.timerId);

		const elapsed = now() - timerInfo.startTime;
		timerInfo.remainingTime = Math.max(0, timerInfo.remainingTime - elapsed);
		timerInfo.timerId = null;
	}

	/**
	 * 타이머 재개 (public)
	 */
	resume = (id?: string): void => {
		if (id) {
			this.resumeOne(id);
		} else {
			this.timers.forEach((_, toastId) => this.resumeOne(toastId));
		}
	};

	private resumeOne(id: string): void {
		const timerInfo = this.timers.get(id);

		if (
			timerInfo &&
			timerInfo.timerId === null &&
			!timerInfo.isAnimating &&
			timerInfo.remainingTime > 0
		) {
			timerInfo.startTime = now();
			timerInfo.timerId = setTimeout(() => {
				this.dismiss(id);
			}, timerInfo.remainingTime);
		}
	}

	/**
	 * Toast 업데이트 (public)
	 */
	update = (id: string, props: Partial<ToasterBaseType>): void => {
		this.setToastAry(
			(toast) => toast.id === id,
			(toast) => ({ ...toast, ...props })
		);
	};

	/**
	 * 타입별 헬퍼 메서드들
	 */
	success = (props: Omit<ToasterBaseType, "type">): string => {
		return this.create({ ...props, type: "success" });
	};

	error = (props: Omit<ToasterBaseType, "type">): string => {
		return this.create({ ...props, type: "error" });
	};

	warning = (props: Omit<ToasterBaseType, "type">): string => {
		return this.create({ ...props, type: "warning" });
	};

	info = (props: Omit<ToasterBaseType, "type">): string => {
		return this.create({ ...props, type: "info" });
	};
}

export { Toaster, ANIMATION_DURATION };
export type { ToastType, ToasterBaseType, ToasterType as Type };
