import { Outlet } from "@tanstack/react-router";
import "./index.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkUser } from "./api/authenticationService";
import { NavbarComponent } from "./components/Navbar";
import { AuthNavBarComponent } from "./components/authnavbar/AuthNavbar";
import { logout } from "./redux/reducers/authslice";
import { RootState } from "./redux/store";

export const App = () => {
	const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
	const dispatch = useDispatch();

	const validateUser = async () => {
		const resp = await checkUser();

		if (!resp) {
			dispatch(logout());
		}
	};

	useEffect(() => {
		if (isAuthenticated) {
			validateUser();
		}
	});

	return (
		<div className={`flex min-h-screen flex-col ${isAuthenticated ? "sm:flex-row" : ""} `}>
			{!isAuthenticated && <NavbarComponent />}
			{isAuthenticated && <AuthNavBarComponent />}

			<div className="w-full">
				<Outlet />
			</div>
		</div>
	);
};

export default App;
