import { createSignal, For, JSXElement, onCleanup, onMount } from "solid-js";
import styles from "./Layout.module.css";
import MenuIcon from "@images/MenuIcon.svg";
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
	//클라이언트에서 scrollbar-width라는 css 변수 저장
	onMount(() => {
		function setScrollbarWidth() {
			const w =
				typeof window !== "undefined"
					? window.innerWidth - document.documentElement.clientWidth
					: 0;

			document.documentElement.style.setProperty("--scrollbar-width", `${w}px`);
		}

		setScrollbarWidth();
		window.addEventListener("resize", setScrollbarWidth);

		onCleanup(() => {
			window.removeEventListener("resize", setScrollbarWidth);
		});
	});

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
					<img src={MenuIcon} alt="메뉴 아이콘" class={styles.MenuIcon} />
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
