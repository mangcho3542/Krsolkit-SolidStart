import { Title } from "@solidjs/meta";
import Main from "./Main";
import { ClientOnly } from "@ark-ui/solid";

export default function ChangeClass() {


    return (
        <>
        <Title>자리 바꾸기</Title>

        <ClientOnly>
            <Main />
        </ClientOnly>
        </>
    )
}