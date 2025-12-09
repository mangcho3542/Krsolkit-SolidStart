import styles from "./test.module.css";
import NumberInput from "@/components/NumberInput";

export default function test() {
	return (
		<main class="Main" style={{
			"align-items": "center"
		}}>
			<div
			style={{
				display: "flex",
				"flex-direction": "column",
				"align-items": "center",
				padding: "5%"
			}}
			>
				<NumberInput
				Label="Label"
				useTrg={true}
				/>
			</div>
		</main>
	)
}