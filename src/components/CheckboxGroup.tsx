import styles from "@styles/CheckboxGroup.module.css";
import { Checkbox, CheckboxProps } from "./Checkbox";
import { DivProps, PUS } from "@types";
import {
	createSignal,
	For,
	splitProps,
	createEffect,
	JSXElement,
} from "solid-js";
import { splitComponentProps } from "@utils";

type CheckboxBaseT = {
	name: string;
};
type CheckboxT = Omit<CheckboxProps, "onChange" | "defaultChecked"> &
	CheckboxBaseT;

export interface CheckboxGroupProps extends Omit<PUS<DivProps>, "onChange"> {
	CheckboxAry: CheckboxT[];
	onChange?: (e: string[]) => any;
	LabelProps?: PUS<DivProps>;
	Label?: JSXElement;
	ContentProps?: PUS<DivProps>;
	defaultValue?: string[];
	orientation?: "column" | "row";
}

export function CheckboxGroup(props: CheckboxGroupProps) {
	const [local, rest] = splitProps(props, [
		"CheckboxAry",
		"LabelProps",
		"Label",
		"ContentProps",
		"onChange",
		"defaultValue",
		"orientation",
	]);

	const [value, setValue] = createSignal<string[]>(local.defaultValue ?? []);

	function handleCheckboxChange(e: { value: boolean; name: string }) {
		setValue((prev) => {
			if(e.value) return prev.includes(e.name) ? prev : [...prev, e.name];
			else return prev.filter(name => name !== e.name);
		});
	}

	createEffect(() => {
		local.onChange?.(value());
	});

	return (
		<div {...splitComponentProps(rest, styles.Root)}>
			<div {...splitComponentProps(local.LabelProps, styles.Label)}>
				{local.Label}
			</div>

			<div
				{...splitComponentProps(local.ContentProps, styles.Content)}
				data-orientation={local.orientation ?? "column"}
			>
				<For each={local.CheckboxAry}>
					{(item) => (
						<Checkbox
							defaultChecked={value().includes(item.name)}
							onChange={(e) => handleCheckboxChange(e)}
							{...item}
						/>
					)}
				</For>
			</div>
		</div>
	);
}
