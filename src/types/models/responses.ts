import { Customer, Order, Product, Token, User } from "./models";

export interface LoginResponse {
	token: Token;
	user: User;
}

export interface OrderResponse {
	orders: Order[];
	page: number;
	total_orders: number;
	total_pages: number;
}

export interface CustomerResponse {
	customers: Customer[];
	page: number;
	total_customers: number;
	total_pages: number;
}

export interface ProductResponse {
	products: Product[];
}
