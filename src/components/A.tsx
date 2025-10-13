import { A as Anchor, AnchorProps as AProps } from "@solidjs/router";
import styles from '@styles/A.module.css';

export interface AnchorProps extends AProps {};

export default function A({children, class:className="", ...rest}: AProps) {

    return (
        <Anchor class={styles.A + " " + className} {...rest}>
            {children}
        </Anchor>
    )
}