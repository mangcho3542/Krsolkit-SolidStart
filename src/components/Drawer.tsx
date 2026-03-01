import styles from "@styles/Drawer.module.css";
import { DivProps, PUS, ComponentProps } from "@/types/ComponentProps";
import { splitComponentProps } from "@utils/splitComponentProps";
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

export interface DrawerProps extends PUS<DivProps> {
	BackdropProps?: PUS<ComponentProps>;
	PositionerProps?: PUS<DivProps>;
	Title?: JSXElement;
	TitleProps?: PUS<DivProps>;
	CloseBtnProps?: BtnProps;
	CloseIconProps?: Omit<ComponentProps, "children">;
	Body?: JSXElement;
	BodyProps?: PUS<DivProps>;
	Footer?: JSXElement;
	FooterProps?: PUS<DivProps>;
	placement?: "start" | "end" | "top" | "bottom";
	defaultOpen?: boolean;
	TrgRef?: HTMLElement | undefined;
	onClose?: () => void;
	CloseOnEscape?: boolean;
}

export function Drawer(props: DrawerProps) {
	const [local, rest] = splitProps(props, [
		"BackdropProps",
		"PositionerProps",
		"Title",
		"TitleProps",
		"CloseBtnProps",
		"CloseIconProps",
		"Body",
		"BodyProps",
		"Footer",
		"FooterProps",
		"placement",
		"onClose",
		"ref",
		"defaultOpen",
		"TrgRef",
		"CloseOnEscape",
	]);

	//show/hide 관리할 signal
	const [open, setOpen] = createSignal(false);

	//mount 여부 결정할 signal
	const [mounted, setMounted] = createSignal(false);

	//portal에 적용할 ref
	const [backdropRef, setBackdropRef] = createSignal<
		HTMLDivElement | undefined
	>();

	//CloseOnEscape Flag
	const CloseOnEscape =
		local.CloseOnEscape === undefined || local.CloseOnEscape === true;

	//Drawer 감추는 함수
	function hide() {
		setOpen(false);
		setTimeout(() => {
			setMounted(false);
		}, 500);
	}

	//Drawer 보여주는 함수
	function show() {
		setMounted(true);
		requestAnimationFrame(() => {
			setOpen(true);
		});
	}

	//trgRef에 eventListener 등록
	createEffect(() => {
		const trg = local.TrgRef;
		if (!trg) return;

		trg.addEventListener("click", show);
	});

	//unmount될때 eventListner 삭제
	onCleanup(() => {
		local.TrgRef?.removeEventListener("click", show);
	});

	//portal에 Backdrop 적용
	createEffect(() => {
		const portal = backdropRef();
		if (!portal) return;

		let portalProps = splitComponentProps<DivProps>(
			local.BackdropProps,
			styles.Backdrop
		);

		portalProps["data-scope"] = "drawer";
		portalProps["data-part"] = "backdrop";
		portalProps.onClick = (e) => {
			if (e.target === e.currentTarget) hide();
		};

		spread(portal, portalProps);
	});

	//portal에 data-open적용
	createEffect(() => {
		const portal = backdropRef();
		if (!portal) return;

		if (open()) portal.setAttribute("data-open", "");
		else {
			portal.removeAttribute("data-open");
			local.onClose?.();
		}
	});

	//esc눌렀을 때 닫아줄 함수
	function closeOnEscape(e: KeyboardEvent) {
		if (e.key === "Escape" && open() && mounted()) hide();
	}

	//esc로 닫음
	if (CloseOnEscape) {
		onMount(() => {
			if (typeof document !== "undefined")
				document.addEventListener("keydown", closeOnEscape);
		});
	}

	//remove closeOnEscape
	onCleanup(() => {
		if (typeof document !== "undefined" && CloseOnEscape)
			document.removeEventListener("keydown", closeOnEscape);
	});

	return (
		<Show when={mounted()}>
			<Portal ref={(el) => setBackdropRef(el)}>
				<div
					{...splitComponentProps(local.PositionerProps, styles.Positioner)}
					{...(open() && { "data-open": "" })}
					data-plecement={local.placement ?? "start"}
					onClick={(e) => {
						// positioner 자체의 빈 영역 클릭일때만 닫기
						if (e.target === e.currentTarget) hide();
					}}
					aria-hidden={!open()}
					dir="ltr"
				>
					<div
						{...splitComponentProps(rest, styles.Dialog)}
						ref={(el) => {
							if (typeof local.ref !== "undefined") local.ref = el;
						}}
						data-placement={local.placement ?? "start"}
						{...(open() && { "data-open": "" })}
						aria-hidden={!open()}
					>
						<div {...splitComponentProps(local.TitleProps, styles.Title)}>
							{local.Title}
							<Btn
								{...splitComponentProps(local.CloseBtnProps, styles.CloseBtn)}
								onClick={() => {
									setOpen(false);
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

export default Drawer;
