import type { RouteSectionProps } from "@solidjs/router";
import { Meta } from "@solidjs/meta";

export default function loginLayout(props: RouteSectionProps) {
  return (
    <>
    <Meta property="og:image" content="https://classhelper.kr/favicon.png" />
    {props.children}
    </>
  )
}
