import { getProducts } from '@/api/productService';
import { DeleteIcon, EyeIcon, PlusIcon } from '@/assets/icons';
import { ErrorComponent } from '@/components/Error';
import { Product } from '@/types/models/models';
import { ProductResponse } from '@/types/models/responses';
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Tooltip, useDisclosure } from '@nextui-org/react';
import { createFileRoute, redirect } from '@tanstack/react-router'
import { useEffect, useState } from 'react';
// import { NewProduct } from './-components/NewProduct';
import { ProductDetails } from './-components/ProductDetails';
import { NewProduct } from './-components/NewProduct';

export const Products = () => {
	const [products, setProducts] = useState<Product[]>([])
	const [product, setProduct] = useState<Product>();
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

	const fetchProducts = async () => {
		try {
			const response: ProductResponse = await getProducts();
			setProducts(response.products);
		} catch (error) {
			// console.log(error);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	const viewProductDetails = (product: Product) => {
		setProduct(product);
		onEditModalOpen()
	}

	const handleDeleteProduct = (product_id: string) => {
		console.log(product_id);
	}

	return (
		<>
			<div className="sm:pt-20 pt-5 px-5 max-w-[1500px]">
				<NewProduct
					isOpen={isCreateModalOpen}
					onOpenChange={() => {
						onCreateModalOpenChange();
					}}
				/>
				<Button
					startContent={<PlusIcon />}
					radius="sm"
					onClick={onCreateModalOpen}
				>
					Nytt produkt
				</Button>
				<ProductDetails product={product} isOpen={isEditModalOpen} onOpenChange={onEditModalOpenChange} />
				<Table className="pt-5" isStriped>
					<TableHeader aria-label="table-header">
						<TableColumn key="name" aria-label="product" allowsSorting>
							Produktnavn
						</TableColumn>
						<TableColumn key="description" aria-label="description" allowsSorting>
							Beskrivelse
						</TableColumn>
						<TableColumn key="price" aria-label="Pris" allowsSorting>
							Pris
						</TableColumn>
						<TableColumn key="is_service" aria-label="Product type" allowsSorting>
							Produkt type
						</TableColumn>
						<TableColumn> </TableColumn>
					</TableHeader>
					<TableBody emptyContent={"Ingen produkter å vise"}>
						{products && products.map((product, i) => (
							<TableRow key={product.product_id} aria-label={`row-${i}`}>
								<TableCell aria-label={`name-${product.product_id}`} className="sm:w-1/5">{product.name}</TableCell>
								<TableCell aria-label={`desc-${product.product_id}`} className="sm:w-2/5">{product.description}</TableCell>
								<TableCell aria-label={`price-${product.product_id}`} className="sm:w-1/5 whitespace-nowrap">{product.price} kr</TableCell>
								<TableCell aria-label={`type-${product.product_id}-`} className="sm:w-1/5">{product.is_service ? 'Tjeneste' : 'Vare'}</TableCell>
								<TableCell className="sm:w-1/12">
									<div className="relative flex items-center justify-end gap-2">
										<Tooltip aria-label={`details-${product.product_id}`} content="Detaljer">
											<span className="text-lg text-default-400 cursor-pointer active:opacity-50">
												<EyeIcon onClick={() => viewProductDetails(product)} />
											</span>
										</Tooltip>
										<Tooltip
											aria-label={`delete-${product.product_id}`}
											color="danger"
											content="Slett ordre"
										>
											<span className="text-lg text-danger cursor-pointer active:opacity-50">
												<DeleteIcon onClick={() => handleDeleteProduct(product.product_id)} />
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
					// onChange={updateOnPagination}
					total={10}
					initialPage={1}
				/>
			</div>
		</>

	);
}

export const Route = createFileRoute("/products")({
	component: Products,
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