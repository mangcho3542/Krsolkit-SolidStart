import { JSX } from "solid-js";
import styles from "./Layout.module.css";
import Text from "@components/Text";
import Logo from "@images/Logo.svg";

interface LayoutProps {
    children: JSX.Element;
}

export default function DefaultLayout({children}: LayoutProps) {
    return (
        <>
        <nav class={styles.Nav}>
            <div class={styles.LogoWrapper}>
                <img class={styles.Logo} src={Logo} />
                <Text class={styles.LogoText}>
                    ClassHelper
                </Text>
            </div>
        </nav>

        {children}

        <footer class={styles.Footer}>
            
        </footer>
        </>
    )
}