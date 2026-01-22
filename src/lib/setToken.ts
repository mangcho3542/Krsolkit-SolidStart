import {
	HTTPEvent,
	setCookie,
	deleteCookie,
	CookieSerializeOptions,
} from "vinxi/http";

export const AccessTokenOptions: CookieSerializeOptions = {
	path: "/",
	maxAge: 60 * 15, //15분
	httpOnly: true,
	sameSite: "strict",
	secure: true
};

export const RefreshTokenOptions: CookieSerializeOptions = {
	path: "/",
	maxAge: 60 * 24 * 14, //2주
	httpOnly: true,
	sameSite: "strict",
	secure: true
};

interface SetTokenI {
	accessToken?: string;
	refreshToken?: string;
}

export function setToken(event: HTTPEvent, {accessToken, refreshToken}: SetTokenI) {
    if(accessToken) setCookie(event, "accessToken", accessToken, AccessTokenOptions);
    if(refreshToken) setCookie(event, "refreshToken", refreshToken, RefreshTokenOptions);
}

interface DeleteTokenI {
    accessToken?: boolean;
    refreshToken?: boolean;
}

export function deleteToken(event: HTTPEvent, {accessToken, refreshToken}: DeleteTokenI) {
    if(accessToken ?? true) deleteCookie(event, "accessToken", AccessTokenOptions);
    if(refreshToken ?? true) deleteCookie(event, "refreshToken", RefreshTokenOptions);
}