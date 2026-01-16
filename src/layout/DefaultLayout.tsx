import { createSignal, For, JSXElement } from "solid-js";
import styles from "./Layout.module.css";
import Logo from "@images/Logo.svg";
import { A, Btn, Drawer } from "@components";
import { Link } from "@solidjs/meta";

interface LayoutProps {
	children: JSXElement;
}

interface Menu {
	content: string;
	link: string;
}

export default function DefaultLayout({ children }: LayoutProps) {
	const MenuAry: Menu[] = [
		{
			content: "가이드",
			link: "/about",
		},
		{
			content: "로그인",
			link: "/login",
		},
	];

	const DrawerMenuAry: Menu[] = [
		{ content: "Home", link: "/" },
		{
			content: "자리 바꾸기",
			link: "/changeclass",
		},
		{
			content: "아스키 변환",
			link: "/img-to-ascii",
		},
	];

	const footerUlAry = [["문의하기"]];
	const footerUlLinks = [["/ask"]];

	const [btnRef, setBtnRef] = createSignal<HTMLButtonElement | undefined>();

	return (
		<>
			<Link rel="icon" href="/favicon.ico" />
			<Drawer
				TrgRef={btnRef}
				placement="start"
				Title={<img class={styles.DrawerLogo} src={Logo} />}
				TitleProps={{ class: styles.DrawerTitle }}
				BodyProps={{ class: styles.DrawerBody }}
				Body={
					<ul class={styles.DrawerMenuUl}>
						<For each={DrawerMenuAry}>
							{({ content, link }) => (
								<li
									class={styles.DrawerMenu}
									id={
										window.location.pathname === link
											? styles.DrawerActiveMenu
											: ""
									}
								>
									<div class={styles.DrawerMenuLinkWrapper}>
										<A href={link} class={styles.DrawerMenuLink}>
											{content}
										</A>
									</div>
								</li>
							)}
						</For>
					</ul>
				}
				FooterProps={{
					class: styles.DrawerFooter,
				}}
				id={styles.Drawer}
			/>

			<header id={styles.Nav}>
				<Btn id={styles.MenuBtn} ref={setBtnRef}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24px"
						height="24px"
						viewBox="0 -960 960 960"
						fill="var(--bg-reversed-color)"
					>
						<path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
					</svg>
				</Btn>
				<A href="/" rel="home" id={styles.LogoWrapper} useDefaultStyle={false}>
					<img id={styles.Logo} src={Logo} />
				</A>
				<A href="/" id={styles.LogoText} rel="home">
					Krsolkit
				</A>

				<div id={styles.SideMenuWrapper}>
					<For each={MenuAry}>
						{({ content, link }) => (
							<A href={link} class={styles.SideMenu}>
								{content}
							</A>
						)}
					</For>
				</div>
			</header>

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
