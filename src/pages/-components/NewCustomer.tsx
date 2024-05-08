import { createOrder } from "@/api/ordersService";
import { Customer } from "@/types/models/models";
import { CreateOrderRequest } from "@/types/models/requests";
import { formatDateTime } from "@/utils/utils";
import {
	Button,
	Divider,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Select,
	SelectItem,
	Textarea,
} from "@nextui-org/react";
import { Controller, FormProvider, useForm } from "react-hook-form";

interface CustomerDetailsProps {
	isOpen: boolean;
	customers: Customer[];
	onOpenChange: () => void;
}

export const NewCustomer = ({ isOpen, customers, onOpenChange }: CustomerDetailsProps) => {
	const { control, handleSubmit } = useForm();

	const defaultValues: CreateOrderRequest = {
		customer_id: "",
		price: 0,
		address_from: "",
		address_to: "",
		start_time: "",
		comment: "",
		passenger_count: 0,
	};

	const methods = useForm({
		defaultValues: defaultValues,
		mode: "all",
	});

	const onSubmit = async (data: any) => {
		const start_time = formatDateTime(data.start_time);
		const request = {
			...data,
			start_time: start_time,
		};

		try {
			await createOrder(request);
			setTimeout(() => {
				onOpenChange();
			}, 500);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Modal
			className="max-w-[750px] w-full"
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			scrollBehavior="inside"
		>
			<ModalContent>
				<FormProvider {...methods}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<ModalHeader>Ny ordre</ModalHeader>
						<Divider />
						<ModalBody>
							<div className="flex sm:flex-row flex-col justify-between gap-x-2">
								<div className="w-full flex flex-col gap-y-5 sm:w-2/5">
									<Controller
										name="customer_id"
										control={control}
										render={({ field }) => (
											<Select size="sm" label="Kunde" {...field}>
												{customers.map((customer) => (
													<SelectItem key={customer.id} value={customer.id}>
														{customer.company_name}
													</SelectItem>
												))}
											</Select>
										)}
									/>
									<Controller
										name="address_from"
										control={control}
										render={({ field }) => (
											<Input
												{...field}
												type="text"
												className="input"
												label="Adresse fra"
												size="sm"
											/>
										)}
									/>
									<Controller
										name="passenger_count"
										control={control}
										render={({ field }) => (
											<Input
												{...field}
												size="sm"
												type="number"
												className="input"
												label="Antall passasjerer"
												endContent={
													<div className="pointer-events-none flex items-center">
														<span className="text-default-400 text-small">pax</span>
													</div>
												}
											/>
										)}
									/>
								</div>
								<div className="w-full flex flex-col gap-y-5 sm:w-2/5">
									<Controller
										name="price"
										control={control}
										render={({ field }) => (
											<Input
												{...field}
												size="sm"
												type="number"
												className="input"
												label="Pris"
												endContent={
													<div className="pointer-events-none flex items-center">
														<span className="text-default-400 text-small">kr</span>
													</div>
												}
											/>
										)}
									/>
									<Controller
										name="address_to"
										control={control}
										render={({ field }) => (
											<Input
												{...field}
												size="sm"
												type="text"
												className="input"
												label="Adresse til"
											/>
										)}
									/>
									<Controller
										name="start_time"
										control={control}
										render={({ field }) => (
											<Input
												{...field}
												size="sm"
												type="datetime-local"
												className="input"
												label="Tidspunkt"
												placeholder=" "
											/>
										)}
									/>
								</div>
							</div>
							<div className="w-full pt-2.5">
								<Controller
									name="comment"
									control={control}
									render={({ field }) => (
										<Textarea {...field} className="input" label="Kommentar" />
									)}
								/>
							</div>
						</ModalBody>
						<Divider />
						<ModalFooter className="flex justify-center">
							<Button type="submit">Lagre</Button>
						</ModalFooter>
					</form>
				</FormProvider>
			</ModalContent>
		</Modal>
	);
};
