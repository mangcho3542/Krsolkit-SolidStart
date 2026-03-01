import { redirect } from "@solidjs/router";
import { HTTPEvent, getCookie, deleteCookie } from "vinxi/http";

const authPaths = ["/login", "/signup"];

export default function AuthMiddleware(event: HTTPEvent, pathName: string) {
    //auth path인지 아닌지 나타내는 변수
    let flag = false;
    for(const path of authPaths) {
        if(pathName.startsWith(path)) {
            flag = true;
            break;
        }
    }

    if(flag) {  //login, signup페이지에 접근할 때, accessToken/refreshToken이 있다면 삭제 후 redirect
        const accessToken = getCookie(event, "accessToken");
        if(accessToken) {
            deleteCookie(event, "accessToken");
        }

        const refreshToken = getCookie(event, "refreshToken");
        if(refreshToken) {
            deleteCookie(event, "refreshToken");
        }

        return redirect(pathName, {status: 400, });
    }
}