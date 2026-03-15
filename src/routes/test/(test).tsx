import { Toast, createToaster } from "@components/Toast";

interface I {
	top: number;
	bottom: number;
	left: number;
	right: number;
	width: number;
	height: number;
	x: number;
	y: number;
}

interface I2 {
	top: boolean;
	bottom: boolean;
	left: boolean;
	right: boolean;
	width: boolean;
	height: boolean;
	x: boolean;
	y: boolean;
}

export default function Test() {
	const toaster = createToaster();
	let btnRef: HTMLButtonElement | undefined;
	let map: Map<string, object> = new Map<string, object>();

	function trackPosition() {
		const id = setInterval(() => {
			const btn = btnRef;
			if (!btn) return;
			const rect = btn.getBoundingClientRect();
			const { top, bottom, left, right, width, height, x, y } = rect;
			map.set(
				JSON.stringify({ top, bottom, left, right, width, height, x, y }),
				{
					top,
					bottom,
					left,
					right,
					width,
					height,
					x,
					y,
				},
			);

			if (x === 0) {
				clearInterval(id);
				for (const v of map.values()) {
					console.log(v);
				}
			}
		}, 10);

		return id;
	}

	trackPosition();

	return (
		<main class="Main items-center">
			<button
				class="bg-black text-white p-[1%] rounded-md"
				onClick={() => {
					toaster.create({ title: "title" });
				}}
			>
				버튼
			</button>
			<Toast
				toaster={toaster}
				CloseBtnProps={{
					ref: (el) => {
						btnRef = el;
					},
				}}
			/>
		</main>
	);
}
