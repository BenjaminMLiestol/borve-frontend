import { AuthState, Token, User } from "@/types/models/models";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: AuthState = {
	isAuthenticated: false,
	user: null,
	token: null,
};

const USER_STORAGE_KEY = "user";
const TOKEN_STORAGE_KEY = "token";

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, action: PayloadAction<{ user: User; token: Token }>) => {
			state.isAuthenticated = true;
			state.user = action.payload.user;
			state.token = action.payload.token;
			localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(action.payload.user));
			localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(action.payload.token));
		},
		logout: (state) => {
			state.isAuthenticated = false;
			state.user = null;
			state.token = null;
			localStorage.removeItem(USER_STORAGE_KEY);
			localStorage.removeItem(TOKEN_STORAGE_KEY);
		},
	},
});

export const { login, logout } = authSlice.actions;

export const selectAuthState = (state: RootState) => state.auth;

export const isAuthenticated = (state: RootState) => state.auth.isAuthenticated;

export default authSlice.reducer;
