import { deflateSync, inflateSync } from "node:zlib";

const Regex = /[0-9]/;

export function zip(str: string): string {
	let res = "";

	let cnt = 1;
	const length = str.length;
	for (let i = 1; i < length; ++i) {
		if (str[i - 1] === str[i]) {
			//연속일 때는 cnt++
			++cnt;
			continue;
		}

		res += Regex.test(str[i - 1]) ? `\\${str[i - 1]}` : str[i - 1];
		res += cnt !== 1 ? cnt.toString() : "";

		cnt = 1;
	}

	res += str[length - 1];
	res += cnt !== 1 ? cnt.toString() : "";

	return res;
}

export function unzip(str: string): string {
	let res = "";
	const length = str.length;

	for (let i = 0; i < length; ) {
		let ch = str[i];

		// escape 처리
		if (ch === "\\") {
			i++;
			if (i >= length) break; // 방어
			ch = str[i];
			i++;
		} else {
			i++;
		}

		// 숫자 파싱 (여러 자리 대응)
		let numStr = "";
		while (i < length && Regex.test(str[i])) {
			numStr += str[i];
			i++;
		}

		const count = numStr ? Number(numStr) : 1;
		res += ch.repeat(count);
	}

	return res;
}


export function compress(str: string): string {
	const zipped: string = zip(str);
	const encoder: TextEncoder = new TextEncoder();
	const uint8Array: Uint8Array<ArrayBuffer> = encoder.encode(zipped);

	// deflate 사용 (gzip 헤더 없음 = 더 작음)
	const compressed: Uint8Array = deflateSync(uint8Array);

	const base64: string = Buffer.from(compressed)
		.toString("base64")
		.replace(/\+/g, "-")
		.replace(/\//g, "_")
		.replace(/=+$/, "");

	return base64;
}

export function decompress(base64: string): string {
	const normalBase64: string = base64.replace(/-/g, "+").replace(/_/g, "/");

	const compressed: Buffer<ArrayBuffer> = Buffer.from(normalBase64, "base64");

	// inflate로 압축 해제
	const decompressed: Uint8Array = inflateSync(compressed);

	const decoder: TextDecoder = new TextDecoder();
	const zipped: string = decoder.decode(decompressed);

	return unzip(zipped);
}
