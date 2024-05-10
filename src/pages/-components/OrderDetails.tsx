import { Order } from "@/types/models/models";
import {
	Divider,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@nextui-org/react";

interface OrderDetailsProps {
	order?: Order;
	isOpen: boolean;
	onOpenChange: () => void;
}

export const OrderDetails = ({ order, isOpen, onOpenChange }: OrderDetailsProps) => {
	console.log(order);
	return (
		<Modal
			className="max-w-[750px] w-full"
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			scrollBehavior="inside"
		>
			<ModalContent>
				<ModalHeader>Ordredetaljer</ModalHeader>
				<Divider />
				<ModalBody>
					<div className="flex sm:flex-row flex-col">
						<div>hello</div>
					</div>
				</ModalBody>
				<Divider />
				<ModalFooter>dwd</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
