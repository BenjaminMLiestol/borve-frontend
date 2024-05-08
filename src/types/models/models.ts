export interface ErrorFeedback {
	username: string;
	page: string;
	message: string;
}

export interface Order {
	customer: string;
	price: number;
	address_from: string;
	address_to: string;
	start_time: string;
	time_spent?: number | null;
	km_driven?: number | null;
	comment?: string | null;
	status: number;
	passenger_count: number;
	created_at: string;
	updated_at: string;
	completed_at: string;
	order_id: string;
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
	country: string;
	contact_email: string;
	contact_phone: string;
	created_at: string;
	updated_at: string;
}
