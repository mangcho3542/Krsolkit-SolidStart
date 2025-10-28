import {
  splitProps,
  JSX,
  createEffect,
  createSignal,
} from "solid-js";
import CloseBtn from "./CloseBtn";
import styles from "@styles/Dialog.module.css";
import { ComponentProps } from "@/types/ComponentProps";
import { convertCss } from './../utils/converCss';

interface ComponentPropsWithChoice extends ComponentProps {
  useDefaultStyle?: boolean;
}

export interface DialogProps extends ComponentPropsWithChoice {
  useDefaultStyle?: boolean;
  open?: boolean;
  CloseTrigger?: HTMLElement; // 기존 API를 유지
  CloseTriggerProps?: ComponentPropsWithChoice;
  onClose?: () => void;
  WrapperProps?: ComponentPropsWithChoice;
  TitleProps?: ComponentPropsWithChoice;
  Title?: JSX.Element;
  DescProps?: ComponentPropsWithChoice;
  Desc?: JSX.Element;
  ContentProps?: ComponentPropsWithChoice;
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

  //^컴포넌트 내부에서 사용할 siganl
  const [open, setOpen] = createSignal<bool>(local.open ?? false);

  //^ref들
  let dialogRef: HTMLDialogElement | null;
  let closeTrgRef: HTMLElement | SVGSVGElement | null;

  //~effect
  createEffect(() => {
    //dialogRef가 존재할 때만
    if(!dialogRef) return;

    if(local.open) {  //open이 true라면 dialog 보여주기
      setOpen(true);
      //렌더링 안되어있을때만 열어주기
      if(!dialogRef.open) dialogRef.showModal();
    }
    else {
      setOpen(false);
      //렌더링 되었을때만 닫아주기
      if(dialogRef.open) dialogRef.close();
    }
  });

  createEffect(() => {
    //dialog가 닫힐 때 onClose 실행
    if(!open()) local.onClose?.();
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
      >
        {/**Root */}
        <div
        class={rest.class}
        classList={{
          [styles.Root]: local.useDefaultStyle === undefined
          ? true 
          : local.useDefaultStyle
        }}
        id={rest.id}
        style={convertCss(rest.css)}
        {...rest}
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
                ref={(el) => closeTrgRef=el}
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
        </div>
      </dialog>
    );
  }

  return <>{open() && display()}</>;
}

export default Dialog;