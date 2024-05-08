import { createUser } from "@/api/authenticationService";
import { ErrorComponent } from "@/components/Error";
import { CreateUserRequest } from "@/types/models/requests";
import { CreateUserRequestSchema } from "@/types/validation.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { Button, Input } from "@nextui-org/react";
import { Link, createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export const CreateAccountComponent = () => {
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => setIsVisible(!isVisible);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const navigate = useNavigate();

	const defaultValues: CreateUserRequest = {
		first_name: "",
		last_name: "",
		email: "",
		password: "",
		password_confirmation: "",
	};

	const methods = useForm({
		defaultValues,
		mode: "all",
		resolver: zodResolver(CreateUserRequestSchema),
	});

	const { handleSubmit, control, formState, reset } = methods;
	const { errors } = formState;

	const onSubmit = async (data: CreateUserRequest) => {
		setIsSubmitting(true);
		try {
			await createUser(data);
			reset;
			setIsSubmitting(false);
			setTimeout(() => {
				navigate({ to: "/auth/login" });
			}, 1000);
		} catch (error) {
			setIsSubmitting(false);
			console.log(error);
		}
	};

	return (
		<div className="flex h-full w-full items-center justify-center">
			<div className="flex w-full max-w-sm flex-col gap-4 rounded-large px-8 pb-10 pt-6">
				<p className="pb-4 text-left text-3xl font-semibold">
					Opprett bruker
					<span aria-label="emoji" className="ml-2" role="img">
						👋
					</span>
				</p>
				<form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name="first_name"
						control={control}
						defaultValue=""
						render={({ field }) => (
							<Input
								{...field}
								isRequired
								name="username"
								variant="bordered"
								labelPlacement="outside"
								label="Fornavn"
								placeholder="Skriv inn ditt fornavn"
								autoComplete="first-name"
								isInvalid={!!errors?.first_name}
								errorMessage={errors?.first_name ? "Dette feltet er påkrevd" : ""}
							/>
						)}
					/>
					<Controller
						name="last_name"
						control={control}
						defaultValue=""
						render={({ field }) => (
							<Input
								{...field}
								isRequired
								variant="bordered"
								label="Etternavn"
								labelPlacement="outside"
								placeholder="Skriv inn ditt etternavn"
								autoComplete="last-name"
								isInvalid={!!errors?.last_name}
								errorMessage={errors?.last_name ? "Dette feltet er påkrevd" : ""}
							/>
						)}
					/>
					<Controller
						name="email"
						control={control}
						defaultValue=""
						render={({ field }) => (
							<Input
								{...field}
								isRequired
								variant="bordered"
								label="E-post"
								placeholder="Skriv inn din e-post"
								labelPlacement="outside"
								type="email"
								autoComplete="email"
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
								isRequired
								variant="bordered"
								label="Passord"
								autoComplete="password"
								labelPlacement="outside"
								name="password"
								placeholder="Skriv inn ditt passord"
								type={isVisible ? "text" : "password"}
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
							/>
						)}
					/>
					<Controller
						name="password_confirmation"
						control={control}
						defaultValue=""
						render={({ field }) => (
							<Input
								{...field}
								isRequired
								variant="bordered"
								label="Bekreft passord"
								autoComplete="password"
								type={isVisible ? "text" : "password"}
								labelPlacement="outside"
								name="confirmPassword"
								placeholder="Bekreft ditt passord"
								isInvalid={!!errors?.password_confirmation}
								errorMessage={errors?.password_confirmation ? "Dette feltet er påkrevd" : ""}
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
							/>
						)}
					/>
					{/* <Checkbox isRequired className="py-4" size="sm">
            I agree with the&nbsp;
            <Link to="/">
              Terms
            </Link>
            &nbsp; and&nbsp;
            <Link to="/">
              Privacy Policy
            </Link>
          </Checkbox> */}
					<Button color="primary" type="submit" isDisabled={isSubmitting}>
						Sign Up
					</Button>
				</form>
				<p className="text-center text-small">
					<Link className="text-blue-600 hover:text-blue-800" to="/auth/login">
						Har du allerede en bruker? Logg inn
					</Link>
				</p>
			</div>
		</div>
	);
};

export const Route = createFileRoute("/auth/register")({
	component: CreateAccountComponent,
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
