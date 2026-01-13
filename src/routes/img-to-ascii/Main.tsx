import styles from "./imgToAscii.module.css";
import { createEffect, createSignal, Show } from "solid-js";
import { Btn, createToaster, HiddenInput, Toast } from "@components";
import { InputEventT } from "@types";
import { copy } from "@utils";
import axios from "axios";

export default function Main() {
    let input: HTMLInputElement | undefined;
    let canvas: HTMLCanvasElement | undefined;
    let resDivRef: HTMLDivElement | undefined;
    let tmpDivRef: HTMLDivElement | undefined;
    let msrDivRef: HTMLDivElement | undefined;
    const ascii = '@&2(^"_';

    const [uploaded, setUploaded] = createSignal(false);
    const [src, setSrc] = createSignal("");
    const [str, setStr] = createSignal("");
    const [data, setData] = createSignal("");
    
    // 크기 관련 signal 추가
    const [wrapperSize, setWrapperSize] = createSignal({ width: "auto", height: "auto" });
    const [scaleValue, setScaleValue] = createSignal(1);

    const toaster = createToaster();

    async function onFileChange(e: InputEventT) {
        const file = e.currentTarget.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setUploaded(false);
            toaster.create({
                type: "error",
                title: "업로드한 파일이 이미지가 아닙니다.",
            });
            return;
        }

        const imgURL = URL.createObjectURL(file);
        if (src() !== "") {
            URL.revokeObjectURL(src());
        }

        setSrc(imgURL);
        setUploaded(true);
    }

    function processImg(img: HTMLImageElement): void {
        const tmpDiv = tmpDivRef, msrDiv = msrDivRef;
        if (!canvas || !img || !tmpDiv || !msrDiv) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // 문자의 가로/세로 비율 측정
        const charWidth = tmpDiv.offsetWidth;
        const charHeight = tmpDiv.offsetHeight;

        // 문자의 세로/가로 비율
        const charAspectRatio = charHeight / charWidth;

        // canvas 크기를 이미지 크기에 맞게 설정
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;

        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        const { data, width, height } = imgData;
        let tmpStr: string = "";

        // y축 샘플링 간격 (비율 보정)
        const yStep = charAspectRatio;

        // 실제 출력되는 줄 수 계산
        let lineCount = 0;

        for (let y = 0; y < height; y += yStep) {
            const yFloor = Math.floor(y);
            for (let x = 0; x < width; ++x) {
                const idx: number = (yFloor * width + x) * 4;
                const r: number = data[idx];
                const g: number = data[idx + 1];
                const b: number = data[idx + 2];

                const bright: number = 0.2126 * r + 0.7152 * g + 0.0722 * b;

                const t: number = Math.floor((bright / 255) * (ascii.length - 1));
                const i: number = Math.min(Math.max(t, 0), ascii.length - 1);

                tmpStr += ascii[i];
            }
            tmpStr += "\n";
            lineCount++;
        }

        // 한 줄의 문자 수
        const lineLength = width;

        // 원본 크기 계산
        const originalWidth = lineLength * charWidth;
        const originalHeight = lineCount * charHeight;

        // 목표 너비
        const targetWidth = window.innerWidth * 0.75;

        // scale 값 계산
        let scale = 1;
        if (originalWidth > targetWidth) scale = targetWidth / originalWidth;
        

        // signal로 크기 설정
        setScaleValue(scale);
        setWrapperSize({
            width: `${originalWidth * scale}px`,
            height: `${originalHeight * scale}px`
        });

        // msrDiv 초기화
        msrDiv.textContent = "";

        setStr(tmpStr);
    }

    createEffect(() => {
        if (!str()) return;

        (async () => {
            try {
                const res = await axios.post("/api/compressStr", {
                    data: str(),
                });

                setData(res.data);
            } catch (err) {
                console.log("axios.post에서 오류남.\n", err);
            }
        })();
    });

    return (
        <main class={`Main ${styles.Main}`}>
            <Toast
                toaster={toaster}
            />
            <canvas
                aria-hidden
                hidden
                ref={(el) => {
                    canvas = el;
                }}
            />

            <div
                aria-hidden
                ref={(el) => {
                    tmpDivRef = el;
                }}
                class={styles.TmpDiv}
            >
                A
            </div>

            <div
                aria-hidden
                class={styles.TmpDiv}
                ref={(el) => {
                    msrDivRef = el;
                }}
            />

            <div
                class={styles.Container}
                style={{
                    "padding-bottom": "2%",
                }}
            >
                {uploaded() ? (
                    <img
                        src={src()}
                        class={styles.Img}
                        onLoad={(e) => {
                            processImg(e.currentTarget);
                        }}
                        onClick={() => {
                            if (!input) return;
                            input.click();
                        }}
                        alt="uploaded"
                    />
                ) : (
                    <>
                        <HiddenInput
                            type="file"
                            accept=".png,.jpg,.jpeg,.svg,.ico,image/png,image/jpeg,image/svg+xml,image/x-icon"
                            ref={(el) => {
                                input = el;
                            }}
                            onChange={onFileChange}
                        />

                        <span
                            class={styles.Span}
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

            <div class={styles.Container}>
                <Show when={uploaded()}>
                    <div class={styles.BtnWrapper}>
                        <Btn
                            class={styles.Btn}
                            onClick={async () => {
                                copy(str());
                                toaster.create({
                                    title: "복사되었습니다!",
                                    type: "success",
                                });
                            }}
                        >
                            복사하기
                        </Btn>

                        <Btn class={styles.Btn}>공유하기</Btn>
                    </div>
                </Show>
            </div>

            {/* Wrapper - 인라인 스타일로 크기 적용 */}
            <div
                class={styles.ResultWrapper}
                style={{
                    width: wrapperSize().width,
                    height: wrapperSize().height,
                }}
            >
                <div
                    class={styles.ResultContainer}
                    ref={(el) => {
                        resDivRef = el;
                    }}
                    style={{
                        "--scale-value": scaleValue(),
                    }}
                >
                    {str()}
                </div>
            </div>
        </main>
    );
}