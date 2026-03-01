import { For, JSXElement } from "solid-js";

export interface MapProps<T> {
    each: T[];
    children: (item: T & { index: number }) => JSXElement;
}

export function Map<T extends object>(props: MapProps<T>) {
    return (
        <For each={props.each}>
            {(item, index) => props.children({ ...item, index: index() })}
        </For>
    );
}

export default Map;