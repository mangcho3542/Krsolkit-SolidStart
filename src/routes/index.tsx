import { Title } from "@solidjs/meta";
import styles from "./index.module.css";
import Mark from "@components/Mark";
import { JSXElement } from "solid-js";
import { Card } from "@/components/Card";
import Svg from "@/components/Svg";
import ChangeClassIcon from "@images/ChangeClassIcon.svg?raw";
import EngWordIcon from "@images/EngWordsIcon.svg?raw";
import Text from "@/components/Text";
import Btn from "@/components/Btn";
import { useNavigate } from "@solidjs/router";

export default function Home() {
  const iconAry: string[] = [ChangeClassIcon, EngWordIcon];

  const cardDescTitleAry: string[] = ["자리 바꾸기", "영단어 학습"];

  const cardDescAry: JSXElement[] = [
    <>
      학생들의 자리 배치를 선택한 후, 자리 바꾸기 버튼을 누르면 학생들의 자리를
      바꿀 수 있습니다. <br />
      또한 캡쳐하기 버튼을 통해 자리 배치가 완료돤 사진을
      저장할 수 있습니다.
    </>,

    <>
      고등 교육과정에서 나오는 영단어 및 수능에 나왔던 영단어들을 학습할 수
      있습니다. <br />
      또한 정보등을 저장하여 오답노트 등도 학습할 수 있습니다.
    </>,
  ];

  const btnLinkAry:string[] = [
    "/changeclass", "/eng"
  ];

  const navigate = useNavigate();

  return (
    <main class="Main">
      <Title>ClassHelper</Title>

      <section id={styles.Intro}>
        <h1 id={styles.H1}>ClassHelper</h1>

        <Mark id={styles.Mark}>선생님들 및 학생을 돕는 사이트</Mark>
      </section>

      <section id={styles.MainIntro}>
        <h2 id={styles.H2}>주요 기능</h2>

        {iconAry.map((icon, index) => (
          <Card 
          class={styles.Card}
          Icon={<Svg class={styles.CardIcon} value={icon} />}
          DescProps={{class: styles.CardDesc}}
          >
            <Text class={styles.CardTtl}>{cardDescTitleAry[index]}</Text>
            <Text class={styles.CardDescTxt}>{cardDescAry[index]}</Text>
            <div class={styles.BtnWrapper}>
              <Btn class={styles.Btn} onClick={() => {navigate(btnLinkAry[index])}}>
                바로 가기
              </Btn>
            </div>
          </Card>
        ))}
      </section>
    </main>
  );
}
