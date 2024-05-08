export interface ErrorFeedback {
	username: string;
	page: string;
	message: string;
}

export interface Order {
	order_id: string;
	customer_name: string;
	customer_id: string;
	price: number;
	status: number;
	order_lines: OrderLine[];
	created_at: string;
	updated_at: string;
	completed_at: string;
}

export interface User {
	first_name: string;
	last_name: string;
	email: string;
	phone?: string;
	password?: string;
	id: string;
}

export interface Token {
	access_token: string;
	expires_in: number | null;
	token_type: "bearer";
}

export interface AuthState {
	isAuthenticated: boolean;
	user: User | null;
	token: Token | null;
}

export interface Customer {
	id: string;
	company_name: string;
	contact_name: string;
	address: string;
	city: string;
	zip_code: string;
	contact_email?: string;
	contact_phone?: string;
	created_at: string;
	updated_at: string;
}

export interface Product {
	product_id: string;
	name: string;
	description: string;
	price: number;
	is_service: 0 | 1;
	url?: string;
	created_at: string;
	updated_at: string;
}

export interface OrderLine {
	product_id: string;
	product_name: string;
	quantity: number;
	price: number;
	created_at: string;
	updated_at: string;
}
