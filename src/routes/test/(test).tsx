import styles from "./test.module.css";
import CheckboxGroup from "@/components/CheckboxGroup"

export default function test() {
	return (
		<main class="Main" style={{
			"align-items": "center"
		}}>
			<CheckboxGroup
			class={styles.CheckboxGroup}
			CheckboxAry={[
				{
					value: "기본",
					Label: "기본"
				},
				{
					value: "기본 defaultChecked",
					Label: "기본 defaultChecked",
					defaultChecked: true
				},
				{
					value: "invalid",
					Label: "invalid",
					invalid: true
				},
				{
					value: "invalid defaultChecked",
					Label: "invalid defaultChecked",
					invalid: true,
					defaultChecked: true
				},
				{
					value: "disabled",
					Label: "disabled",
					disabled: true
				},
				{
					value: "disabled defaultChecked",
					Label: "disabled defaultChecked",
					disabled: true,
					defaultChecked: true
				},
			]}
			/>
		</main>
	)
}