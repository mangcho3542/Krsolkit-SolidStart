import { createSignal, createEffect, createMemo, onCleanup } from "solid-js";
import { DivProps } from "@/types/ComponentProps";
import { splitProps } from "solid-js";
import styles from "@styles/Timer.module.css";
import { splitComponentProps } from "@utils/splitComponentProps";

export interface TimerProps extends DivProps {
  second: number;
  isRunning: boolean;
  onEnd?: () => void | Promise<void>;
  useDefaultStyle?: boolean;
}

export function Timer(props: TimerProps) {
  const [local, rest] = splitProps(props, [
    "second",
    "isRunning",
    "onEnd"
  ]);

  // 총 남은 시간을 초 단위로 관리
  const [time, setTime] = createSignal<number>(
    Math.max(0, Math.floor(local.second))
  );
  let Interval: number | undefined;

  // 분과 초는 파생 값으로 처리
  const min = createMemo(() => Math.floor(time() / 60));
  const sec = createMemo(() => time() % 60);
  const display = createMemo(
    () => `${min()} : ${sec() < 10 ? `0${sec()}` : sec()}`
  );

  // isRunning 값이 바뀔 때마다 타이머 초기화
  createEffect(() => {
    if (!local.isRunning) {
      if (Interval !== undefined) {
        clearInterval(Interval);
        Interval = undefined;
      }
      return;
    }

    setTime(Math.max(0, Math.floor(local.second)));

    Interval = window.setInterval(() => setTime((v) => v - 1), 1000);

    onCleanup(() => {
      if (Interval !== undefined) {
        clearInterval(Interval);
        Interval = undefined;
      }
    });
  });

  // 시간 감소 처리 + 종료 이벤트
  createEffect(() => {
    if (time() <= 0) {
      setTime(0); // 음수 방지, 0에서 멈춤
      (async () => {
        if (local.onEnd) await local.onEnd();
        if (Interval !== undefined) {
          clearInterval(Interval);
          Interval = undefined;
        }
      })();
    }
  });

  // 안전한 interval 정리
  onCleanup(() => {
    if (Interval !== undefined) {
      clearInterval(Interval);
      Interval = undefined;
    }
  });

  return (
    <div {...splitComponentProps(props, styles.Timer)}>
      {display()}
    </div>
  );
}

export default Timer;
