import { JSX } from 'solid-js';
import styles from './Layout.module.css';
import Text from "@components/Text";

interface LayoutProps {
    children: JSX.Element;
}

export default function DefaultLayout({children}: LayoutProps) {
    return (
        <>
        <nav class={styles.Nav}>
            <div class={styles.LogoWrapper}>
                <Text class={styles.LogoText}>
                    메모장
                </Text>
            </div>
        </nav>

        {children}

        <footer class={styles.Footer}>
            
        </footer>
        </>
    )
}