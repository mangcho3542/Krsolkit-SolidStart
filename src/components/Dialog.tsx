import { splitProps } from "solid-js";
import {
  Dialog as ArkDialog,
  DialogRootProps,
  DialogTriggerProps,
  DialogPositionerProps,
  DialogContentProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogCloseTriggerProps,
} from "@ark-ui/solid";
import { Portal } from "solid-js/web";
import CloseBtn from "./CloseBtn";
import { splitStyle } from "@/utils/splitStyle";
import styles from "@styles/Dialog.module.css";

interface ContentProps extends DialogContentProps {useDefaultStyle?: boolean;}
interface TitleProps extends DialogTitleProps {useDefaultStyle?: boolean;}
interface DescriptionProps extends DialogDescriptionProps {useDefaultStyle?: boolean};

export interface DialogProps extends DialogRootProps {
  TriggerProps?: DialogTriggerProps;
  PositionerProps?: DialogPositionerProps;
  ContentProps?: ContentProps;
  TitleProps?: TitleProps;
  Title?: Element;
  DescriptionProps?: DescriptionProps;
  Description?: Element;
  CloseTriggerProps?: DialogCloseTriggerProps;
  CloseTrigger?: Element;
}

export function Dialog(props: DialogProps) {
  const [local, rest] = splitProps(props, [
    "TriggerProps",
    "PositionerProps",
    "ContentProps",
    "TitleProps",
    "Title",
    "DescriptionProps",
    "Description",
    "CloseTriggerProps",
    "CloseTrigger",
  ]);

  return (
    <ArkDialog.Root {...rest}>
      <ArkDialog.Trigger {...local.TriggerProps} />

      <Portal>
        <ArkDialog.Backdrop />
        <ArkDialog.Positioner {...local.PositionerProps}>
          <ArkDialog.Content {...splitStyle(local.ContentProps, {class: styles.DialogContent})}>
            <ArkDialog.Title {...local.TitleProps}>
              {local.Title}
            </ArkDialog.Title>

            <ArkDialog.Description {...local.DescriptionProps}>
              {local.Description}
            </ArkDialog.Description>

            <ArkDialog.CloseTrigger {...local.CloseTriggerProps}>
              {local.CloseTrigger ?? <CloseBtn />}
            </ArkDialog.CloseTrigger>
          </ArkDialog.Content>
        </ArkDialog.Positioner>
      </Portal>
    </ArkDialog.Root>
  );
}

export default Dialog;