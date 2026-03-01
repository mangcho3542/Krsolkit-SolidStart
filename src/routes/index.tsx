import { Meta, Title } from "@solidjs/meta";
import styles from "./index.module.css";
import { Map } from "@components/Map";
import { A } from "@components/A";
import ChangeClassIcon from "@images/ChangeClassIcon.svg";

export const prerender = true;

interface CardI {
	icon: string;
	title: string;
	desc: string;
	href: string;
}

const H2Class = "text-4xl font-suit font-medium";

export default function Home() {
	const CardAry: CardI[] = [
		{
			icon: ChangeClassIcon,
			title: "자리 바꾸기",
			desc: "랜덤으로 학생들의 자리를 배치해주는 서비스",
			href: "/changeclass",
		},
	];

	return (
		<>
			<Title>Krsolkit</Title>
			<Meta
				name="description"
				content="교사와 학생을 위한 도구. 자리 바꾸는 것을 돕는 기능을 제공합니다.
        또한 아스키 아트, 비밀번호 생성기 등의 여러 도구 등을 제공합니다."
			/>
			<Meta
				name="keywords"
				content="학급 관리, 자리 바꾸기, 교사용 도구, 학생 관리, 학교 앱, 수업 도우미, 
          비밀번호 생성, 아스키 아트
          "
			/>
			<Meta property="og:title" content="Krsolkit - 도구 모음 사이트" />
			<Meta
				property="og:description"
				content="자리 바꾸기, 비밀번호 생성, 아스키 아트 등의 도구를 제공합니다."
			/>
			<Meta property="og:url" content="https://krsolkit.com" />
			<Meta property="og:image" content="https://krsoltkit.com/favicon.png" />
			<Meta property="og:type" content="website" />

			<main class="Main px-[1%]">
				<section class="my-[8%]">
					<h1 class="text-5xl font-suit font-semibold">Krsolkit</h1>

					<h2 class={H2Class}>
						자리 바꾸기, 비밀번호 생성, 아스키 아트 등의 도구
					</h2>
				</section>

				<section>
					<h2 class={H2Class}>
						주요 기능
					</h2>

					<div class={styles.CardContainer}>
						<Map each={CardAry}>
							{({ icon, title, desc, href, index }) => (
								<div
									class={styles.Card}
									style={{
										"grid-row-start": Math.floor(index / 3) + 1,
										"grid-row-end": Math.floor(index / 3) + 2,
										"grid-column-start": (index + 1) % 4,
										"grid-column-end": ((index + 1) % 4) + 1,
									}}
								>
									<A href={href} class={styles.CardA} useDefaultStyle={false}>
										<img src={icon} class={styles.CardIcon} />

										<div class={styles.CardTitle}>{title}</div>

										<div class={styles.CardDesc}>{desc}</div>
									</A>
								</div>
							)}
						</Map>
					</div>
				</section>
			</main>
		</>
	);
}
