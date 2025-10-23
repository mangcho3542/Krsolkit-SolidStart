const time = process.hrtime.bigint;

// 1번째 오버로드: 인자가 2개인 경우
export function calTime<P extends any>(func: (p: P) => any, parameter: P): bigint;
// 2번째 오버로드: 인자가 1개인 경우
export function calTime<R extends any>(func: () => R): bigint;

export function calTime<P extends any, R extends any>(func: ((p: P) => any) | (() => R), param?: P): bigint {
    
    if (arguments.length === 2) {
        // 인자가 2개인 경우 (1번째 오버로드)
        const start = time();
        // 'func'의 타입을 (p: P) => any로 단언(casting)하여 호출
        (func as (p: P) => any)(param as P);
        const end = time();
        return end - start;
    } 
    else {
        // 인자가 1개인 경우 (2번째 오버로드)
        const start = time();
        (func as () => R)();
        const end = time();
        return end - start;
    }
}