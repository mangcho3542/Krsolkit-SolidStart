import { Dialog } from "@components";
import { createSignal } from "solid-js";

export default function test() {
	const [trgRef, setTrgRef] = createSignal<HTMLButtonElement | undefined>();

	return (
		<main class="Main" style={{
			"align-items": "center"
		}}>
			<button ref={(el) => {setTrgRef(el);}}>
				버튼
			</button>

			<Dialog TrgRef={trgRef} 
			style={{
				"height": "100%"
			}}
			/>
		</main>
	)
}