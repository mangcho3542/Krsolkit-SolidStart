import styles from "@styles/Drawer.module.css";
import {
	DivProps,
	PUS,
	ComponentProps,
	ImageProps,
} from "@types";
import { splitComponentProps } from "@utils";
import {
	createEffect,
	createSignal,
	JSXElement,
	onCleanup,
	splitProps,
} from "solid-js";
import { Portal, spread } from "solid-js/web";
import { Btn, BtnProps } from "./Btn";
import CloseIcon from "@images/CloseIcon.svg";

export interface DrawerProps extends DivProps {
	BackdropProps?: PUS<ComponentProps>;
	PositionerProps?: PUS<DivProps>;
	Title?: JSXElement;
	TitleProps?: PUS<DivProps>;
	CloseBtnProps?: BtnProps;
	CloseIconProps?: ImageProps;
	Body?: JSXElement;
	BodyProps?: PUS<DivProps>;
	Footer?: JSXElement;
	FooterProps?: PUS<DivProps>;
	placement?: "start" | "end" | "top" | "bottom";
	useDefaultStyle?: boolean;
	defaultOpen?: boolean;
	TrgRef?: () => HTMLButtonElement | HTMLElement | undefined;
	onClose?: () => void;
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
	]);

	const [open, setOpen] = createSignal(false);
	const [dialogRef, setDialogRef] = createSignal<HTMLDivElement | undefined>();
	const [portalRef, setPortalRef] = createSignal<HTMLDivElement | undefined>();

	//trgRef에 eventListener 등록
	createEffect(() => {
		const trg = local.TrgRef?.();
		if (!dialogRef || !trg) return;

		function handleTrgClick() {
			setOpen(true);
		}

		trg.addEventListener("click", handleTrgClick);

		onCleanup(() => {
			trg.removeEventListener("click", handleTrgClick);
		});
	});

	//portal에 Backdrop 적용
	createEffect(() => {
		const portal = portalRef();
		if (!portal) return;

		let portalProps = splitComponentProps(
			local.BackdropProps,
			styles.Backdrop
		);

		portalProps["data-open"] = "false"
		portalProps["data-scope"] = "dialog";
		portalProps["data-part"] = "backdrop";

		spread(portal, portalProps);

		portal.onclick = (e) => {
			// 실제 백드롭(빈 영역) 클릭인지 확인
			if ((e.target as EventTarget) !== (e.currentTarget as EventTarget))
				return;
			setOpen(false);
		};
	});

	//dialog 열려있을 때는 스크롤 금지하는 effect
	createEffect(() => {
		if (typeof window === "undefined") return;

		const preventScroll = (e: Event) => {
			if (open()) e.preventDefault();
		};

		document.addEventListener("wheel", preventScroll, { passive: false });
		document.addEventListener("touchmove", preventScroll, { passive: false });

		onCleanup(() => {
			document.removeEventListener("wheel", preventScroll);
			document.removeEventListener("touchmove", preventScroll);
		});
	});

	return (
		<Portal ref={(el) => setPortalRef(el)}>
			<div
				{...splitComponentProps(local.PositionerProps, styles.Positioner)}
				data-open={open()}
				data-plecement={local.placement ?? "start"}
				onClick={(e) => {
					// positioner 자체의 빈 영역 클릭일때만 닫기
					if ((e.target as EventTarget) !== (e.currentTarget as EventTarget))
						return;
					setOpen(false);
				}}
				dir="ltr"
			>
				<div
					{...splitComponentProps(rest, styles.Dialog)}
					ref={(el) => {
						setDialogRef(el);
						if (typeof local.ref !== "undefined") local.ref = el;
					}}
					onClose={() => {
						setOpen(false);
						local.onClose?.();
					}}
					data-placement={local.placement ?? "start"}
					data-open={open()}
					aria-hidden={!open()}
				>
					<div {...splitComponentProps(local.TitleProps, styles.Title)}>
						{local.Title}
						<Btn {...splitComponentProps(local.CloseBtnProps, styles.CloseBtn)}
						onClick={() => {setOpen(false);}}>
							<img
								src={CloseIcon}
								{...splitComponentProps(local.CloseIconProps, styles.CloseIcon)}
							/>
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
	);
}

export default Drawer;
