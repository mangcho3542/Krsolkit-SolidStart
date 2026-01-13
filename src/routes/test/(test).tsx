import { createEffect, createSignal, For } from "solid-js";

export default function test() {
	// 측정할 문자열 (원하시면 다른 문자로 바꿔도 됩니다)
	const str = "`1234567890-=[]\\;',./~!@#$%^&*()_+{}:\"<>?";
	const [ary, setAry] = createSignal<{ char: string; value: number }[]>([]);
	const [canvasRef, setCanvasRef] = createSignal<HTMLCanvasElement | undefined>();

	createEffect(() => {
		const canvas = canvasRef();
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		// 각 문자에 대해 검은색(문자) 픽셀 비율을 계산
		// font는 문제 조건대로 12px monospace, 배경은 흰색, 문자색은 검은색으로 렌더링함
		const chars = Array.from(str);
		const results: { char: string; value: number }[] = [];

		for (const ch of chars) {
			// 글자 주변에 약간 패딩을 줘서 자간/안티앨리어싱이 잘 캡쳐되도록 함
			const padding = 4;

			// ctx 설정 (measureText는 캔버스 현재 폰트 설정에 의존)
			ctx.font = "12px monospace";
			const metrics = ctx.measureText(ch);
			// 측정할 너비는 텍스트 너비 + 좌우 패딩
			const w = Math.max(1, Math.ceil(metrics.width) + padding * 2);
			// 높이는 폰트 사이즈보다 조금 여유있게 잡음(내림차순, 올림차순 대비)
			const h = 18;

			// 캔버스 크기 변경하면 컨텍스트 상태가 리셋될 수 있으니 다시 설정
			canvas.width = w;
			canvas.height = h;
			ctx.font = "12px monospace";
			ctx.textBaseline = "top";

			// 배경 흰색으로 채움
			ctx.fillStyle = "white";
			ctx.fillRect(0, 0, w, h);

			// 문자 그리기
			ctx.fillStyle = "black";
			// 좌우 패딩만큼 X를 띄우고, 세로는 상단에 맞춤
			ctx.fillText(ch, padding, 1);

			// 픽셀 데이터 읽기
			const img = ctx.getImageData(0, 0, w, h).data;
			let nonWhite = 0;
			// RGBA로 저장되어 있으므로 4씩 증가
			for (let i = 0; i < img.length; i += 4) {
				const r = img[i];
				const g = img[i + 1];
				const b = img[i + 2];
				const a = img[i + 3];

				// 완전한 흰색(255,255,255,255)이면 비어있는 픽셀로 간주
				// 안티앨리어싱으로 생기는 회색 픽셀도 "문자 픽셀"로 센다
				if (!(r === 255 && g === 255 && b === 255 && a === 255)) {
					nonWhite++;
				}
			}

			const ratio = nonWhite / (w * h);
			// 백분율로 보기 좋게 소수점 둘째 자리까지 반올림
			results.push({ char: ch, value: Math.round(ratio * 10000) / 100 });
		}

		
		// value 기준으로 오름차순 정렬 (밀도 낮은 문자 → 높은 문자)
		results.sort((a, b) => b.value - a.value);
		setAry(results);
		
	});

	return (
		<main
			class="Main"
			style={{
				"align-items": "center",
			}}
		>
			{/* 측정용 캔버스: 화면에 보이지만 사이즈는 JS에서 제어함 */}
			<canvas
				ref={(el) => {
					setCanvasRef(el);
				}}
				style={{
					"display": "block",
					"margin": "1rem 0",
				}}
			/>

			{/* 결과 리스트 */}
			<div
				style={{
					width: "50%",
					display: "flex",
					"flex-direction": "column",
					"align-items": "center",
					gap: "0.5rem",
					border: "1px solid black",
					padding: "0.5rem",
				}}
			>
				{/* 각 문자별로 문자(미리보기)와 검은색 비율(%)을 표시 */}
				<For each={ary()}>
					{(it) => (
						<div
							style={{
								font: "12px monospace",
							}}
						>
							{`${it.char} : ${it.value}`}
						</div>
					)}
				</For>
			</div>
		</main>
	);
}
