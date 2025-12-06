import { Dialog } from "@components/Dialog";

export default function test() {
	let btnRef: HTMLButtonElement | undefined = undefined;

	return (
		<main
			class="Main"
			style={{
				"align-items": "center",
			}}
		>
			<div
				style={{
					width: "100%",
					height: "20%",
                    display: "flex",
                    "flex-direction": "column",
                    "align-items": "center",
                    "padding-top": "10%"
				}}
			>
				<button
					ref={(el: HTMLButtonElement) => (btnRef = el)}
					style={{
						width: "10%",
						height: "100%",
						"background-color": "black",
						color: "white",
					}}
				>
					버튼
				</button>
			</div>
			<Dialog 
            Title="타이틀" 
            Desc="Desc" 
            TrgRef={btnRef}
            />
		</main>
	);
}
