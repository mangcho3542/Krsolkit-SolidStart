import styles from "@styles/Checkbox.module.css";
import {
	Checkbox as ArkCheckbox,
	CheckboxRootProps as ArkCheckboxRootProps,
	CheckboxLabelProps as ArkCheckboxLabelProps,
	CheckboxControlProps as ArkCheckboxControlProps,
	CheckboxIndicatorProps as ArkCheckboxIndicatorProps,
} from "@ark-ui/solid";
import { PUS } from "@types";
import { JSXElement, splitProps } from "solid-js";
import { splitComponentProps } from "@utils";

export type CheckboxLabelProps = PUS<ArkCheckboxLabelProps>;
export type CheckboxControlProps = PUS<ArkCheckboxControlProps>;
export type CheckboxIndicatorProps = PUS<ArkCheckboxIndicatorProps>;

export interface CheckboxProps extends PUS<ArkCheckboxRootProps> {
	Label?: JSXElement;
	LabelProps?: CheckboxLabelProps;
	ControlProps?: CheckboxControlProps;
	IndicatorProps?: CheckboxIndicatorProps;
}

export function Checkbox(props: CheckboxProps) {
	const [local, rest] = splitProps(props, [
		"Label",
		"LabelProps",
		"ControlProps",
		"IndicatorProps",
		"defaultChecked",
		"invalid",
		"disabled",
		"value",
	]);

	return (
		<ArkCheckbox.Root
			{...splitComponentProps(rest, styles.Root)}
			defaultChecked={
				local.defaultChecked !== undefined ? local.defaultChecked : false
			}
			invalid={local.invalid}
			disabled={local.disabled}
			value={local.value}
		>
			<ArkCheckbox.Control
				{...splitComponentProps(local.ControlProps, styles.Control)}
			>
				<ArkCheckbox.Indicator
					{...splitComponentProps(local.IndicatorProps, styles.Indicator)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 -960 960 960"
						width="24px"
						class={styles.Icon}
					>
						<path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
					</svg>
				</ArkCheckbox.Indicator>
			</ArkCheckbox.Control>

			<ArkCheckbox.Label
				{...splitComponentProps(local.LabelProps, styles.Label)}
			>
				{local.Label}
			</ArkCheckbox.Label>
			<ArkCheckbox.HiddenInput />
		</ArkCheckbox.Root>
	);
}

export default Checkbox;
