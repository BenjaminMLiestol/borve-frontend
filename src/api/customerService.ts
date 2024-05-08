import { client } from "@/api/client";
import { CustomerQueryParams } from "@/types/models/requests";
import { CustomerResponse } from "@/types/models/responses";

export const getCustomers = async (data: CustomerQueryParams): Promise<CustomerResponse> => {
	const response = await client.get("/api/customers/", { params: data });
	return response.data;
};
