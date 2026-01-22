import styles from "@styles/Toast.module.css";
import { ButtonProps, DivProps, PUS } from "@/types/ComponentProps";
import { Toaster, ToastType, Placement } from "@utils/toaster";
import { splitComponentProps } from "@utils/splitComponentProps";
import { nanoid } from "nanoid";
import { createEffect, createSignal, For, Show, splitProps } from "solid-js";
import { Portal, spread } from "solid-js/web";

// createToaster에서 인자로 받는 타입
export interface CreateToasterProps {
	placement?: Placement;
	duration?: number;
}

/**
 * Toaster 인스턴스 생성 함수
 */
export function createToaster(props?: CreateToasterProps): Toaster {
	return new Toaster(props);
}

export interface ToastProps extends PUS<DivProps> {
	TitleProps?: PUS<DivProps>;
	CloseBtnProps?: PUS<ButtonProps>;
	toaster: Toaster;
}

export function Toast(props: ToastProps) {
	const [local, others, rest] = splitProps(
		props,
		["toaster"],
		["TitleProps", "CloseBtnProps"]
	);

	const [portalRef, setPortalRef] = createSignal<HTMLDivElement>();

	createEffect(() => {
		const portal = portalRef();

		if (!portal) return;

		const PortalProps: DivProps = {
			class: styles.Group,
			"data-scope": "toast",
			"data-part": "group",
			dir: "ltr",
			tabIndex: -1,
			"aria-label": `${local.toaster.placement} Notifications alt+T`,
			"aria-live": "polite",
			role: "region",
			style: {
				"justify-content": local.toaster.placement.includes("top")
					? "flex-start"
					: "flex-end",
				"align-items": local.toaster.placement.includes("start")
					? "flex-start"
					: local.toaster.placement.includes("end")
					? "flex-end"
					: "center",
			},
		};

		spread(portal, PortalProps);
	});

	return (
		local.toaster.count !== 0 && (
			<Portal
				ref={(el) => {
					setPortalRef(el);
				}}
			>
				<div class={styles.Backdrop}
				data-scope="toaster" data-part="backdrop"
				data-placement={local.toaster.placement ?? "bottom-end"}
				>
					<For each={local.toaster.toasts}>
						{(toast, index) => (
							<ToastItem
								toast={toast}
								index={index()}
								toaster={local.toaster}
								RootProps={rest}
								TitleProps={others.TitleProps}
								CloseBtnProps={others.CloseBtnProps}
							/>
						)}
					</For>
				</div>
			</Portal>
		)
	);
}

// 개별 Toast 아이템 컴포넌트
interface ToastItemProps {
	toast: ToastType;
	index: number;
	toaster: Toaster;
	RootProps?: PUS<DivProps>;
	StackProps?: PUS<DivProps>;
	TitleProps?: PUS<DivProps>;
	DescProps?: PUS<DivProps>;
	CloseBtnProps?: PUS<ButtonProps>;
}

export function ToastItem(props: ToastItemProps) {
	const titleId = props.TitleProps?.id ?? `title:${nanoid(8)}`;

	return (
		<div
			{...splitComponentProps(props.RootProps, styles.Root)}
			data-scope="toast"
			data-part="root"
			{...(props.toast.open && { "data-open": "" })}
			data-placement={props.toaster.placement}
			data-type={props.toast.type}
			role="status"
			aria-atomic="true"
			aria-labelledby={titleId}
			tabIndex="0"
			style={{
				...props.RootProps?.style,
			}}
		>
			<div
				{...splitComponentProps(props.TitleProps, styles.Title)}
				data-scope="toast"
				data-part="title"
				id={props.TitleProps?.id ?? titleId}
			>
				{props.toast.title}
			</div>

			{props.toast.closable && (
				<button
					{...splitComponentProps(props.CloseBtnProps, styles.CloseBtn)}
					data-scope="toast"
					data-part="close-button"
					aria-label="Dismiss notification"
					onClick={(e) => {
						props.toaster.dismiss(props.toast.id);
						props.CloseBtnProps?.onClick?.(e);
					}}
				>
					<svg
						viewBox="0 0 24 24"
						class={styles.CloseIcon}
						data-scope="toast"
						data-part="close-icon"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M18.7071 6.70711C19.0976 6.31658 19.0976 5.68342 18.7071 5.29289C18.3166 4.90237 17.6834 4.90237 17.2929 5.29289L12 10.5858L6.70711 5.29289C6.31658 4.90237 5.68342 4.90237 5.29289 5.29289C4.90237 5.68342 4.90237 6.31658 5.29289 6.70711L10.5858 12L5.29289 17.2929C4.90237 17.6834 4.90237 18.3166 5.29289 18.7071C5.68342 19.0976 6.31658 19.0976 6.70711 18.7071L12 13.4142L17.2929 18.7071C17.6834 19.0976 18.3166 19.0976 18.7071 18.7071C19.0976 18.3166 19.0976 17.6834 18.7071 17.2929L13.4142 12L18.7071 6.70711Z"
						/>
					</svg>
				</button>
			)}
		</div>
	);
}
