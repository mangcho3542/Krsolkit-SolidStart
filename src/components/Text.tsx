import { ComponentProps } from "@/types/ComponentProps";
import splitProps from "@utils/splitProps";

export default function Text({children, ...Rest}: ComponentProps) {
    const { style, rest } = splitProps({...Rest});

    return (
        <p style={style} {...rest}>
            {children}
        </p>
    )
}