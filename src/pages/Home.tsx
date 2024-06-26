import { ErrorComponent } from "@/components/Error";
import { useUser } from "@/core/UserProvider";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const HomeComponent = () => {
	const user = useUser();

	return (
		<div className="flex flex-col px-5 max-w-[1500px]">
			<div className="mt-10">
				<h1 className="text-xxl">
					Velkommen tilbake {user?.first_name}
					<span aria-label="emoji" className="ml-2" role="img">
						👋
					</span>
				</h1>
				<p className="text-xs">Her er et overblikk over kontoen din</p>
			</div>
			<div className="mt-10">
				<h3>Totalt</h3>
				<div className="flex flex-wrap gap-5 mt-5">
					<div className="p-5 border rounded-md sm:w-96 w-full">
						<h3 className="text-lg mb-2">Antall ordre</h3>
						<p>2</p>
					</div>
					<div className="p-5 border rounded-md sm:w-96 w-full">
						<h3 className="text-lg mb-2">Antall kunder</h3>
						<p>2</p>
					</div>
					<div className="p-5 border rounded-md sm:w-96 w-full">
						<h3 className="text-lg mb-2">Inntjening</h3>
						<p>200 Kr</p>
					</div>
				</div>
			</div>
			<div className="mt-10">
				<h3>Denne måneden</h3>
				<div className="flex flex-wrap gap-5 mt-5">
					<div className="p-5 border rounded-md sm:w-96 w-full">
						<h3 className="text-lg mb-2">Antall ordre</h3>
						<p>2</p>
					</div>
					<div className="p-5 border rounded-md sm:w-96 w-full">
						<h3 className="text-lg mb-2">Antall kunder</h3>
						<p>2</p>
					</div>
					<div className="p-5 border rounded-md sm:w-96 w-full">
						<h3 className="text-lg mb-2">Inntjening</h3>
						<p>2500 Kr</p>
					</div>
				</div>
			</div>
			<div className="mt-10">
				<h3>Forrige måned</h3>
				<div className="flex flex-wrap gap-5 mt-5">
					<div className="p-5 border rounded-md sm:w-96 w-full">
						<h3 className="text-lg mb-2">Antall ordre</h3>
						<p>2</p>
					</div>
					<div className="p-5 border rounded-md sm:w-96 w-full">
						<h3 className="text-lg mb-2">Antall kunder</h3>
						<p>2</p>
					</div>
					<div className="p-5 border rounded-md sm:w-96 w-full">
						<h3 className="text-lg mb-2">Inntjening</h3>
						<p>2500 Kr</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export const Route = createFileRoute("/home")({
	component: HomeComponent,
	beforeLoad: async ({ location }) => {
		const isAuthenticated =
			localStorage.getItem("user") !== null && localStorage.getItem("token") !== null;
		if (!isAuthenticated) {
			throw redirect({
				to: "/auth/login",
				search: {
					redirect: location,
				},
			});
		}
	},
	errorComponent: ErrorComponent,
});
