"use client";
import CreateVeturaForm from "@/components/forms/veturat/createVeturaForm";
import { Modal } from "../../ui/smallModal";
import { useCreateVeturaModal } from "@/hooks/use-create-vetura-modal";

export const CreateVeturaModal = () => {
   const { isOpen, onClose } = useCreateVeturaModal();
   
   return (
      <Modal
         title="Shto vetura"
         description=""
         isOpen={isOpen}
         onClose={onClose}
      >
         <CreateVeturaForm />
      </Modal>
   );
};