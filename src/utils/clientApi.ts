import axios from "redaxios";

export const clientApi = axios.create({
    baseURL: "/api",
    validateStatus: () => true
});