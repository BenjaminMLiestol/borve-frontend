import { client } from "@/api/client";
import { CreateOrderRequest, OrdersQueryParams } from "@/types/models/requests";
import { OrderResponse } from "@/types/models/responses";

export const getOrders = async (data: OrdersQueryParams): Promise<OrderResponse> => {
	const response = await client.get("/api/orders/", { params: data });
	return response.data;
};

export const createOrder = (data: CreateOrderRequest) => client.post("/api/orders/", data);

export const deleteOrder = (orderId: string) =>
	client.delete("/api/orders/", { params: { order_id: orderId } });
