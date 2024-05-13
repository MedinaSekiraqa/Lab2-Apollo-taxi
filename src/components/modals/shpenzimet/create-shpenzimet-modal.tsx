"use client";
import { Modal } from "../../ui/smallModal";
import { useCreateShpenzimetModal } from "@/hooks/use-create-shpenzimet-modal";
import CreateShpenzimetForm from "@/components/forms/shpenzimet/createShpenzimetForm";

export const CreateShpenzimetModal = () => {
   const { isOpen, onClose } = useCreateShpenzimetModal();

   return (
      <Modal
         title="Shto Shpenzim te ri"
         description=""
         isOpen={isOpen}
         onClose={onClose}
      >
         <CreateShpenzimetForm />
      </Modal>
   );
};
