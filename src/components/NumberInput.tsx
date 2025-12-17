import styles from "@styles/NumberInput.module.css";
import {
	NumberInput as ArkNumberInput,
	NumberInputRootProps,
	NumberInputLabelProps as LabelProps,
	NumberInputInputProps as InputProps,
	NumberInputControlProps as ControlProps,
	NumberInputIncrementTriggerProps,
	NumberInputDecrementTriggerProps,
} from "@ark-ui/solid/number-input";
import { PUS } from "@types";
import { JSXElement, splitProps } from "solid-js";
import { splitComponentProps } from "@utils";

export type NumberInputLabelProps = PUS<LabelProps>;
export type NumberInputInputProps = PUS<InputProps>;
export type NumberInputControlProps = PUS<ControlProps>;
export type NumberInputIncTrgProps = PUS<NumberInputIncrementTriggerProps>;
export type NumberInputDecTrgProps = PUS<NumberInputDecrementTriggerProps>;

export interface NumberInputProps extends PUS<NumberInputRootProps> {
	Label?: JSXElement;
	LabelProps?: NumberInputLabelProps;
	useTrg?: boolean;
	InputProps?: NumberInputInputProps;
	ControlProps?: NumberInputControlProps;
	IncTrgProps?: NumberInputIncTrgProps;
	DecTrgProps?: NumberInputDecTrgProps;
	useScrubber?: boolean;
}

export function NumberInput(props: NumberInputProps) {
	const [local, rest] = splitProps(props, [
		"Label",
		"LabelProps",
		"useTrg",
		"InputProps",
		"ControlProps",
		"IncTrgProps",
		"DecTrgProps",
		"useScrubber",
		"min",
		"max",
		"aria-valuemin",
		"aria-valuemax",
	]);

	return (
		<ArkNumberInput.Root
			{...splitComponentProps(rest, styles.Root)}
			min={local.min !== undefined ? local.min : Number.MIN_SAFE_INTEGER}
			max={local.max !== undefined ? local.max : Number.MAX_SAFE_INTEGER}
			aria-valuemin={
				local["aria-valuemin"] !== undefined
					? local["aria-valuemin"]
					: Number.MIN_SAFE_INTEGER
			}
			aria-valuemax={
				local["aria-valuemax"] !== undefined
					? local["aria-valuemax"]
					: Number.MAX_SAFE_INTEGER
			}
		>
			{local.useScrubber && <ArkNumberInput.Scrubber />}
			<ArkNumberInput.Label
				{...splitComponentProps(local.LabelProps, styles.Label)}
			>
				{local.Label}
			</ArkNumberInput.Label>

			<div class={styles.Group}>
				<ArkNumberInput.Input
					{...splitComponentProps(local.InputProps, styles.Input)}
				/>

				{local.useTrg && (
					<ArkNumberInput.Control
						{...splitComponentProps(local.ControlProps, styles.Control)}
					>
						<ArkNumberInput.IncrementTrigger
							{...splitComponentProps(local.IncTrgProps, styles.IncTrg)}
						>
							<svg viewBox="0 0 24 24" class={styles.TrgIcon}>
								<path d="m18 15-6-6-6 6"></path>
							</svg>
						</ArkNumberInput.IncrementTrigger>
						<ArkNumberInput.DecrementTrigger
							{...splitComponentProps(local.DecTrgProps, styles.DecTrg)}
						>
							<svg viewBox="0 0 24 24" class={styles.TrgIcon}>
								<path d="m6 9 6 6 6-6"></path>
							</svg>
						</ArkNumberInput.DecrementTrigger>
					</ArkNumberInput.Control>
				)}
			</div>
		</ArkNumberInput.Root>
	);
}

export default NumberInput;
