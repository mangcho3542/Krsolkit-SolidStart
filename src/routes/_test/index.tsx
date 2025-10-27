import { Portal } from "solid-js/web";
import styles from "./test.module.css";

export default function test() {
    return (
        <main class="Main">
            <Portal 
            mount={document.getElementsByClassName("Main")[0]}
            >
                <div class={styles.Portal}>
                    포털
                </div>
            </Portal>
        </main>
    )
}