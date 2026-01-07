import { NumberInput } from "@components";

export default function test() {
	return (
		<main class="Main" style={{
			"align-items": "center"
		}}>
			<NumberInput 
			Label="라벨"
			HelperText="Helper Text"
			ErrorText="Error Text"
			style={{
				width: "30%"
			}}	
			/>
		</main>
	)
}