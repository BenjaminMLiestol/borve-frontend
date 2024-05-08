import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import "react-toastify/dist/ReactToastify.css";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { login } from "./redux/reducers/authslice";
import { store } from "./redux/store";
import { UserProvider } from "./core/UserProvider";

const queryClient = new QueryClient({
	defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

const router = createRouter({
	routeTree,
	defaultPreload: "intent",
	context: { queryClient },
	defaultStaleTime: 0,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const mode = localStorage.getItem("theme") || "dark";

const initializeApp = async () => {
	try {
		const user = JSON.parse(localStorage.getItem("user") || "null");
		const token = JSON.parse(localStorage.getItem("token") || "null");

		if (user && token) {
			store.dispatch(login({ user, token }));
		}
	} catch (error) {
		console.error("Error initializing app:", error);
	}
};

initializeApp();

createRoot(document.getElementById("app")!).render(
	<StrictMode>
		<Provider store={store}>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={true}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
			<NextUIProvider>
				<NextThemesProvider attribute="class" defaultTheme={mode}>
					<UserProvider>
					<main className="text-foreground bg-background flex flex-col">
						<QueryClientProvider client={queryClient}>
							<RouterProvider router={router} />
							<ReactQueryDevtools initialIsOpen={false} />
						</QueryClientProvider>
					</main>
					</UserProvider>
				</NextThemesProvider>
			</NextUIProvider>
		</Provider>
	</StrictMode>,
);
