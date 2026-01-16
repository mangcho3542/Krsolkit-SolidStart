import { toJpeg, toPng, toSvg } from "html-to-image";
import { Options } from "html-to-image/lib/types";
import { JSX } from "solid-js";

export interface CapturePayload {
	ref: HTMLElement | undefined;
	fileName?: string;
	type?: "png" | "svg" | "jpeg";
	style?: JSX.CSSProperties;
	options?: Options;
}

export async function capture({
	ref,
	fileName,
	type,
	style,
	options,
}: CapturePayload): Promise<boolean> {
	if (!ref) return false;

	const originalStyle: Partial<CSSStyleDeclaration> = {
		transform: ref.style.transform,
		transformOrigin: ref.style.transformOrigin,
	};

	// 스타일 적용
	for (const [key, value] of Object.entries(style ?? {})) {
		ref.style.setProperty(key, value as string);
	}

	try {
		let link: string = "";
		
		const rect: DOMRect = ref.getBoundingClientRect();
		const actualWidth: number = rect.width;
		const actualHeight: number = rect.height;

		if (type === "png" || typeof type === "undefined") {
			link = await toPng(ref, {
				...options,
				width: options?.width ?? actualWidth,
				height: options?.height ?? actualHeight,
				skipFonts: options?.skipFonts ?? false,
			});
		} else if (type === "jpeg") {
			link = await toJpeg(ref, {
				...options,
				width: options?.width ?? actualWidth,
				height: options?.height ?? actualHeight,
				skipFonts: options?.skipFonts ?? false,
			});
		} else if (type === "svg") {
			link = await toSvg(ref, {
				...options,
				width: options?.width ?? actualWidth,
				height: options?.height ?? actualHeight,
				skipFonts: options?.skipFonts ?? false,
			});
		}

		const a: HTMLAnchorElement = document.createElement("a");
		a.href = link;
		a.download = fileName ?? "이미지";
		a.click();

		return true;
	} catch (err) {
		console.error("capture utils 함수에서 오류남.\n", err);
		return false;
	} finally {
		// 원래 스타일 복원
		ref.style.transform = originalStyle.transform ?? "";
		ref.style.transformOrigin = originalStyle.transformOrigin ?? "";
		
		// 추가된 스타일 제거
		for (const key of Object.keys(style ?? {})) {
			ref.style.removeProperty(key);
		}
	}
}