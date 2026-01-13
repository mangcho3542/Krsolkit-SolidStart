import { Meta, Title } from "@solidjs/meta";
import Main from "./Main";

export default function imgToAscii() {

	return (
		<>
			<Title>이미지 아스키 변환</Title>
			<Meta
				name="description"
				content="이미지를 업로드하면 아스키로 변환하는 기능을 제공합니다."
			/>
			<Meta name="keywords" content="아스키 아트, 이미지 변환, 아스키 코드" />
			<Meta property="og:title" content="Krsorkit - 아스키 변환" />
			<Main />
		</>
	);
}
