import { createSignal, For, JSXElement } from "solid-js";
import Map from "@components/Map";
import styles from "./Layout.module.css";
import Logo from "@images/Logo.svg";
import { A } from "@components/A";
import { Btn } from "@components/Btn";
import { Drawer } from "@components/Drawer";
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
		{
			content: "흑백 변환",
			link: "/rgb-to-gray"
		}
	];

	const FooterAry: Menu[][] = [
		[
			{ content: "About", link: "/about" },
			{ content: "문의하기", link: "/ask" },
		],
	];

	const [BtnRef, setBtnRef] = createSignal<HTMLButtonElement | undefined>();

	return (
		<>
			<Link rel="icon" href="/favicon.ico" />
			<Drawer
				TrgRef={BtnRef()}
				placement="start"
				Title={<img class={styles.DrawerLogo} src={Logo} />}
				BodyProps={{ class: styles.DrawerBody }}
				Body={
					<ul class={styles.DrawerMenuUl}>
						<Map each={DrawerMenuAry}>
							{({ content, link }) => (
								<li
									class={`w-full 
										p-[0_1%_0_2%] 
										m-0 
										text-sm 
										font-suit 
										font-medium
										${window.location.pathname === link 
										? ` font-suit font-semibold flex items-center p-[0_1%_0_0] ${styles.DrawerActiveMenu}` 
										: ""}`}
								>
									<div class={styles.DrawerMenuLinkWrapper}>
										<A href={link} class={styles.DrawerMenuLink}>
											{content}
										</A>
									</div>
								</li>
							)}
						</Map>
					</ul>
				}
				FooterProps={{
					class: styles.DrawerFooter,
				}}
				id={styles.Drawer}
			/>

			<header id={styles.Nav} class="font-suit font-normal text-base">
				<Btn id={styles.MenuBtn} ref={(el) => setBtnRef(el)}>
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
					<Map each={MenuAry}>
						{({ content, link }) => (
							<A href={link} class={styles.SideMenu}>
								{content}
							</A>
						)}
					</Map>
				</div>
			</header>

			{children}

			<footer
				class="w-full 
					h-auto 
					flex 
					flex-row 
					justify-start 
					p-[1%_1%_1%_1.5%] 
					border-bs-2 
					border-solid 
					bg-(--bg-reversed-color) 
					text-(--text-reversed-color)"
			>
				<For each={FooterAry}>
					{(ListAry) => (
						<div class={styles.FooterUl}>
							<Map each={ListAry}>
								{({ content, link }) => (
									<div class={styles.FooterLi}>
										<A href={link}>{content}</A>
									</div>
								)}
							</Map>
						</div>
					)}
				</For>
			</footer>
		</>
	);
}
