import axios from "axios";

export const serverApi = axios.create({
	baseURL: process.env.SERVER_URL,
	headers: {
		Authorization: `Bearer ${process.env.AUTHORIZATION_KEY!}`,
		"Content-Type": "application/json",
		Accept: "application/json",
	},
	validateStatus: () => true,
});

