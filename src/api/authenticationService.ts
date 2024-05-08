import { client } from "@/api/client";
import { CreateUserRequest, LoginRequest } from "@/types/models/requests";
import { LoginResponse } from "@/types/models/responses";

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
	const response = await client.post("/api/login", data);
	localStorage.setItem("user", JSON.stringify(response.data.user));
	localStorage.setItem("token", JSON.stringify(response.data.token));
	return response.data;
};

export const createUser = (data: CreateUserRequest) => client.post("/api/users/", data);

export const checkUser = () => client.get("/api/me");
