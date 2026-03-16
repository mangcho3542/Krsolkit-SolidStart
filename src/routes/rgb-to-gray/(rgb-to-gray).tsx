import { Title } from "@solidjs/meta";
import { createSignal } from "solid-js";
import HiddenInput from "@components/HiddenInput";
import { QuestionBtn } from "@components/QuestionBtn";
import Dialog from "@components/Dialog";
import { InputEventT } from "@/types/ComponentProps";
import { Toast, createToaster } from "@components/Toast";
import { Btn } from "@components/Btn";

export default function RgbToGray() {
	const [uploaded, setUploaded] = createSignal(false); //이미지 업로드 여부
	const [src, setSrc] = createSignal(""); //이미지 주소
	const [fileName, setFileName] = createSignal(""); //이미지 이름

	let Canvas: HTMLCanvasElement | undefined,
		CanvasContext: CanvasRenderingContext2D | null;

	let input: HTMLInputElement | undefined;
	let link: HTMLAnchorElement | undefined;
	const [TrgRef, setTrgRef] = createSignal<HTMLButtonElement | undefined>();
	const [hidden, setHidden] = createSignal(true);

	const toaster = createToaster();

	//파일 입력할 때마다 실행될 함수
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

	//이미지 처리하는 함수
	function processImg(img: HTMLImageElement) {
		const ctx = CanvasContext;
		if (!ctx) return;
		setHidden(true);

		const width = img.naturalWidth,
			height = img.naturalHeight;

		// canvas 크기를 img에 맞게 설정
		ctx.canvas.width = width;
		ctx.canvas.height = height;

		ctx.drawImage(img, 0, 0);
		const imageData = ctx.getImageData(0, 0, width, height);

		for (let y = 0; y < height; ++y) {
			for (let x = 0; x < width; ++x) {
				const index = (y * width + x) * 4;

				const r = imageData.data[index + 0];
				const g = imageData.data[index + 1];
				const b = imageData.data[index + 2];

				// 가중 평균으로 흑백 변환 (사람 눈의 밝기 인지 반영)
				const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);

				imageData.data[index] = gray;
				imageData.data[index + 1] = gray;
				imageData.data[index + 2] = gray;
			}
		}

		ctx.putImageData(imageData, 0, 0);
		setHidden(false);
	}

	return (
		<>
			<Title>흑백 변환</Title>
			<Dialog
				PositionerProps={{
					class: "",
				}}
				Title="흑백 변환 사용법"
				TitleProps={{
					class: "font-suit font-semibold text-lg",
				}}
				Body={
					<span class="font-suit font-medium text-base h-[min-content_!important]">
						컬러 사진을 업로드하면 사진을 흑백 사진으로 변환합니다. <br />
						변환된 사진은 다운로드 버튼을 클릭하면 다운로드 받으실 수 있습니다.
					</span>
				}
				BodyProps={{
					class: "p-[2%_0_0_0] h-[min-content_!important]",
				}}
				TrgRef={TrgRef}
				class="h-[min-content_!important]"
			/>

			<main class="Main">
				<HiddenInput
					type="file"
					accept=".png,.jpg,.jpeg,.svg,.ico,image/png,image/jpeg,image/svg+xml,image/x-icon"
					ref={(el) => {
						input = el;
					}}
					onChange={onFileChange}
				/>

				<a
					href=""
					download={fileName() + "-흑백.png"}
					ref={(el) => {
						link = el;
					}}
				/>

				<Toast toaster={toaster} />

				<h1 class="text-2xl font-suit font-semibold inline-block text-center">
					흑백 변환
				</h1>

				<div class="flex w-full justify-end m-[3%_0_0_0] p-[0_4%_0_0]">
					<QuestionBtn
						ref={(el) => {
							setTrgRef(el);
						}}
						class="w-10 h-10 cursor-pointer"
						QuestionIconProps={{
							class: "w-10 h-10",
						}}
					/>
				</div>

				<div class="flex gap-[10%] p-0 justify-center m-[5%_0_0_0] cursor-pointer">
					{uploaded() ? (
						<img
							src={src()}
							onLoad={(e) => {
								processImg(e.currentTarget);
							}}
							onClick={() => {
								input?.click();
								console.log("클릭됨.");
							}}
							alt="업로드한 이미지"
						/>
					) : (
						<div
							class="text-suit font-medium text-lg"
							onClick={() => {
								input?.click();
								console.log("클릭됨.");
							}}
						>
							이미지 업로드
						</div>
					)}

					<canvas
						ref={(el) => {
							Canvas = el;
							CanvasContext = el.getContext("2d", {
								alpha: false,
								willRenderFrequently: true,
								colorSpec: "srgb",
							}) as CanvasRenderingContext2D;
						}}
						aria-hidden
						hidden={hidden()}
						class={`${hidden() ? "hidden" : "block"}`}
					/>
				</div>

				<div class="flex justify-center">
					{!hidden() && (
						<Btn
							onClick={() => {
								Canvas?.toBlob((blob) => {
									if (!blob) return;
									const file = new File([blob], `${fileName()}.png`, {
										type: "image/png",
									});
									const url = window.URL.createObjectURL(file);
									if (!link) return;
									link.href = url;
									link.click();
								}, "image/png");
							}}
						>
							이미지 다운로드
						</Btn>
					)}
				</div>
			</main>
		</>
	);
}
