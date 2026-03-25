import { createSignal, For, JSXElement } from "solid-js";
import Map from "@components/Map";
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
			link: "/rgb-to-gray",
		},
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
				Title={<img class="h-8 aspect-square" src={Logo} />}
				BodyProps={{ class: "w-full flex justify-start p-[4%_0_0_0] grow" }}
				Body={
					<ul class="flex flex-col items-start list-none pr-[2%] gap-[1%] grow w-full">
						<For each={DrawerMenuAry}>
							{({ content, link }) => (
								<li
									class={`w-full 
										p-[0_1%_0_2%] 
										m-0 
										text-sm 
										font-suit 
										font-medium
										flex
										items-center
										${
											window.location.pathname === link
												? ` font-suit font-semibold 
												flex items-center p-[0_1%_0_0] 
												before:bg-[#0969da] before:rounded-md 
												before:content-[""] before:h-[84%] before:w-1 
												before:mr-[1%] before:block before:flex-none`
												: ""
										} ${
											window.location.pathname === link
												? "p-[0_1%_0_0]"
												: "p-[0_1%_0_2%]"
										}`}
								>
									<div
										class={`text-lg p-[1%] w-full 
									${window.location.pathname === link && 
									"bg-[rgba(129,139,152,0.15)]"}
									hover:no-underline 
									hover:bg-[rgba(129,139,152,0.15)]
									rounded-sm`}
									>
										<A href={link} class="inline-block">
											{content}
										</A>
									</div>
								</li>
							)}
						</For>
					</ul>
				}
				FooterProps={{
					class: "w-0 h-0",
				}}
				class="p-[1%_0_1%_0.5%]"
			/>

			<header
				class="
				flex items-center p-[1%]
				border-be border-solid border-be-(--border-light-color)
				w-full max-w-full min-h-[6dvh] max-h-[9dvh]
				overflow-x-hidden
				font-suit font-normal text-base
			"
			>
				<Btn
					class="
					flex items-center justify-center 
					min-w-7 min-h-7
					border dark:border-2 border-solid border-[#c8cccf] bg-(--bg-color)
					"
					ref={(el) => setBtnRef(el)}
				>
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

				<A href="/" rel="home" class="block m-[0_0.5%_0_1%]">
					<img class="h-[5vh] aspect-square" src={Logo} />
				</A>
				<A href="/" class="font-suit font-bold text-lg" rel="home">
					Krsolkit
				</A>

				<div
					class="
				ml-auto
				flex items-center gap-x-[8%]
				p-[0_1%_0_0]
				"
				>
					<Map each={MenuAry}>
						{({ content, link }) => (
							<A href={link} class="whitespace-nowrap text-lg">
								{content}
							</A>
						)}
					</Map>
				</div>
			</header>

			{children}

			<footer
				class="w-full h-auto 
				flex
					justify-start 
					p-[1%_1%_1%_1.5%] 
					border-bs-2 
					border-solid 
					bg-(--bg-reversed-color) 
					text-(--text-reversed-color)"
			>
				<For each={FooterAry}>
					{(ListAry) => (
						<div class="flex flex-col list-none gap-y-[12%] box-border w-auto h-auto text-inherit">
							<Map each={ListAry}>
								{({ content, link }) => (
									<div class="inline-block text-inherit">
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
