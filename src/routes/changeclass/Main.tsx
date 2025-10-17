import styles from "./chageclass.module.css";
import QuestionImg from "@images/QuestionCircleIcon.svg";
import Stack from "@components/Stack";
import Slider from "@components/Slider";
import Btn from "@components/Btn";

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

            <Stack id={styles.SliderWrapper}>
                <Slider 
                step={1}
                defaultValue={5}
                min={1}
                max={10}
                class={styles.SliderRoot}
                ControlProps={{class: styles.SliderControl}}
                Label="분단 수"
                LabelProps={{class: styles.SliderLabel}}
                ValueTextProps={{class: styles.SliderValueText}}
                />

                <Slider 
                step={1}
                defaultValue={6}
                min={1}
                max={10}
                class={styles.SliderRoot}
                ControlProps={{class: styles.SliderControl}}
                Label="행의 수"
                LabelProps={{class: styles.SliderLabel}}
                ValueTextProps={{class: styles.SliderValueText}}
                />
            </Stack>

            <div id={styles.BtnWrapper}>
                
            </div>
        </main>
    )
}