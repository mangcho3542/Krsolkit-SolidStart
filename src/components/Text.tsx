import { ComponentProps } from "@/types/ComponentProps";
import { splitProps } from "@utils/splitProps";

export default function Text(props: ComponentProps) {
    const [local, styling, rest] = splitProps(props, ["children"]);

    return (
        <p style={styling.style} class={styling.class} classList={styling.classList} 
        {...rest}>
            {local.children}
        </p>
    )
}