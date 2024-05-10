import { Customer } from "@/types/models/models";
import {
	Divider,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@nextui-org/react";

interface CustomerDetailsProps {
	customer?: Customer;
	isOpen: boolean;
	onOpenChange: () => void;
}

export const CustomerDetails = ({ customer, isOpen, onOpenChange }: CustomerDetailsProps) => {
	return (
		<Modal
			className="max-w-[750px] w-full"
			isOpen={isOpen}
			placement="top"
			onOpenChange={onOpenChange}
			scrollBehavior="inside"
		>
			<ModalContent>
				<ModalHeader>
					<h1>{customer?.company_name}</h1>
				</ModalHeader>
				<Divider />
				<ModalBody>
					<div className="flex sm:flex-row flex-col">
						<div>he</div>
						<div>hello</div>
					</div>
				</ModalBody>
				<Divider />
				<ModalFooter>dwd</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
