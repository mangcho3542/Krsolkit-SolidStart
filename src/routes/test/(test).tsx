import Btn from "@/components/Btn";
import Drawer from "@/components/Drawer";
import { createSignal } from "solid-js";

export default function test() {
	const [btnRef, setBtnRef] = createSignal<HTMLButtonElement | undefined>();

	return (
		<main
			class="Main"
			style={{
				"align-items": "center",
			}}
		>
			<Btn
				style={{
					display: "inline-block",
					width: "30%",
				}}
				ref={(el) => setBtnRef(el)}
				onClick={() => {console.log("클릭됨.")}}
			>
				버튼
			</Btn>

			<Drawer
			Title="Title"
			Body="Body"
			Footer="Footer"
			TrgRef={btnRef}
			placement="bottom"
			/>
		</main>
	);
}
