import styles from "@styles/Dialog.module.css";
import { ComponentProps, DivProps, PUS } from "@/types/ComponentProps";
import {
	Accessor,
	createEffect,
	createSignal,
	JSXElement,
	onCleanup,
	onMount,
	Show,
	splitProps,
} from "solid-js";
import { Portal, spread } from "solid-js/web";
import { Btn, BtnProps } from "./Btn";
import { splitComponentProps } from "@utils/splitComponentProps";

export interface DialogProps extends PUS<DivProps> {
	BackdropProps?: PUS<DivProps>;
	PositionerProps?: PUS<DivProps>;
	TitleProps?: PUS<DivProps>;
	Title?: JSXElement;
	CloseBtnProps?: BtnProps;
	CloseIconProps?: ComponentProps;
	BodyProps?: PUS<DivProps>;
	Body?: JSXElement;
	FooterProps?: PUS<DivProps>;
	Footer?: JSXElement;
	defaultOpen?: boolean;
	TrgRef?: Accessor<HTMLButtonElement | HTMLElement | undefined>;
	onClose?: () => void;
	CloseOnEscape?: boolean;
}

export function Dialog(props: DialogProps) {
	const [local, rest] = splitProps(props, [
		"BackdropProps",
		"PositionerProps",
		"TitleProps",
		"Title",
		"CloseBtnProps",
		"CloseIconProps",
		"BodyProps",
		"Body",
		"FooterProps",
		"Footer",
		"defaultOpen",
		"TrgRef",
		"onClose",
		"ref",
		"CloseOnEscape",
	]);

	//열림/닫힘 관리할 signal
	const [open, setOpen] = createSignal(
		local.defaultOpen !== undefined ? true : false
	);

	//mount관리할 signal
	const [mounted, setMounted] = createSignal(
		local.defaultOpen !== undefined ? true : false
	);

	//portalRef
	const [backdropRef, setBackdropRef] = createSignal<
		HTMLDivElement | undefined
	>();

	//CloseOnEscape flag
	const CloseOnEscape =
		local.CloseOnEscape === undefined || local.CloseOnEscape === true;

	//Dialog 숨기는 함수
	function hide() {
		setOpen(false);
		setTimeout(() => {
			setMounted(false);
		}, 100);
	}

	//Dialog 보여주는 함수
	function show() {
		setMounted(true);
		requestAnimationFrame(() => {
			setOpen(true);
		});
	}

	//TrgRef에 eventListner 등록
	createEffect(() => {
		const trg = local.TrgRef?.();
		if (!trg) return;

		trg.addEventListener("click", show);
	});

	//cleanup될때는 eventListner 삭제
	onCleanup(() => {
		local.TrgRef?.()?.removeEventListener("click", show);
	});

	//backdropProps를 portal에 적용
	createEffect(() => {
		const backdrop = backdropRef(); //portal
		if (!backdrop) return;

		const backdropProps = splitComponentProps(
			local.BackdropProps,
			styles.Backdrop
		);
		backdropProps["data-scope"] = "dialog";
		backdropProps["data-part"] = "backdrop";
		backdropProps.onClick = (e) => {
			if (e.target === e.currentTarget) hide();
		};

		spread(backdrop, backdropProps);
	});

	//backdrop에 data-open 적용
	createEffect(() => {
		const backdrop = backdropRef();

		if (!backdrop) return;

		if (open()) backdrop.setAttribute("data-open", "");
		else {
			backdrop.removeAttribute("data-open");
			local.onClose?.();
		}
	});

	//esc눌렀을 때 닫아줄 함수
	function closeOnEscape(e: KeyboardEvent) {
		if (e.key === "Escape" && open() && mounted()) hide();
	}

	//esc눌렀을 때 닫기
	if (CloseOnEscape) {
		onMount(() => {
			if (typeof document !== "undefined")
				document.addEventListener("keydown", closeOnEscape);
		});
	}

	//esc eventListener 삭제
	onCleanup(() => {
		if (typeof document !== "undefined" && CloseOnEscape)
			document.removeEventListener("keydown", closeOnEscape);
	});

	//모바일 터치 막는 함수
	const preventScroll = (e: TouchEvent) => {
		if(mounted() && open()) e.preventDefault();
	}

	//열려있을 때는 스크롤 금지
	onMount(() => {
		if(typeof window === "undefined") return;

		window.addEventListener("touchmove", preventScroll, {passive: false});
	});

	onCleanup(() => {
		if(typeof window === "undefined") return;

		window.removeEventListener("touchmove", preventScroll);
	})

	return (
		<Show when={mounted()}>
			<Portal
				ref={(el) => {
					setBackdropRef(el);
				}}
			>
				<div
					{...splitComponentProps(local.PositionerProps, styles.Positioner)}
					onClick={(e) => {
						if (e.target === e.currentTarget) hide();
					}}
					{...(open() && { "data-open": "" })}
					dir="ltr"
				>
					<div
						{...splitComponentProps(rest, styles.Dialog)}
						ref={(el) => {
							if (typeof local.ref !== "undefined") local.ref = el;
						}}
						aria-hidden={!open()}
						{...(open() && { "data-open": "" })}
					>
						<div {...splitComponentProps(local.TitleProps, styles.Title)}>
							{local.Title}

							<Btn
								{...splitComponentProps(local.CloseBtnProps, styles.CloseBtn)}
								onClick={() => {
									hide();
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24px"
									height="24px"
									viewBox="0 -960 960 960"
									{...splitComponentProps(local.CloseIconProps, styles.CloseIcon)}
								>
									<path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
								</svg>
							</Btn>
						</div>

						<div {...splitComponentProps(local.BodyProps, styles.Body)}>
							{local.Body}
						</div>

						<div {...splitComponentProps(local.FooterProps, styles.Footer)}>
							{local.Footer}
						</div>
					</div>
				</div>
			</Portal>
		</Show>
	);
}

export default Dialog;
