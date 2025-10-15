import styles from "./login.module.css";
import { Title, Link } from "@solidjs/meta";

export default function Login() {
    return (
        <>
            <Title>로그인</Title>
            <Link rel="icon" href="/favicon.ico" />
            
            <main class="Main">
                <div id={styles.Wrapper}>

                </div>
            </main>

        </>
    )
}