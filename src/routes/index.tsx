import { Meta, Title } from "@solidjs/meta";
import styles from "./index.module.css";
import Mark from "@components/Mark";
import { JSXElement } from "solid-js";
import { Card } from "@/components/Card";
import ChangeClassIcon from "@images/ChangeClassIcon.svg";
import EngWordIcon from "@images/EngWordsIcon.svg";
import A from "@components/A";
import Drawer from "@/components/Drawer";

export const prerender = true;

export default function Home() {
	const iconAry: string[] = [ChangeClassIcon, EngWordIcon];

	const cardDescTitleAry: string[] = ["자리 바꾸기", "영단어 학습"];

	const cardDescAry: JSXElement[] = [
		<>
			학생들의 자리 배치를 선택한 후, 자리 바꾸기 버튼을 누르면 학생들의 자리를
			바꿀 수 있습니다. <br />
			또한 캡쳐하기 버튼을 통해 자리 배치가 완료돤 사진을 저장할 수 있습니다.
		</>,

		<>
			고등 교육과정에서 나오는 영단어 및 수능에 나왔던 영단어들을 학습할 수
			있습니다. <br />
			또한 정보등을 저장하여 오답노트 등도 학습할 수 있습니다.
		</>,
	];

	const hrefAry: string[] = ["/changeclass", "/eng"];

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

			<main class={`Main ${styles.Main}`}>
				<section id={styles.Intro}>
					<h1 id={styles.H1}>Krsolkit</h1>

					<Mark id={styles.Mark}>
						자리 바꾸기, 비밀번호 생성, 아스키 아트 등의 도구
					</Mark>
				</section>

				<section id={styles.MainIntro}>
					<h2 id={styles.H2}>주요 기능</h2>

					{iconAry.map((icon, index) => (
						<Card
							class={styles.Card}
							Icon={<img class={styles.CardIcon} src={icon} />}
							DescProps={{ class: styles.CardDesc, useDefaultStyle: false }}
						>
							<A class={styles.CardTtl} href={hrefAry[index]}>
								{cardDescTitleAry[index]}
							</A>
							<p class={styles.CardDescTxt}>{cardDescAry[index]}</p>
						</Card>
					))}
				</section>
			</main>
		</>
	);
}
