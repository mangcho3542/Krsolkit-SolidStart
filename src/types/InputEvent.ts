export type InputFocusEvent = FocusEvent & {
    currentTarget: HTMLInputElement;
    target: HTMLInputElement;
}