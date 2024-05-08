import { client } from "@/api/client";
import { ProductResponse } from "@/types/models/responses";

export const getProducts = async (): Promise<ProductResponse> => {
	const response = await client.get("/api/products/");
	return response.data;
};

