import styles from "./imgToAscii.module.css";
import { createSignal } from "solid-js";
import { createToaster, HiddenInput, Toast } from "@components";
import { InputEventT } from "@types";

export default function Main() {
  let input: HTMLInputElement | undefined;
  let canvas: HTMLCanvasElement | undefined;
  let wrapper: HTMLDivElement | undefined; // 화면 크기 기준으로 사용할 컨테이너
  const ascii = "@$#Y!=+~- ";

  const [uploaded, setUploaded] = createSignal(false);
  const [src, setSrc] = createSignal("");
  const [str, setStr] = createSignal("");

  const toaster = createToaster();
  let blobUrl: string | null = null;

  async function onFileChange(e: InputEventT) {
    const file = e.currentTarget.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploaded(false);
      toaster.create({ type: "error", title: "업로드한 파일이 이미지가 아닙니다." });
      return;
    }

    // 기존 blobUrl revoke
    if (blobUrl) {
      try { URL.revokeObjectURL(blobUrl); } catch { /* ignore */ }
      blobUrl = null;
    }

    blobUrl = URL.createObjectURL(file);
    setSrc(blobUrl);
    setUploaded(false); // 아직 처리 전

    // create Image and await decode for robust load
    const img = new Image();
    img.src = blobUrl;
    // anonymous not needed for local blob, but if you expect cross-origin images, set it
    // img.crossOrigin = "anonymous";

    try {
      // image.decode() rejects if the image can't be decoded
      await img.decode();
      setUploaded(true);
      // processImg는 visible <img>가 레이아웃된 이후에도 호출하겠지만,
      // 여기서 한 번 더 안전하게 호출 (canvas ref must exist)
      processImg(img);
    } catch (err) {
      toaster.create({ type: "error", title: "이미지 로드 실패" });
      setUploaded(false);
    }
  }

  // visible <img>이 화면에 그려진 뒤에도 호출되게 onLoad에 연결.
  function onVisibleImgLoad(e: Event) {
    // revoke blob url after visible image is actually used by layout
    if (blobUrl) {
      try { URL.revokeObjectURL(blobUrl); } catch {}
      blobUrl = null;
    }
    const el = e.currentTarget as HTMLImageElement;
    // 안전하게 process. el는 이미 로드된 상태라 naturalWidth/naturalHeight 가 있음
    processImg(el);
  }

  function processImg(imgEl?: HTMLImageElement) {
    // allow passing an Image created in onFileChange or use the visible img in DOM
    const img = imgEl ?? (document.querySelector(`img.${styles.Img}`) as HTMLImageElement | null);
    if (!canvas || !img || !wrapper) return;

    // naturalWidth/Height 가 0이면 이미지가 아직 완전 로드되지 않은 것 — 안전 체크
    const naturalW = img.naturalWidth || img.width;
    const naturalH = img.naturalHeight || img.height;
    if (!naturalW || !naturalH) {
      // 비상: 이미지가 준비 안됐음
      console.warn("image not ready (naturalW/H == 0)");
      return;
    }

	const MAX_WIDTH = window.innerWidth;
    // 원본 비율 유지
    const ratio = naturalW / naturalH;
    let targetWidth = naturalW;
    let targetHeight = naturalH;

    if (targetWidth > MAX_WIDTH) {
      targetWidth = MAX_WIDTH;
      targetHeight = Math.round(targetWidth / ratio);
    }

    // 보통 글자 가로세로 비율 때문에 세로를 보정해 줘야 함.
    // 문자 한 글자가 픽셀보다 더 '낮음'을 감안해 세로를 더 줄임.
    // 이 값은 폰트/스타일에 따라 조정. 보통 0.5 ~ 0.6이 적당.
    const charAspect = 0.55;
    const drawHeight = Math.round(targetHeight * charAspect);

    canvas.width = Math.round(targetWidth);
    canvas.height = drawHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    let imgData;
    try {
      imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    } catch (err) {
      toaster.create({ type: "error", title: "Canvas 보안(tainted) 문제로 픽셀 추출 불가" });
      console.error(err);
      return;
    }

    const { data, width, height } = imgData;
    let tmpStr = "";

    for (let y = 0; y < height; ++y) {
      for (let x = 0; x < width; ++x) {
        const idx = (y * width + x) * 4;
        const r = data[idx], g = data[idx + 1], b = data[idx + 2];

        // 정확한 luma 계수 사용 (sRGB)
        const bright = 0.2126 * r + 0.7152 * g + 0.0722 * b;

        // 0..255 -> 0..ascii.length-1 안전 매핑
        const t = Math.floor((bright / 255) * (ascii.length - 1));
        const i = Math.min(Math.max(t, 0), ascii.length - 1);

        tmpStr += ascii[i];
      }
      tmpStr += "\n";
    }

    setStr(tmpStr);
  }

  return (
    <main
      class="Main"
      style={{ "align-items": "center", "justify-content": "center" }}
    >
      <Toast toaster={toaster} />
      <canvas
        aria-hidden
        hidden
        ref={(el) => { canvas = el; }}
      />

      <div class={styles.Wrapper} ref={(el) => (wrapper = el)}>
        <div class={styles.Container}>
          {uploaded() ? (
            <img
              src={src()}
              class={styles.Img}
              onLoad={onVisibleImgLoad}
              alt="uploaded"
            />
          ) : (
            <>
              <HiddenInput
                type="file"
                accept=".png,.jpg,.jpeg,.svg,.ico,image/png,image/jpeg,image/svg+xml,image/x-icon"
                ref={(el) => { input = el; }}
                onChange={onFileChange}
              />

              <span
                onClick={() => {
                  if (!input) return;
                  input.click();
                }}
              >
                이미지 업로드
              </span>
            </>
          )}
        </div>

        <pre class={styles.ResultContainer}>
          {str()}
        </pre>
      </div>
    </main>
  );
}
