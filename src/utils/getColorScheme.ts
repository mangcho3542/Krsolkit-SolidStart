import { createSignal, onCleanup, onMount } from "solid-js";

export type ColorScheme = "light" | "dark" | "none"

export function getColorScheme(): ColorScheme {
    const [scheme, setScheme] = createSignal<ColorScheme>("none");

    onMount(() => {
        if(typeof window === "undefined") {
            setScheme("none");
            return;
        }

        const dark = window.matchMedia("(prefers-color-scheme: dark)");
        const light = window.matchMedia("(prefers-color-scheme: light)");

        const update = () => {
            if(dark.matches) setScheme("dark");
            else if(light.matches) setScheme("light");
            else setScheme("none");
        }

        update();

        dark.addEventListener("change", update);
        light.addEventListener("change", update);

        onCleanup(() => {
            dark.removeEventListener("change", update);
            light.removeEventListener("change", update);
        })
    });

    return scheme();
}