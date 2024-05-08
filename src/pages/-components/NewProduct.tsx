import { Button, Divider, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Switch, Textarea } from "@nextui-org/react";
import "./newProduct.css"
interface NewProductProps {
	isOpen: boolean;
	onOpenChange: () => void;
}
export const NewProduct = ({isOpen, onOpenChange}: NewProductProps) => {

  return (
		<Modal
			className="max-w-[750px] w-full"
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			scrollBehavior="inside"
		>
			<ModalContent>
        <ModalHeader className="justify-center">Ny ordre</ModalHeader>
        <Divider />
        <ModalBody>
          <Input
            label="Produktnavn"
          />
          <Textarea
            label="Produktbeskrivelse"
          />
          <Input 
            label="Pris" 
            className="w-24" 
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">kr</span>
              </div>
            }
          />
          <Switch 
            className="type-toggle"
            classNames={{
              base: "w-44",
              wrapper: "w-44 !bg-[#464646] text-white h-10 py-1 px-1",
              thumb: "bg-white w-1/2 h-full text-black",
            }}
            size="lg"
            thumbIcon={({ isSelected }) => (isSelected ? "Vare" : "Tjeneste")}
            startContent={<div>Tjeneste</div>}
            endContent={<div>Vare</div>}
          />
        </ModalBody>
        <Divider />
        <ModalFooter className="flex justify-center">
          <Button type="submit">Lagre</Button>
        </ModalFooter>
			</ModalContent>
		</Modal>
	);
}