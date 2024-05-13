"use client";
import { Modal } from "../../ui/smallModal";
import { useCreateRaportiShoferitModal } from "@/hooks/use-create-raporti-shoferit-modal";
import CreateRaportiShoferitForm from "../../forms/raportiShoferit/createRaportiShoferitForm";

export function CreateRaportiShoferitModal() {
   const { isOpen, onClose } = useCreateRaportiShoferitModal();

   return (
      <Modal
         title="Raporti ditor"
         description=""
         isOpen={isOpen}
         onClose={onClose}
      >
         <CreateRaportiShoferitForm />
      </Modal>
   );
}
