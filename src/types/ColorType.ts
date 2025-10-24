import { LenStr } from "./StrType";

export type Hex = `#${LenStr<6>}`;

export type RGB =
  | `rgb(${number}, ${number}, ${number})`
  | `rgb(${number},${number},${number})`;

export type RGBA =
  | `rgb(${number}, ${number}, ${number}, ${number})`
  | `rgb(${number}, ${number}, ${number}, ${number})`;

export type HSL =
  | `hsl(${number}, ${number}%, ${number}%)`
  | `hsl(${number},${number}%,${number}%)`;

export type HSLA =
  | `hsla(${number}, ${number}%, ${number}%, ${number})`
  | `hsla(${number},${number}%,${number}%,${number})`;
