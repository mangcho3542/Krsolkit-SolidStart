import { JSX } from "solid-js";
import styles from "./Layout.module.css";
import MenuIcon from "@images/MenuIcon.svg";
import Logo from "@images/Logo.svg";
import A from "@components/A";
import { Link } from "@solidjs/meta";
import { useNavigate } from "@solidjs/router";

interface LayoutProps {
  children: JSX.Element;
}

export default function DefaultLayout({ children }: LayoutProps) {
  const sideMenuAry = ["가이드", "로그인"];
  const sideMenuLinks = ["/about", "/login"];

  const sideMenuAry2 = ["자리 바꾸기", "영단어 학습"];
  const sideMenuLinks2 = ["/changeclass", "/eng_word"];

  const footerUlAry = [["문의하기"]];
  const footerUlLinks = [["/ask"]];

  const navigate = useNavigate();

  return (
    <>
      <Link rel="icon" href="/favicon.ico" />

      <nav id={styles.Nav}>
        <header
          id={styles.LogoWrapper}
          onClick={() => {
            navigate("/", { replace: false });
          }}
        >
          <img id={styles.Logo} src={Logo} />
          <A href="/" id={styles.LogoText}>Krsolkit</A>
        </header>

        <div id={styles.SideMenuWrapper}>
          {sideMenuAry.map((sideMenu, index) => (
            <A href={sideMenuLinks[index]} class={styles.SideMenu}>
              {sideMenu}
            </A>
          ))}
        </div>
      </nav>

      <nav id={styles.SideMenuWrapper2}>
        {sideMenuAry2.map((sideMenu, index) => (
          <A
          inactiveClass={styles.Inactive}
          activeClass={styles.Active}
          href={sideMenuLinks2[index]}
          class={styles.SideMenu2}
          >
            {sideMenu}
          </A>
        ))}
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
