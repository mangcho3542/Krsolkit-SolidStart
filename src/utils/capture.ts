import { toJpeg, toPng, toSvg } from "html-to-image";

export interface CapturePayload {
  ref: HTMLElement | null | undefined;
  fileName?: string;
  type?: "png" | "svg" | "jpeg";
  captureFullContent?: boolean; // 새 옵션 추가
}

export async function capture({
  ref,
  fileName,
  type,
  captureFullContent = false,
}: CapturePayload): Promise<boolean> {
  if (!ref) return false;

  // 원본 스타일 저장 (복원용)
  const originalStyles: Partial<CSSStyleDeclaration> = {};

  try {
    // 전체 콘텐츠 캡처 모드일 때 스타일 임시 변경
    if (captureFullContent) {
      const stylesToOverride = [
        'width', 'height', 'maxWidth', 'maxHeight', 
        'overflow', 'overflowX', 'overflowY'
      ] as const;

      stylesToOverride.forEach((prop) => {
        originalStyles[prop] = ref.style[prop];
      });

      // 전체 콘텐츠가 보이도록 스타일 변경
      ref.style.width = 'auto';
      ref.style.height = 'auto';
      ref.style.maxWidth = 'none';
      ref.style.maxHeight = 'none';
      ref.style.overflow = 'visible';
      ref.style.overflowX = 'visible';
      ref.style.overflowY = 'visible';
    }

    // 캡처 옵션 설정
    const options = {
      cacheBust: true,
      pixelRatio: window.devicePixelRatio,
      // 전체 콘텐츠 캡처 시 scrollWidth/scrollHeight 사용
      ...(captureFullContent && {
        width: ref.scrollWidth,
        height: ref.scrollHeight,
      }),
    };

    let link: string = "";

    if (type === "png" || typeof type === "undefined") {
      link = await toPng(ref, options);
    } else if (type === "jpeg") {
      link = await toJpeg(ref, options);
    } else if (type === "svg") {
      link = await toSvg(ref, options);
    }

    const a = document.createElement("a");
    a.href = link;
    a.download = fileName ?? "이미지";
    a.click();

    return true;
  } catch (err) {
    console.error("capture utils 함수에서 오류남.\n", err);
    return false;
  } finally {
    // 원본 스타일 복원 (항상 실행)
    if (captureFullContent) {
      Object.entries(originalStyles).forEach(([key, value]) => {
        (ref.style as any)[key] = value ?? '';
      });
    }
  }
}