import { DivProps, DialogProps } from "@/types/ComponentProps";
import { JSXElement, splitProps } from "solid-js";

type PUD = DivProps & { useDefaultStyle?: boolean };

interface DrawerProps extends DialogProps {
	Title?: JSXElement;
	TitleProps?: PUD;
	Body?: JSXElement;
	BodyProps?: PUD;
	Footer?: JSXElement;
	FooterProps?: PUD;
	placement?: "left" | "right" | "top" | "bottom";
	open?: boolean;
	useDefaultStyle?: boolean;
	TrgRef?: HTMLButtonElement | HTMLElement;
}

export function Drawer(props: DrawerProps) {
	const [local, rest] = splitProps(props, [
		"Title",
		"TitleProps",
		"Body",
		"BodyProps",
		"Footer",
		"FooterProps",
        "placement",
        "open",
        "onClose",
        "useDefaultStyle",
        "TrgRef"
	]);

    return (
        <dialog>
            
        </dialog>
    )
}
