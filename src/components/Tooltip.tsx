import styles from "@styles/Tooltip.module.css";
import { splitComponentProps } from "@utils";
import { DivProps, PUS } from "@types";
import { createEffect, createSignal, JSXElement, splitProps } from "solid-js";
import { spread, Portal } from "solid-js/web";

interface TooltipProps extends PUS<DivProps> {
	TrgRef?: HTMLElement | undefined;
	PositionerProps?: PUS<DivProps>;
	ContentProps?: PUS<DivProps>;
	Content?: JSXElement;
	useArrow?: boolean;
	closeDelay?: number;
	openDelay?: number;
	disabled?: boolean;
    open?: boolean;
}

export function Tooltip(props: TooltipProps) {
	const [local, rest] = splitProps(props, [
		"TrgRef",
		"PositionerProps",
		"ContentProps",
		"Content",
		"useArrow",
		"closeDelay",
		"openDelay",
		"disabled",
        "open"
	]);

	const [open, setOpen] = createSignal(false);
	const [mount, setMount] = createSignal(false);
	const [portalRef, setPortalRef] = createSignal<HTMLDivElement | undefined>();

    createEffect(() => {
        if(local.open !== undefined) setOpen(local.open);
    });

    createEffect(() => {
        const trg = local.TrgRef;
        if(trg === undefined) return;

        function onPointerUp() {
            
        }
    })

	return (
		<Portal>
			<div class={styles.Content}>{}</div>
		</Portal>
	);
}
