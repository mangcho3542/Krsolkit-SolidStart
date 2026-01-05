import { nanoseconds } from "bun";

export function calTime<T>(fn: () => Promise<T>): Promise<number>;
export function calTime<T>(fn: () => T): number;

export function calTime<T>(fn: () => T | Promise<T>): number | Promise<number> {
    const start = nanoseconds();
    const result = fn();

    // 결과값이 Promise인지 확인 (비동기 처리)
    if (result instanceof Promise) {
        return result.then((value) => {
            const end = nanoseconds();
            return (end-start)/1000000;
        });
    }

    // 동기 처리
    const end = nanoseconds();
    return (end-start)/100000;
}