import styles from "./chageclass.module.css";
import QuestionImg from "@images/QuestionCircleIcon.svg";

export default function Main() {
    return (
        <main class="Main" id={styles.Main}>
            <header id={styles.Header}>
               자리 바꾸기 
            </header>

            <div id={styles.QuestionBtnWrapper}>
                <button id={styles.QBtn}>
                    <img id={styles.QImg} src={QuestionImg} />
                </button>
            </div>
        </main>
    )
}