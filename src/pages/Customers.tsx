import { getCustomers } from "@/api/customerService";
import { DeleteIcon, EyeIcon, PlusIcon } from "@/assets/icons";
import { ErrorComponent } from "@/components/Error";
import { Customer } from "@/types/models/models";
import { CustomerQueryParams } from "@/types/models/requests";
import { CustomerResponse } from "@/types/models/responses";
import {
	Button,
	Pagination,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	Tooltip,
	useDisclosure,
} from "@nextui-org/react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CustomerDetails } from "./-components/CustomerDetails";
import { NewCustomer } from "./-components/NewCustomer";

const Customers = () => {
	const [customers, setCustomers] = useState<Customer[]>([]);
	const [customerDetail, setCustomerDetail] = useState<Customer>();
	const [options, setOptions] = useState<CustomerResponse>();
	const {
		isOpen: isEditModalOpen,
		onOpen: onEditModalOpen,
		onOpenChange: onEditModalOpenChange,
	} = useDisclosure();
	const {
		isOpen: isCreateModalOpen,
		onOpen: onCreateModalOpen,
		onOpenChange: onCreateModalOpenChange,
	} = useDisclosure();

	const customerRequest: CustomerQueryParams = {
		date_from: "",
		date_to: "",
		customer_id: "",
		sort: "desc",
		page: 1,
		paginate: 1,
		limit: 15,
		sort_by: "created_at",
	};

	const fetchCustomers = async () => {
		try {
			const response: CustomerResponse = await getCustomers(customerRequest);
			setCustomers(response.customers);
			setOptions(response);
		} catch (error) {
			console.log(error);
		}
	};

	const viewCompanyDetails = (customer: Customer) => {
		setCustomerDetail(customer);
		onEditModalOpen();
	};

	useEffect(() => {
		fetchCustomers();
	}, []);

	return (
		<div className="sm:pt-20 pt-5 px-5 max-w-[1500px]">
			<CustomerDetails
				customer={customerDetail}
				isOpen={isEditModalOpen}
				onOpenChange={onEditModalOpenChange}
			/>
			<NewCustomer
				customers={customers}
				isOpen={isCreateModalOpen}
				onOpenChange={() => {
					onCreateModalOpenChange();
					fetchCustomers();
				}}
			/>
			<Button
				className="float-right"
				startContent={<PlusIcon />}
				radius="sm"
				onClick={onCreateModalOpen}
			>
				Ny kunde
			</Button>
			<Table className="pt-5" isStriped>
				<TableHeader aria-label="table-header">
					<TableColumn key="company_name" aria-label="customer" allowsSorting>
						Kunde
					</TableColumn>
					<TableColumn key="completed_at" aria-label="completed_at" allowsSorting>
						Kontaktperson
					</TableColumn>
					<TableColumn
						className="max-w-[30%] truncate"
						key="address"
						aria-label="address"
						allowsSorting
					>
						Adresse
					</TableColumn>
					<TableColumn key="address_from" aria-label="address_from" allowsSorting>
						E-post
					</TableColumn>
					<TableColumn key="address_to" aria-label="address_to" allowsSorting>
						Telefon
					</TableColumn>
					<TableColumn> </TableColumn>
				</TableHeader>
				<TableBody emptyContent={"Ingen kunder å vise"}>
					{customers.map((customer) => (
						<TableRow key={customer.id}>
							<TableCell aria-label={`customer-${customer.id}`}>{customer.company_name}</TableCell>
							<TableCell aria-label={`price-${customer.id}`}>{customer.contact_name}</TableCell>
							<TableCell className="max-w-[30%] truncate" aria-label={`start-time-${customer.id}`}>
								{customer.address}, {customer.city} {customer.zip_code}
							</TableCell>
							<TableCell aria-label={`address-from-${customer.id}`}>
								{customer.contact_email}
							</TableCell>
							<TableCell aria-label={`address-to-${customer.id}`}>
								{customer.contact_phone}
							</TableCell>

							<TableCell>
								<div className="relative flex items-center gap-2">
									<Tooltip aria-label={`details-${customer.id}`} content="Detaljer">
										<span className="text-lg text-default-400 cursor-pointer active:opacity-50">
											<EyeIcon onClick={() => viewCompanyDetails(customer)} />
										</span>
									</Tooltip>
									<Tooltip
										aria-label={`delete-${customer.id}`}
										color="danger"
										content="Slett ordre"
									>
										<span className="text-lg text-danger cursor-pointer active:opacity-50">
											<DeleteIcon onClick={() => console.log(customer)} />
										</span>
									</Tooltip>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Pagination
				aria-label="Pagination"
				variant="bordered"
				className="pt-10 flex justify-center"
				loop
				showControls
				showShadow
				color="success"
				siblings={2}
				total={options?.total_pages ?? 0}
				initialPage={customerRequest.page}
			/>
		</div>
	);
};

export const Route = createFileRoute("/customers")({
	component: Customers,
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
