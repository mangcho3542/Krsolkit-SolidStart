"use server";
import { Meta, Title } from "@solidjs/meta";
import Main from "./Main";

export default function signup() {
  return (
    <>
      <Title>회원가입</Title>
      <Meta name="description" content="회원가입 페이지입니다." />
      <Meta property="og:title" content="ClassHelper-회원가입" />
      <Meta property="og:image" content="https://classhelper.kr/favicon.png" />
      <Main />
    </>
  );
}