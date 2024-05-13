"use client";
import { Modal } from "../../ui/smallModal";
import { useCreateKategoriaShpenzimeveModal } from "@/hooks/use-create-kategoriaShepnzimeve-modal";
import CreateKategoriaShpenzimeveForm from "@/components/forms/kategoritaShpenzimeve/createKategoriaShpenzimeveForm";

export const CreateKategoriaShpenzimeveModal = () => {
   const { isOpen, onClose } = useCreateKategoriaShpenzimeveModal();

   return (
      <Modal
         title={"Shto kategori te shpenzimeve"}
         description=""
         isOpen={isOpen}
         onClose={onClose}
      >
         <CreateKategoriaShpenzimeveForm />
      </Modal>
   );
};
