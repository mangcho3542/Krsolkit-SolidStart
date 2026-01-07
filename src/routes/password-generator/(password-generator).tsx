import styles from "./password-generator.module.css";
import { Title, Meta } from "@solidjs/meta";
import { createEffect, createSignal } from "solid-js";
import { customAlphabet } from "nanoid";
import { Btn, NumberInput, Toast, createToaster } from "@components";
import { createStore } from "solid-js/store";
import { randomInt } from "crypto";
import RefreshIcon from "@images/RefreshIcon.svg?raw";

const casesAry = [
	"abcdefghijklmnopqrstuvwxyz", //소문자
	"ABCDEFGHIJKLMNOPQRSTUVWXYZ", //대문자
	"0123456789", //숫자
	"!@#$%^&*-_+=|\\()[]{}?/,.:;'\"`~", //특수기호
];

export default function passwordGenerator() {
	const [value, setValue] = createSignal(""); //비밀번호
	const [length, setLength] = createSignal(12); //비밀번호 길이
	const [select, setSelect] = createStore([
		true, //소문자
		true, //대문자
		true, //숫자
		true, //특수기호
	]);
	//toaster
	const toaster = createToaster({
		duration: 5000,
	});

	//&Function
	//& 비밀번호 생성하는 함수
	function generatePw(length: number) {
		let res = ""; //결과값
		let str = ""; //customAlphabet에서 사용할 개수
		let trueCnt = 0; //true인 것의 개수
		for (let i = 0; i < 4; ++i) {
			if (select[i]) {
				str += casesAry[i];
				res += casesAry[i][randomInt(0, casesAry[i].length)];
				++trueCnt;
			}
		}

		const generate = customAlphabet(str);
		setValue(res + generate(length - trueCnt));
	}

	//&복사버튼 눌렸을 때 실행될 함수
	function copy() {
		window.navigator.clipboard
			.writeText(value())
			.then(() => {
				toaster.create({
					title: "복사 완료!",
					type: "success",
				});
			})
			.catch((err) => {
				console.error(err);
				toaster.create({
					title: "오류로 인해 복사가 실패하였습니다.",
					type: "error",
				});
			});
	}

	//^ Effect
	//^ length 바뀔 때 마다 비밀번호 재생성
	createEffect(() => {
		generatePw(length());
	});

	return (
		<>
			<Toast toaster={toaster} />
			<Title>무작위 비밀번호 생성기</Title>
			<Meta
				name="description"
				content="사용자가 원하는 길이 및 글자들로 무작위로 비밀번호를 생성합니다."
			/>

			<Meta name="keywords" content={`비밀번호 생성, 무작위 비밀번호 생성`} />

			<Meta property="og:title" content="무작위 비밀번호 생성기" />
			<Meta
				property="og:description"
				content="사용자가 원하는 길이 및 글자들로 무작위로 비밀번호를 생성합니다."
			/>

			<main
				class="Main"
				style={{
					"align-items": "center",
				}}
			>
				<header class={styles.Header}>
					<h1 class={styles.H}>무작위 비밀번호 생성기</h1>
					<h2 class={styles.H}>
						여러가지 문자를 조합하여 무작위 비밀번호를 생성하세요.
					</h2>
				</header>

				<div class={styles.Container}>
					<div class={styles.ResultWrapper}>
						{value()}
						<div class={styles.StrengthIndicator}></div>
					</div>

					{/**Regenerate Btn */}
					<Btn class={styles.Btn} onClick={() => generatePw(length())}>
						<RefreshIcon />
					</Btn>

					{/**CopyBtn */}
					<Btn class={styles.Btn} onClick={copy}>
						복사
					</Btn>
				</div>

				<NumberInput
					useTrg
					class={styles.InputRoot}
					Label="암호 길이"
					InputProps={{
						onchange: (e) => {
							setLength(e.target.valueAsNumber);
						},
					}}
					min={select.filter(Boolean).length + 1}
					max={30}
				/>

				
			</main>
		</>
	);
}
