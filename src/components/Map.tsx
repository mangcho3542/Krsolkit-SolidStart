import { JSXElement } from "solid-js";

export interface MapProps<T> {
    each: T[];
    children: (item: T, index: number) => JSXElement;
}

export function Map<T>(props: MapProps<T>) {
    return props.each.map(props.children);
}

export default Map;