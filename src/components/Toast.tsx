import styles from "@styles/Toast.module.css";
import {
	Toast as ArkToast,
	Toaster as ArkToaster,
	ToastRootProps,
	ToastTitleProps,
	ToastDescriptionProps,
	ToastCloseTriggerProps,
	CreateToasterProps as ArkCreateToasterProps,
	createToaster as ArkCreateToaster,
} from "@ark-ui/solid";
import type { CreateToasterReturn } from "@ark-ui/solid";
import { PUS } from "@/types/ComponentProps";
import { splitProps } from "solid-js";
import { splitComponentProps } from "@/utils/splitComponentProps";
import CloseIcon from "@images/CloseIcon.svg?raw";
import { SvgProps, Svg } from "./Svg";

export type ToasterType = CreateToasterReturn;
export interface CreateToasterProps
	extends Omit<ArkCreateToasterProps, "placement"> {
	placement?:
		| "top-start"
		| "top"
		| "top-end"
		| "bottom-start"
		| "bottom"
		| "bottom-end";
}

export function createToaster(props: CreateToasterProps) {
	return ArkCreateToaster({
		placement: props.placement ?? "bottom-end",
		...props,
	});
}

type TitleProps = PUS<ToastTitleProps>;
type DescProps = PUS<ToastDescriptionProps>;
type CloseTrgProps = PUS<ToastCloseTriggerProps>;

export interface ToasterProps extends PUS<ToastRootProps> {
	toast: ToasterType;
	TitleProps?: TitleProps;
	DescProps?: DescProps;
	CloseTrgProps?: CloseTrgProps;
	CloseIconProps?: Omit<SvgProps, "value">;
}

export function Toast(props: ToasterProps) {
	const [local, rest] = splitProps(props, [
		"toast",
		"TitleProps",
		"DescProps",
		"CloseTrgProps",
		"CloseIconProps",
	]);

	return (
		<ArkToaster toaster={local.toast} class={styles.Toaster}>
			{(toast) => (
				<ArkToast.Root {...splitComponentProps(rest, styles.Root)}>
					<ArkToast.Title
						{...splitComponentProps(local.TitleProps, styles.Title)}
					>
						{toast().title}
					</ArkToast.Title>

					<ArkToast.Description
						{...splitComponentProps(local.DescProps, styles.Desc)}
					>
						{toast().description}
					</ArkToast.Description>

					<ArkToast.CloseTrigger
						{...splitComponentProps(local.CloseTrgProps, styles.CloseTrigger)}
					>
						<Svg
							value={CloseIcon}
							{...splitComponentProps(local.CloseIconProps, styles.CloseIcon)}
						/>
					</ArkToast.CloseTrigger>
				</ArkToast.Root>
			)}
		</ArkToaster>
	);
}
