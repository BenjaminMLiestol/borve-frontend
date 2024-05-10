import { Product } from "@/types/models/models";
import {
  Button,
	Divider,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
  Textarea,
} from "@nextui-org/react";
import "./newProduct.css"

interface ProductDetailsProps {
	product?: Product;
	isOpen: boolean;
	onOpenChange: () => void;
}

export const ProductDetails = ({ product, isOpen, onOpenChange }: ProductDetailsProps) => {
  console.log(product);
	return (
		<Modal
			className="max-w-[750px] w-full"
			isOpen={isOpen}
      placement="top"
			onOpenChange={onOpenChange}
			scrollBehavior="inside"
		>
			<ModalContent>
				<ModalHeader className="flex justify-center">
          <h2>{product?.name}</h2>
        </ModalHeader>
				<Divider />
				<ModalBody>
					<div className="flex sm:flex-row flex-col items-start gap-6 py-10">
            <div className="w-1/2 flex flex-col gap-2">
            <Textarea
              variant="faded"
              value={product?.description}
              labelPlacement="outside"
              label="Produktbeskrivelse"
            />
            </div>
            <div className="w-1/2 flex flex-row gap-4">
              <Input 
                label="Pris" 
                labelPlacement="outside"
                variant="faded"
                value={product?.price as string}
                className="w-24" 
                endContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">kr</span>
                  </div>
                }
              />
              </div>
					</div>
				</ModalBody>
				<Divider />
				<ModalFooter>
          <Button>Lagre</Button>
        </ModalFooter>
			</ModalContent>
		</Modal>
	);
};
