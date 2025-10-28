import {
  createEffect,
  createSignal,
  splitProps,
  onCleanup,
  JSX,
} from "solid-js";
import CloseBtn from "./CloseBtn";
import styles from "@styles/Dialog.module.css";
import { ComponentBaseProps } from "@/types/ComponentProps";

interface ComponentProps extends ComponentBaseProps {
  useDefaultStyle?: boolean;
}

export interface DialogProps extends ComponentProps {
  useDefaultStyle?: boolean;
  open?: boolean;
  CloseTrigger?: HTMLElement; // 기존 API를 유지
  CloseTriggerProps?: ComponentProps;
  onClose?: () => void;
  WrapperProps?: ComponentProps;
  TitleProps?: ComponentProps;
  Title?: JSX.Element;
  DescProps?: ComponentProps;
  Desc?: JSX.Element;
  ContentProps?: ComponentProps;
  Content?: JSX.Element;
}

export function Dialog(props: DialogProps) {
  const [local, rest] = splitProps(props, [
    "open",
    "useDefaultStyle",
    "CloseTrigger",
    "CloseTriggerProps",
    "onClose",
    "WrapperProps",
    "TitleProps",
    "Title",
    "DescProps",
    "Desc",
    "ContentProps",
    "Content",
  ]);

  // 내부 상태: 기본값 false
  const [open, setOpen] = createSignal<boolean>(local.open ?? false);

  // refs
  let dialogRef: HTMLDialogElement | undefined;
  let closeTrgRef: HTMLElement | SVGSVGElement | undefined;

  // 외부 open prop과 동기화
  createEffect(() => {
    if (local.open !== undefined) setOpen(local.open);
  });

  // dialog 열고/닫기 동기화
  createEffect(() => {
    const dlg = dialogRef;
    const isOpen = open();
    if (!dlg) return;

    if (isOpen) {
      if (!dlg.open) {
        try {
          dlg.showModal();
        } catch {
          // 아직 DOM에 안붙은 경우 등 안전 fallback
          dlg.setAttribute("open", "");
        }
      }
    } else {
      if (dlg.open) dlg.close();
    }
  });

  // Esc로 닫히거나 외부적으로 close()가 호출된 경우 내부 상태와 동기화
  createEffect(() => {
    const dlg = dialogRef;
    if (!dlg) return;

    const handleClose = () => {
      // 외부에서 닫혔다면 내부 상태도 false로 맞추고 onClose 호출
      const wasOpen = open();
      setOpen(false);
      if (wasOpen) local.onClose?.();
    };

    dlg.addEventListener("close", handleClose);
    onCleanup(() => dlg.removeEventListener("close", handleClose));
  });

  // open -> closed로 전환될 때만 onClose 호출 (중복 호출 방지)
  {
    let prev = open();
    createEffect(() => {
      const cur = open();
      if (prev && !cur) local.onClose?.();
      prev = cur;
    });
  }

  // CloseTrigger(사용자 제공 요소 또는 기본 CloseBtn)에 안전하게 click 핸들러 연결
  createEffect(() => {
    const el = local.CloseTrigger ?? closeTrgRef;
    if (!el) return;

    const handler = () => setOpen(false);
    el.addEventListener("click", handler);
    onCleanup(() => el.removeEventListener("click", handler));
  });

  // 실제 렌더
  function display() {
    return (
      <dialog
        ref={(el) => (dialogRef = el)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={local.TitleProps?.id}
        aria-describedby={local.DescProps?.id}
        class={rest.class}
        id={rest.id}
        classList={{
          [styles.Dialog]:
            local.useDefaultStyle === undefined ? true : local.useDefaultStyle,
          ...rest.classList,
        }}
      >
        {/**Wrapper */}
        <div
          class={local.WrapperProps?.class}
          id={local.WrapperProps?.id}
          classList={{
            [styles.DialogWrapper]:
              local.WrapperProps?.useDefaultStyle === undefined
                ? true
                : local.TitleProps?.useDefaultStyle,
            ...local.WrapperProps?.classList,
          }}
        >
          {/* Title */}
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
          </div>

          {/* CloseTrigger */}
          {local.CloseTrigger ?? (
            <CloseBtn
              ref={closeTrgRef as SVGSVGElement}
              class={local.CloseTriggerProps?.class}
              id={local.CloseTriggerProps?.id}
              classList={{
                [styles.CloseBtn]:
                  local.CloseTriggerProps?.useDefaultStyle === undefined
                    ? true
                    : local.CloseTriggerProps?.useDefaultStyle,
                ...local.CloseTriggerProps?.classList,
              }}
            />
          )}
        </div>

        {/* Desc */}
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

        {/* Content */}
        <div
          class={local.ContentProps?.class}
          id={local.ContentProps?.id}
          classList={{
            [styles.DialogContent]:
              local.ContentProps?.useDefaultStyle === undefined
                ? true
                : local.ContentProps?.useDefaultStyle, // 오타 수정됨
            ...local.ContentProps?.classList,
          }}
        >
          {local.Content}
        </div>
      </dialog>
    );
  }

  return <>{open() && display()}</>;
}

export default Dialog;