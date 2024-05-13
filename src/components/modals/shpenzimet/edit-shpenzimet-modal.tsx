"use client";
import { Modal } from "../../ui/smallModal";
import { useEditShpenzimetModal } from "@/hooks/use-edit-shpenzimet-modal";
import EditShpenzimetForm from "@/components/forms/shpenzimet/editShpenzimetForm";

export const EditShpenzimetModal = () => {
   const { isOpen,  onClose } = useEditShpenzimetModal();
  
   return (
      <Modal
         title={ "Ndrysho shpenzimin"}
         description=""
         isOpen={isOpen}
         onClose={onClose}
      >
         <EditShpenzimetForm />
      </Modal>
   );
};
