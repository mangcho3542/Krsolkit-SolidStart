import styles from "./imgToAscii.module.css";
import {
	createEffect,
	createMemo,
	createSignal,
	onCleanup,
	onMount,
	Show,
} from "solid-js";
import { Btn, createToaster, HiddenInput, Toast } from "@components";
import { InputEventT } from "@types";
import { copy, capture, getColorScheme } from "@utils";

export default function Main() {
	let input: HTMLInputElement | undefined;
	let img: HTMLImageElement | undefined;
	const [canvasRef, setCanvasRef] = createSignal<
		HTMLCanvasElement | undefined
	>();
	let tmpDivRef: HTMLDivElement | undefined;
	let resWrapperRef: HTMLDivElement | undefined;
	const ascii = '@&2(^"_';

	const [uploaded, setUploaded] = createSignal(false); //upload 여부 나타내는 signal
	const [src, setSrc] = createSignal(""); //img src
	const [fileName, setFileName] = createSignal(""); //업로드한 파일 이름
	const [str, setStr] = createSignal(""); //resContainer에 표시할 원본 문자열

	// &resWrapper width, height 나타내는 signal
	const [wrapperSize, setWrapperSize] = createSignal({
		width: "auto",
		height: "auto",
	});

	//& img의 width, height 나타내는 signal
	const [imgSize, setImgSize] = createSignal({
		width: "auto",
		height: "auto",
	});

	//& resContainer의 transform scale을 나타내는 signal
	const [scaleValue, setScaleValue] = createSignal(1);

	const toaster = createToaster();

	//& 캡쳐할 때 사용할 style
	const style = createMemo(() => {
		const scheme = getColorScheme();
		return scheme === "light" || "none"
			? {
					bgColor: "#ffffff",
					color: "#09090b",
			  }
			: {
					bgColor: "#09090b",
					color: "#ffffff",
			  };
	});

	//& canvas context
	const [getContext, setGetContext] =
		createSignal<CanvasRenderingContext2D | null>(null);

	//canvas업데이트 될 때 바로 context 생성
	createEffect(() => {
		const canvas = canvasRef();
		if (!canvas) return;

		setGetContext(
			canvas.getContext("2d", {
				alpha: false,
				willRenderFrequently: true,
				colorSpec: "srgb",
			}) as CanvasRenderingContext2D | null
		);
	});

	//HiddenInput에서 파일 입력할 때 마다 실행될 함수
	async function onFileChange(e: InputEventT) {
		const file = e.currentTarget.files?.[0];
		if (!file) return;

		const index = file.name.lastIndexOf(".");
		setFileName(file.name.slice(0, index));

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

	//이미지에서 px읽어와서 처리하는 함수
	function processImg(img: HTMLImageElement): void {
		const tmpDiv = tmpDivRef,
			canvas = canvasRef();
		if (!canvas || !img || !tmpDiv) return;

		const ctx = getContext();

		if (!ctx) return;

		// 문자의 가로/세로 비율 측정
		const charWidth = tmpDiv.clientWidth;
		const charHeight = tmpDiv.clientHeight;

		// 문자의 세로/가로 비율
		const charAspectRatio = charHeight / charWidth;

		// canvas 크기를 이미지 크기에 맞게 설정
		canvas.width = img.naturalWidth || img.width;
		canvas.height = img.naturalHeight || img.height;

		//img width 및 height 설정
		setImgSize({
			width: `${canvas.width}px`,
			height: `${canvas.height}px`,
		});

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
		const targetWidth = canvas.width;

		// scale 값 계산
		let scale = 1;
		if (originalWidth > targetWidth) scale = targetWidth / originalWidth;

		// signal로 크기 설정
		setScaleValue(scale);
		setWrapperSize({
			width: `${originalWidth * scale}px`,
			height: `${originalHeight * scale}px`,
		});

		setStr(tmpStr);
	}

	//resize할 때마다 processImage 실행하는 함수
	const onReize = () => {
		if (!img) return;

		processImg(img);
	};

	createEffect(() => {
		if (typeof window === "undefined") return;

		window.addEventListener("resize", onReize, {
			passive: false,
		});
	});

	onCleanup(() => {
		if (typeof window === "undefined") return;

		window.removeEventListener("resize", onReize);
	});

	return (
		<main class={`Main ${styles.Main}`}>
			<Toast toaster={toaster} />
			<canvas
				aria-hidden
				hidden
				ref={(el) => {
					setCanvasRef(el);
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

			<div aria-hidden class={styles.TmpDiv} />

			<div
				class={styles.Container}
				style={{
					"padding-bottom": "2%",
				}}
			>
				{uploaded() ? (
					<img
						class={styles.Img}
						src={src()}
						ref={(el) => {
							img = el;
						}}
						onLoad={(e) => {
							processImg(e.currentTarget);
						}}
						onClick={() => {
							if (!input) return;
							input.click();
						}}
						alt="업로드한 이미지"
						style={imgSize()}
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

						<Btn
							class={styles.Btn}
							onClick={async () => {
								const flag = await capture({
									ref: resWrapperRef,
									fileName: fileName() + "-아스키",
									type: "png",
									style: {
										"background-color": style().bgColor,
										color: style().color,
									},
									options: {
										style: {
											backgroundColor: style().bgColor,
											color: style().color,
											fontFamily: "monospace",
										},
									},
								});

								if (flag) {
									toaster.create({
										title: "캡쳐하였습니다!",
										type: "success",
									});
								} else {
									toaster.create({
										title: "캡쳐에 실패하였습니다!",
										type: "error",
									});
								}
							}}
						>
							캡쳐하기
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
				ref={(el) => {
					resWrapperRef = el;
				}}
			>
				<div
					class={styles.ResultContainer}
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
