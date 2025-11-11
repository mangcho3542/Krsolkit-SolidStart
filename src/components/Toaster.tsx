import styles from "@styles/Toaster.module.css";
import {
  Toast,
  Toaster as ArkToaster,
  ToastRootProps,
  ToastTitleProps,
  ToastDescriptionProps,
  ToastCloseTriggerProps,
  createToaster
} from "@ark-ui/solid";
import type { CreateToasterReturn } from "@ark-ui/solid";
import { PUS } from "@/types/ComponentProps";
import { splitProps } from "solid-js";
import { splitComponentProps } from "@/utils/splitComponentProps";
import CloseIcon from "@images/CloseIcon.svg?raw";
import { SvgProps, Svg } from "./Svg";

export type ToasterType = CreateToasterReturn;
export { createToaster };

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

export function Toaster(props: ToasterProps) {
  const [local, rest] = splitProps(props, [
    "toast",
    "TitleProps",
    "DescProps",
    "CloseTrgProps",
    "CloseIconProps",
  ]);

  return (
    <ArkToaster toaster={local.toast}>
      {(toast) => (
        <Toast.Root {...splitComponentProps(rest, styles.Root)}>
          <Toast.Title {...splitComponentProps(local.TitleProps, styles.Title)}>
            {toast().title}
          </Toast.Title>

          <Toast.Description
            {...splitComponentProps(local.DescProps, styles.Desc)}
          >
            {toast().description}
          </Toast.Description>

          <Toast.CloseTrigger
            {...splitComponentProps(local.CloseTrgProps, styles.Desc)}
          >
            <Svg
              value={CloseIcon}
              {...splitComponentProps(local.CloseIconProps, styles.CloseIcon)}
            />
          </Toast.CloseTrigger>
        </Toast.Root>
      )}
    </ArkToaster>
  );
}