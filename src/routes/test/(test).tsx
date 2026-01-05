import { PasswordInput, Field } from "@components";

export default function test() {
	return (
		<main class="Main" style={{
			"align-items": "center"
		}}>
			<PasswordInput style={{
				width: "30%"
			}}
			Label="라벨"
			HelperText="HelperText"
			
			/>

			<Field style={{
				width: "30%"
			}}
			Label="라벨"
			HelperText="HelperText"
			
			/>
		</main>
	)
}