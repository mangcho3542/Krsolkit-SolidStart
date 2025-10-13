import { JSX } from "solid-js";
import styles from "./Layout.module.css";
import Text from "@components/Text";
import Logo from "@images/Logo.svg";
import A from "@components/A";

interface LayoutProps {
    children: JSX.Element;
}

export default function DefaultLayout({children}: LayoutProps) {
    const sideMenuAry = ["블로그", "가이드", "로그인"];
    const sideMenuLinks = ["/blog", "/guide", "/login"];

    return (
        <>
        <nav id={styles.Nav}>
            <div id={styles.LogoWrapper}>
                <img id={styles.Logo} src={Logo} />
                <Text id={styles.LogoText}>
                    ClassHelper
                </Text>
            </div>

            <div id={styles.SideMenuWrapper}>
                {sideMenuAry.map((sideMenu, index) => (
                    <A href={sideMenuLinks[index]} class={styles.SideMenu}>
                        {sideMenu}
                    </A>
                ))}
            </div>


        </nav>

        {children}

        <footer class={styles.Footer}>
            
        </footer>
        </>
    )
}