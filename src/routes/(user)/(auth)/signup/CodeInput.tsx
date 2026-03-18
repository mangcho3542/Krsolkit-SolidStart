import { Btn, BtnProps } from "@components/Btn";
import { Field, FieldProps } from "@components/Field";
import { JSXElement, splitProps } from "solid-js";

interface CodeInputProps extends FieldProps {
	BtnProps?: BtnProps;
	BtnChildren?: JSXElement;
}

export function CodeInput(props: CodeInputProps) {
	const [others, rest] = splitProps(props, [
		"Label",
		"LabelProps",
		"InputProps",
		"ErrorText",
		"ErrorTextProps",
		"HelperText",
		"HelperTextProps",
		"name",
		"BtnProps",
		"BtnChildren",
	]);

	let input: HTMLInputElement | undefined;

	return (
		<Field.Root {...rest}>
			<Field.Label {...others.LabelProps}>
				
				{others.Label}
			</Field.Label>

			<div class="w-full h-auto m-0 p-0 relative">
				<Field.Input {...others.InputProps} ref={(el) => (input = el)} />

				<div class="w-auto h-auto absolute bottom-[53.5%] translate-y-[50%] right-[1%] p-0 m-0">
					<Btn class="w-auto h-auto bg-(--bg-reversed-color) text-reversed-color text-base ">
						{others.BtnChildren}
					</Btn>
				</div>
			</div>

			<Field.ErrorText {...others.ErrorTextProps}>
				{others.ErrorText}
			</Field.ErrorText>

			<Field.HelperText {...others.HelperTextProps}>
				{others.HelperText}
			</Field.HelperText>
		</Field.Root>
	);
}
