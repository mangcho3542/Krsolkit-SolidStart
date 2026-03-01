export function randomInt(min:number = 0, max: number): number {
    const range = max - min;
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    return min + (buf[0] % range);
}