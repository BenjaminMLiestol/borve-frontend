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
    if (response.config.url !== '/api/me') {
      toast.success(response.data.message);
    }
    return response;
  },
  (error) => {
    // Check if the request URL is "/api/me" and skip displaying toast
    if (error.config.url === '/api/me') {
      return Promise.reject(error);
    }

    let errorMessage = "An error occurred.";
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }
    toast.error(`Error: ${errorMessage}`);
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if the request URL is "/api/me" and skip redirection
    if (error.config.url === '/api/me') {
      return Promise.reject(error);
    }

    if (error.response.status === 401) {
      location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);
