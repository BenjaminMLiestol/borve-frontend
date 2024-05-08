export interface LoginRequest {
	email: string;
	password: string;
}

export interface CreateUserRequest {
	first_name: string;
	last_name: string;
	email: string;
	phone?: string;
	password: string;
	password_confirmation: string;
}

export interface CreateOrderRequest {
	customer_id: string;
	price: number;
	address_from: string;
	address_to: string;
	start_time: string;
	comment?: string | null;
	passenger_count: number;
}

export interface OrdersQueryParams {
	date_from?: string | null;
	date_to?: string | null;
	customer_id?: string | null;
	sort?: "asc" | "desc";
	paginate?: 0 | 1;
	limit?: number;
	page?: number;
	sort_by?: string;
}

export interface CustomerQueryParams {
	date_from?: string | null;
	date_to?: string | null;
	customer_id?: string | null;
	sort?: "asc" | "desc";
	paginate?: 0 | 1;
	limit?: number;
	page?: number;
	sort_by?: string;
}
