import { createEffect, createSignal, splitProps } from "solid-js";
import { Portal } from "solid-js/web";
import CloseBtn from "./CloseBtn";
import styles from "@styles/Dialog.module.css";
import { ComponentBaseProps } from "@/types/ComponentProps";

interface ComponentProps extends ComponentBaseProps {
  useDefaultStyle?: boolean;
}

export interface DialogProps extends ComponentProps {
  useDefaultStyle?: boolean;
  open?: boolean;
  CloseTrigger?: HTMLElement;
  CloseTriggerProps?: ComponentProps;
  onClose?: () => void;
  mount?: Element;
  TitleProps?: ComponentProps;
  Title?: Element;
  DescProps?: ComponentProps;
  Desc?: Element;
  ContentProps?: ComponentProps;
  Content?: Element;
}

export function Dialog(props: DialogProps) {
  const [local, rest] = splitProps(props, [
    "open",
    "useDefaultStyle",
    "CloseTrigger",
    "CloseTriggerProps",
    "onClose",
    "mount",
    "TitleProps",
    "Title",
    "DescProps",
    "Desc",
    "ContentProps",
    "Content",
  ]);

  //open의 default값은 false로 설정
  const [open, setOpen] = createSignal<boolean | undefined>(
    local.open !== undefined ? local.open : false
  );

  //ref
  let dialogRef: HTMLDialogElement;

  //실제 렌더링될 컴포넌트
  function display() {
    return (
      <Portal mount={local.mount ?? document.getElementsByClassName("Main")[0]}>
        <dialog
          class={props.class}
          classList={{
            [styles.Dialog]:
              local.useDefaultStyle === undefined
                ? true
                : local.useDefaultStyle,
            ...rest.classList,
          }}
          ref={(el) => (dialogRef = el)}
        >
          {/**Title */}
          <div
            class={local.TitleProps?.class}
            id={local.TitleProps?.id}
            classList={{
              [styles.DialogTitle]:
                local.TitleProps?.useDefaultStyle === undefined
                  ? true
                  : local.TitleProps?.useDefaultStyle,
              ...local.TitleProps?.classList,
            }}
          >
            {local.Title}

            {/**CloseTrigger */}
            {local.CloseTrigger ?? (
              <CloseBtn
                ref={closeTrgRef as SVGSVGElement}
                class={local.CloseTriggerProps?.class}
                id={local.CloseTriggerProps?.id}
                classList={{
                  ...local.CloseTriggerProps?.classList,
                  [styles.CloseBtn]:
                    local.CloseTriggerProps?.useDefaultStyle === undefined
                      ? true
                      : local.CloseTriggerProps?.useDefaultStyle,
                }}
              />
            )}
          </div>

          {/**Desc */}
          <div
            class={local.DescProps?.class}
            id={local.DescProps?.id}
            classList={{
              [styles.DialogDesc]:
                local.DescProps?.useDefaultStyle === undefined
                  ? true
                  : local.DescProps?.useDefaultStyle,
              ...local.DescProps?.classList,
            }}
          >
            {local.Desc}
          </div>

          {/**Content */}
          <div
            class={local.ContentProps?.class}
            id={local.ContentProps?.id}
            classList={{
              [styles.DialogContent]:
                local.ContentProps?.useDefaultStyle === undefined
                  ? true
                  : local.DescProps?.useDefaultStyle,
              ...local.ContentProps?.classList,
            }}
          >
            {local.Content}
          </div>
        </dialog>
      </Portal>
    );
  }

  let closeTrgRef: HTMLElement | SVGSVGElement | undefined;

  //^effect

  //open업데이트
  createEffect(() => {
    setOpen(local.open);
  });

  //dialog업데이트
  createEffect(() => {
    if (open()) dialogRef.showModal();
    else {
      if (dialogRef.open) dialogRef.close();
    }
  });

  //closeTrgRef 업데이트
  createEffect(() => {
    closeTrgRef = local.CloseTrigger;
    closeTrgRef?.addEventListener("click", () => {
      setOpen(false);
    });
  });

  return <>{open() && display()}</>;
}

export default Dialog;