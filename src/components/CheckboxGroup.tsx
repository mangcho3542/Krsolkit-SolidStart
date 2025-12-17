import styles from "@styles/Checkbox.module.css";
import {
	CheckboxGroupProps as ArkCheckboxGroupProps,
	Checkbox as ArkCheckbox,
} from "@ark-ui/solid";
import { createMemo, For, splitProps } from "solid-js";
import { CheckboxProps, Checkbox } from "./Checkbox";
import { PUS } from "@types";
import { splitComponentProps } from "@utils";

export interface CheckboxGroupProps extends PUS<ArkCheckboxGroupProps> {
	CheckboxAry?: CheckboxProps[];
	flexDir?: "row" | "column";
}

export function CheckboxGroup(props: CheckboxGroupProps) {
	const [local, rest] = splitProps(props, [
		"CheckboxAry",
		"name",
		"value",
		"defaultValue",
		"flexDir",
	]);

	const other = createMemo(() =>
		splitComponentProps(rest, styles.CheckboxGroup)
	);

	const getDefaultValue = createMemo(() => {
		if (local.defaultValue !== undefined) return local.defaultValue;
		if (local.CheckboxAry == undefined) return undefined;
		let res: string[] = [];
		local.CheckboxAry.forEach(({ checked, defaultChecked, value }) => {
			if ((checked || defaultChecked) && value) res.push(value);
		});
		return res;
	});

	return (
		<ArkCheckbox.Group
			name={local.name}
			value={local.value}
			defaultValue={getDefaultValue()}
			class={other().class}
			id={other().id}
			classList={other().classList}
			style={{ ...other().style, "flex-direction": local.flexDir ?? "column" }}
		>
			<For each={local.CheckboxAry}>
				{(props) => (
					<Checkbox
						value={props.value}
						Label={props.Label}
						invalid={props.invalid}
						disabled={props.disabled}
						defaultChecked={props.defaultChecked}
						LabelProps={props.LabelProps}
						ControlProps={props.ControlProps}
						IndicatorProps={props.IndicatorProps}
						{...props}
					/>
				)}
			</For>
		</ArkCheckbox.Group>
	);
}

export default CheckboxGroup;
