import styles from "@styles/Drawer.module.css";
import { DivProps, PUS, ComponentProps } from "@/types/ComponentProps";
import { splitComponentProps } from "@/utils/splitComponentProps";
import {
	createEffect,
	createSignal,
	JSXElement,
	onCleanup,
	onMount,
	splitProps,
} from "solid-js";
import { Portal } from "solid-js/web";

export interface DrawerProps extends DivProps {
	BackdropProps?: PUS<ComponentProps>;
	PositionerProps?: PUS<DivProps>;
	Title?: JSXElement;
	TitleProps?: PUS<DivProps>;
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

// 수정된 핵심 부분만 포함 (전체 파일에 덮어써도 됨)
export function Drawer(props: DrawerProps) {
	const [local, rest] = splitProps(props, [
		"BackdropProps",
		"PositionerProps",
		"Title",
		"TitleProps",
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

		const portalProps = splitComponentProps(
			local.BackdropProps,
			styles.Backdrop
		);

		let className = portalProps.class ? portalProps.class + " " : "";
		if (portalProps.id) portal.id = portalProps.id;
		if (portalProps.classList) {
			for (const [key, value] of Object.entries(portalProps.classList)) {
				if (key) className += value;
			}
		}
		portal.className = className;

		portal.dataset.open = open().toString();
		portal.dataset.scope = "dialog";
		portal.dataset.part = "backdrop"

		portal.onclick = (e) => {
			// 실제 백드롭(빈 영역) 클릭인지 확인
			if ((e.target as EventTarget) !== (e.currentTarget as EventTarget))
				return;
			setOpen(false);
		};
	});

	createEffect(() => {
		if(typeof(window) === "undefined") return;

		const preventScroll = (e: Event) => {if(open()) e.preventDefault()};
		
		document.addEventListener("wheel", preventScroll, {passive: false});
		document.addEventListener("touchmove", preventScroll, {passive: false});
		

		onCleanup(() => {
			document.removeEventListener("wheel", preventScroll);
			document.removeEventListener("touchmove", preventScroll);
			
		})
	})

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
