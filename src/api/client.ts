import axios from "axios";
// import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
// import { useNavigate } from "@tanstack/react-router";

const isDev = import.meta.env.MODE === "development";

const backend = isDev ? import.meta.env.VITE_BFF_URL_DEV : import.meta.env.VITE_BFF_URL_PROD;

export const client = axios.create({
	baseURL: backend,
});


// const handleLogout = () => {
// 	dispatch(logout());
// 	navigate({ to: "/auth/login" });
// };

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
		if (response.config.url !== '/api/me') {
			toast.success(response.data.message);
		}
		return response;
	},
	(error) => {
		if (error.config.url === '/api/me') {
			return Promise.reject(error);
		}

		let errorMessage = "An error occurred.";
		if (error.response?.data?.message) {
			errorMessage = error.response.data.message;
		}
		toast.error(`Error: ${errorMessage}`);
		// handleLogout();
		return Promise.reject(error);
	}
);

client.interceptors.response.use(
	(response) => response,
	(error) => {
		return Promise.reject(error);
	}
);

