import { JSX } from "solid-js";
import styles from "./Layout.module.css";
import Text from "@components/Text";
import Logo from "@images/Logo.svg";
import A from "@components/A";
import { Link } from "@solidjs/meta";

interface LayoutProps {
  children: JSX.Element;
}

export default function DefaultLayout({ children }: LayoutProps) {
  const sideMenuAry = ["블로그", "가이드", "로그인"];
  const sideMenuLinks = ["/blog", "/guide", "/login"];

  const footerUlAry = [["문의하기"]];
  const footerUlLinks = [["/ask"]];

  return (
    <>
      <Link rel="icon" href="/favicon.ico" />

      <nav id={styles.Nav}>
        <div id={styles.LogoWrapper}>
          <img id={styles.Logo} src={Logo} />
          <Text id={styles.LogoText}>ClassHelper</Text>
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

      <footer id={styles.Footer}>
        {footerUlAry.map((footerUl, UlIndex) => (
          <ul class={styles.FooterUl}>
            {footerUl.map((footerLi, LiIndex) => (
              <li class={styles.FooterLi}>
                <A
                  class={styles.FooterLink}
                  href={footerUlLinks[UlIndex][LiIndex]}
                >
                  {footerLi}
                </A>
              </li>
            ))}
          </ul>
        ))}
      </footer>
    </>
  );
}
