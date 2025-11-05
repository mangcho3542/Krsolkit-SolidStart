import {
  splitProps,
  JSX,
  createEffect,
  createSignal,
  onCleanup,
} from "solid-js";
import CloseBtn from "./CloseBtn";
import styles from "@styles/Dialog.module.css";
import { ComponentProps } from "@/types/ComponentProps";
import { convertCss } from "./../utils/converCss";

interface ComponentPropsWithChoice extends ComponentProps {
  useDefaultStyle?: boolean;
}

export interface DialogProps extends ComponentPropsWithChoice {
  useDefaultStyle?: boolean;
  open?: boolean;
  TrgRef?: HTMLElement;
  CloseTriggerProps?: ComponentPropsWithChoice;
  onOpen?: () => void;
  onClose?: () => void;
  WrapperProps?: ComponentPropsWithChoice;
  TitleProps?: ComponentPropsWithChoice;
  Title?: JSX.Element;
  DescProps?: ComponentPropsWithChoice;
  Desc?: JSX.Element;
  ContentProps?: ComponentPropsWithChoice;
  Content?: JSX.Element;
}

//dialog닫힘 -> setOpen(false) -> local.onClose?.()(useEffect 때문에 open바뀌고 나서 실행)
export function Dialog(props: DialogProps) {
  const [local, rest] = splitProps(props, [
    "open",
    "useDefaultStyle",
    "TrgRef",
    "CloseTriggerProps",
    "onOpen",
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

  //^ref
  const [dlgRef, setDlgRef] = createSignal<HTMLDialogElement | undefined>();

  //~effect
  //~TrgRef가 클릭되면 dialog열어주기
  createEffect(() => {
    const el = local.TrgRef;
    //TrgRef가 undefined라면 아무것도 안함.
    if (!el) return;

    if (!dlgRef()) return;
    //TrgRef가 클릭될 때 실행될 함수
    function trgClickHandler() {
      dlgRef()!.showModal();
      setOpen(true);
    }

    el.addEventListener("click", trgClickHandler);

    //unMount될 때는 trgClickHandler삭제
    onCleanup(() => {
      el.removeEventListener("click", trgClickHandler);
    });
  });

  //~dialog가 열리고 닫힐 때
  createEffect(() => {
    if (open()) local.onOpen?.(); //~dialog열릴 때는 onOpen 실행
    //~dialog닫힐 때는 onClose실행
    else {
      local.onClose?.();
    }
  });

  //&function
  //&dialog(Root가 아닌 부분)이 클릭되면 dialog close
  function handleDlgClick(e: MouseEvent) {
    if (e.target === dlgRef() && dlgRef()) {
      dlgRef()!.close();
      setOpen(false);
    }
  }

  //&closseBtn 클릭되면 dialog close
  function handleClsBtnClick(_: MouseEvent) {
    dlgRef()!.close();
    setOpen(false);
  }

  // 실제 렌더
  function display() {
    return (
      <dialog
        ref={setDlgRef}
        class={styles.Dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={local.TitleProps?.id}
        aria-describedby={local.DescProps?.id}
        onClick={handleDlgClick}
        onClose={() => {
          setOpen(false); //open을 false로 설정
        }}
        onCancel={() => {
          setOpen(false);
        }}
      >
        {/**Root */}
        <div
          class={rest.class + " " + styles.Root}
          classList={{
            [styles.RootDefaultStyle]:
              local.useDefaultStyle === undefined
                ? true
                : local.useDefaultStyle,
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
                  : local.WrapperProps?.useDefaultStyle,
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
            <CloseBtn
              class={local.CloseTriggerProps?.class}
              id={local.CloseTriggerProps?.id}
              classList={{
                [styles.CloseBtn]:
                  local.CloseTriggerProps?.useDefaultStyle === undefined
                    ? true
                    : local.CloseTriggerProps?.useDefaultStyle,
                ...local.CloseTriggerProps?.classList,
              }}
              onClick={handleClsBtnClick}
            />
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

  return <>{display()}</>;
}

export default Dialog;