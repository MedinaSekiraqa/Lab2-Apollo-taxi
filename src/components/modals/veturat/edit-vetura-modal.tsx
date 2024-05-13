"use client";
import { Modal } from "../../ui/smallModal";
import { useEditVeturaModal } from "@/hooks/use-edit-vetura-modal";

export const EditVeturaModal = () => {
   const { isOpen, onClose } = useEditVeturaModal();

   return (
      <Modal
         title={"Ndrysho Veturen"}
         description=""
         isOpen={isOpen}
         onClose={onClose}
      ></Modal>
   );
};
