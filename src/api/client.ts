import axios from "axios";
import { toast } from "react-toastify";

const isDev = import.meta.env.MODE === "development";

const backend = isDev ? import.meta.env.VITE_BFF_URL_DEV : import.meta.env.VITE_BFF_URL_PROD;

export const client = axios.create({
	baseURL: backend,
});

client.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			const accessToken = JSON.parse(token).access_token;
			if (accessToken) {
				config.headers.Authorization = `Bearer ${accessToken}`;
			}
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

client.interceptors.response.use(
	(response) => {
		toast.success(response.data.message);
		return response;
	},
	(error) => {
		let errorMessage = "An error occurred.";
		if (error.response?.data?.message) {
			errorMessage = error.response.data.message;
		}
		toast.error(`Error: ${errorMessage}`);
		return Promise.reject(error);
	},
);
client.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response.status === 401) {
			location.href = "/auth/login";
		}
	},
);
