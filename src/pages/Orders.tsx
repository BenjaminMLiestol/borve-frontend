import { getCustomers } from "@/api/customerService";
import { deleteOrder, getOrders } from "@/api/ordersService";
import { DeleteIcon, EyeIcon, PlusIcon } from "@/assets/icons";
import { ErrorComponent } from "@/components/Error";
import { Customer, Order } from "@/types/models/models";
import { CustomerQueryParams, OrdersQueryParams } from "@/types/models/requests";
import { CustomerResponse, OrderResponse } from "@/types/models/responses";
import {
	Button,
	Pagination,
	SortDescriptor,
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
import { NewOrder } from "./-components/NewOrder";
import { OrderDetails } from "./-components/OrderDetails";

export const OrderComponent = () => {
	const [orders, setOrders] = useState<Order[]>([]);
	const [order, setOrder] = useState<Order>();
	const [options, setOptions] = useState<OrderResponse>();
	const [customers, setCustomers] = useState<Customer[]>([]);
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

	const request: OrdersQueryParams = {
		date_from: "",
		date_to: "",
		customer_id: "",
		sort: "desc",
		page: 1,
		paginate: 1,
		limit: 15,
		sort_by: "created_at",
	};

	const customerRequest: CustomerQueryParams = {
		date_from: "",
		date_to: "",
		customer_id: "",
		sort: "desc",
		paginate: 0,
	};

	const fetchOrders = async () => {
		try {
			const response: OrderResponse = await getOrders(request);
			setOrders(response.orders);
			setOptions(response);
		} catch (error) {
			console.log(error);
		}
	};
	
	const fetchCustomers = async () => {
		try {
			const response: CustomerResponse = await getCustomers(customerRequest);
			setCustomers(response.customers);
		} catch (error) {
			console.log(error);
		}
	};
	
	const handleDeleteOrder = async (orderId: string) => {
		try {
			await deleteOrder(orderId);
			await fetchOrders();
		} catch (error) {
			console.error(error);
		}
	};

	const updateOnPagination = (page: number) => {
		request.page = page;

		fetchOrders();
	};

	const updateOnSort = (value: SortDescriptor) => {
		if (value.direction === "ascending") {
			request.sort = "asc";
		} else {
			request.sort = "desc";
		}

		request.sort_by = value.column as string;

		fetchOrders();
	};

	const viewOrderDetails = (order: Order) => {
		setOrder(order);
		onEditModalOpen();
	};

	useEffect(() => {
		fetchOrders();
	fetchCustomers();
	}, []);
	

	return (
		<div className="sm:pt-20 pt-5">
			<OrderDetails order={order} isOpen={isEditModalOpen} onOpenChange={onEditModalOpenChange} />
			<NewOrder
				customers={customers}
				isOpen={isCreateModalOpen}
				onOpenChange={() => {
					onCreateModalOpenChange();
					fetchOrders();
				}}
			/>
			<Button
				className="float-right"
				startContent={<PlusIcon />}
				radius="sm"
				onClick={onCreateModalOpen}
			>
				Ny ordre
			</Button>
			<Table className="pt-5" onSortChange={updateOnSort} isStriped>
				<TableHeader aria-label="table-header">
					<TableColumn key="company_name" aria-label="customer" allowsSorting>
						Kunde
					</TableColumn>
					<TableColumn key="start_time" aria-label="start_time" allowsSorting>
						Tidspunkt
					</TableColumn>
					<TableColumn key="address_from" aria-label="address_from" allowsSorting>
						Fra
					</TableColumn>
					<TableColumn key="address_to" aria-label="address_to" allowsSorting>
						Til
					</TableColumn>
					<TableColumn key="price" aria-label="price" allowsSorting>
						Pris
					</TableColumn>
					<TableColumn key="completed_at" aria-label="completed_at" allowsSorting>
						Fullført
					</TableColumn>
					<TableColumn> </TableColumn>
				</TableHeader>
				<TableBody emptyContent={"Ingen ordre å vise"}>
					{orders.map((order) => (
						<TableRow key={order.order_id}>
							<TableCell aria-label={`customer-${order.order_id}`}>{order.customer}</TableCell>
							<TableCell aria-label={`start-time-${order.order_id}`}>{order.start_time}</TableCell>
							<TableCell aria-label={`address-from-${order.order_id}`}>
								{order.address_from}
							</TableCell>
							<TableCell aria-label={`address-to-${order.order_id}`}>{order.address_to}</TableCell>
							<TableCell aria-label={`price-${order.order_id}`}>{order.price}</TableCell>
							<TableCell aria-label={`completed-${order.order_id}`}>
								{order.completed_at ? "✓" : "-"}
							</TableCell>
							<TableCell>
								<div className="relative flex items-center gap-2">
									<Tooltip aria-label={`details-${order.order_id}`} content="Detaljer">
										<span className="text-lg text-default-400 cursor-pointer active:opacity-50">
											<EyeIcon onClick={() => viewOrderDetails(order)} />
										</span>
									</Tooltip>
									<Tooltip
										aria-label={`delete-${order.order_id}`}
										color="danger"
										content="Slett ordre"
									>
										<span className="text-lg text-danger cursor-pointer active:opacity-50">
											<DeleteIcon onClick={() => handleDeleteOrder(order.order_id)} />
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
				onChange={updateOnPagination}
				total={options?.total_pages ?? 0}
				initialPage={request.page}
			/>
		</div>
	);
};

export const Route = createFileRoute("/orders")({
	component: OrderComponent,
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
