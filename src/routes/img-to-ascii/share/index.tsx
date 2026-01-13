import { Meta, Title } from "@solidjs/meta";

export default function Share() {
    return (
        <>
        <Title>이미지 아스키 변환 - 공유</Title>
        <Meta
				name="description"
				content="아스키로 변환한 이미지를 공유할 수 있는 페이지입니다."
			/>
			<Meta name="keywords" content="아스키 아트, 이미지 변환, 아스키 코드" />
			<Meta property="og:title" content="Krsorkit - 아스키 변환" />

        <main class="Main" style={{
            "align-items": "center"
        }}>
            <h1 style={{
                display: "inline-block",
                "font-family": "SuitBold var(--default-font-family);",
                "font-weight": 600
            }}>
                아스키로 변환한 이미지를 공유할 수 있는 페이지입니다!
            </h1>
        </main>
        </>
    )
}