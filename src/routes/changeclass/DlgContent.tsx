import { JSXElement } from "solid-js";
import styles from "./chageclass.module.css";
import { ColorSwatch } from "@components";
import { Hex } from "@types";

export default function DlgContent() {
  const titleList: string[] = ["자리배치", "자리", "자리 바꾸기", "결과 저장"];
  const contentList: JSXElement[] = [
    <>
      슬라이더를 움직여서 분단 수, 행의 수를 바꿀 수 있습니다. <br />그 후 "자리
      바꾸기" 버튼을 누르면 학생들의 번호가 각 자리에 배치됩니다.
    </>,

    <>
      기본적으로 학생들의 자리는 모두&nbsp;
      <ColorSwatch class={styles.ColorSwatch} color={"#4ade80" as Hex} />색
      입니다. <br />
      자리를 클릭하게 되면&nbsp;
      <ColorSwatch class={styles.ColorSwatch} color={"#4ade80" as Hex} />
      색의 자리는 &nbsp;
      <ColorSwatch class={styles.ColorSwatch} color={"#EB0000" as Hex} />
      색으로, &nbsp;
      <ColorSwatch class={styles.ColorSwatch} color={"#EB0000" as Hex} />
      색의 자리는&nbsp;
      <ColorSwatch class={styles.ColorSwatch} color={"#4ade80" as Hex} />
      색으로 바뀌게 됩니다.
      <br />
      <ColorSwatch class={styles.ColorSwatch} color={"#4ade80" as Hex} />
      색의 자리에는 학생이 배치될 수 있고, &nbsp;
      <ColorSwatch class={styles.ColorSwatch} color={"#EB0000" as Hex} />
      색의 자리에는 학생이 배치될 수 없습니다.
    </>,

    <>
      "자리 배치" 버튼을 누르면 학생들의 번호를 무작위로 섞어 배치할 수
      있습니다.
    </>,

    <>
      "캡쳐하기" 버튼을 누르면 학생들의 자리가 배치된 결과를 캡쳐하여 다운로드
      받을 수 있습니다.
    </>,
  ];

  return (
    /**DlgCttUl: Dialog > Content > Ul */
    <ul id={styles.DlgCttUl}>
      {/**DlgCttLi : Dialog > Conent > Li */}
      {titleList.map((title, i) => (
        <li class={styles.DlgCttLi}>
          {/**DlgLiTtl : Dialog > Li > Title*/}
          <p class={styles.DlgLiTtl}>
            {i + 1}
            .&nbsp;
            {title}
          </p>
          <br />

          {contentList[i]}
        </li>
      ))}
    </ul>
  );
}