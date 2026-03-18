import { Meta, Title } from "@solidjs/meta";
import { For } from "solid-js";

const FlexClass = "flex flex-col items-start w-full h-auto";

export default function About() {
	const contents = [
		{
			title: "krsolkit이란?",
			text: `https://github.com/mangcho3542이 취미로 만들고 있는 개인 사이트입니다.
제가 해보고 싶다하는 주제를 만들어 보고 있습니다.`,
		},
		{
			title: "제공하고 있는 기능들",
			text: "자리 바꾸기, 아스키 아트, 로그인/회원가입 등의 기능을 제공하고 있습니다.",
		},
		{
			title: "사이트 정보",
			text: "Solid.js/SolidStart라는 프레임워크를 이용하여 개발하였습니다.",
		},
	];

	return (
		<>
			<Title>소개</Title>
			<Meta name="description" content="소개 페이지" />
			<Meta name="viewport" content="width=device-width, initial-scale=1" />
			<Meta property="og:title" content="Krsolkit-소개" />
			<Meta property="og:description" content="소개 페이지" />
			<Meta property="og:url" content="https://classhelper.kr/about" />
			<Meta property="og:type" content="article" />
			<Meta property="og:image" content="https://classhelper.kr/favicon.png" />
			<Meta name="twitter:card" content="summary_large_image" />

			<main class="Main items-center justify-center">
				<div class={FlexClass}>
					<div class={`${FlexClass} px-[1%]`}>
						<For each={contents}>
							{({ title, text }, index) => (
								<div class="my-[2%]">
									<h2 class="font-suit font-semibold text-2xl">
										{index() + 1}.&nbsp;
										{title}
									</h2>

									<pre class="font-suit font-midium text-xl">{text}</pre>
								</div>
							)}
						</For>
					</div>
				</div>
			</main>
		</>
	);
}
