import { loginUser } from "@/api/authenticationService";
import { login } from "@/redux/reducers/authslice";
import { LoginRequest } from "@/types/models/requests";
import { LoginRequestSchema } from "@/types/validation.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { Button, Checkbox, Input } from "@nextui-org/react";
import {
	ErrorComponent,
	Link,
	createFileRoute,
	redirect,
	useNavigate,
} from "@tanstack/react-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export const LoginTwoComponent = () => {
	const dispatch = useDispatch();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => setIsVisible(!isVisible);
	const navigate = useNavigate();

	const defaultValues: LoginRequest = {
		email: "",
		password: "",
	};

	const methods = useForm({
		defaultValues,
		mode: "all",
		resolver: zodResolver(LoginRequestSchema),
	});

	const { handleSubmit, control, formState } = methods;
	const { errors } = formState;

	const onSubmit = async (data: LoginRequest) => {
		setIsSubmitting(true);
		try {
			const response = await loginUser(data);
			setIsSubmitting(false);
			dispatch(login({ user: response.user, token: response.token }));
			navigate({ to: "/home" });
		} catch (error) {
			setIsSubmitting(false);
			console.error("Error occurred while logging in:", error);
		}
	};

	return (
		<div
			className="flex w-full items-center justify-center overflow-hidden rounded-small bg-content1 p-2 sm:p-4 lg:p-8"
			style={{
				backgroundImage:
					"url(https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/black-background-texture-2.jpg)",
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			{/* Login Form */}
			<div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
				<p className="pb-2 text-xl font-medium">Logg inn</p>
				<form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name="email"
						control={control}
						defaultValue=""
						render={({ field }) => (
							<Input
								{...field}
								variant="bordered"
								label="Brukernavn"
								placeholder="Fyll inn ditt brukernavn"
								autoComplete="username"
								isInvalid={!!errors?.email}
								errorMessage={errors?.email ? "Dette feltet er påkrevd" : ""}
							/>
						)}
					/>
					<Controller
						name="password"
						control={control}
						defaultValue=""
						render={({ field }) => (
							<Input
								{...field}
								label="Passord"
								variant="bordered"
								placeholder="Fyll inn ditt passord"
								autoComplete="current-password"
								isInvalid={!!errors?.password}
								errorMessage={errors?.password ? "Dette feltet er påkrevd" : ""}
								endContent={
									<button className="focus:outline-none" type="button" onClick={toggleVisibility}>
										{isVisible ? (
											<Icon
												className="pointer-events-none text-2xl text-default-400"
												icon="solar:eye-closed-linear"
											/>
										) : (
											<Icon
												className="pointer-events-none text-2xl text-default-400"
												icon="solar:eye-bold"
											/>
										)}
									</button>
								}
								type={isVisible ? "text" : "password"}
							/>
						)}
					/>
					<div className="flex items-center justify-between px-1 py-2">
            <Checkbox name="remember" size="sm">
              Remember me
            </Checkbox>
            <Link className="text-default-500" href="#">
              Forgot password?
            </Link>
          </div>
					<Button isDisabled={isSubmitting} color="primary" type="submit">
						Logg inn
					</Button>
				</form>
				<p className="text-center text-small">
					Trenger du en ny bruker?&nbsp;
					<Link className="text-blue-600 hover:text-blue-800" to="/auth/register">
						Registrer deg
					</Link>
				</p>
			</div>
		</div>
	);
};

export const Route = createFileRoute("/auth/Login")({
	component: LoginTwoComponent,
	beforeLoad: async () => {
		const isAuthenticated =
			localStorage.getItem("user") !== null && localStorage.getItem("token") !== null;
		if (isAuthenticated) {
			throw redirect({
				to: "/home",
			});
		}
	},
	errorComponent: ErrorComponent,
});
