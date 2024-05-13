"use client";
import { Modal } from "../../ui/smallModal";
import { useEditKategoriaShpenzimeveModal } from "@/hooks/use-edit-kategoriaShepnzimeve-modal";
import EditKategoriaShpenzimeveForm from "@/components/forms/kategoritaShpenzimeve/editKategoriaShpenzimeveForm";

export const EditKategoriaShpenzimeveModal = () => {
   const { isOpen, onClose } = useEditKategoriaShpenzimeveModal();

   return (
      <Modal
         title={"Ndrysho kategorine e shpenzimeve"}
         description=""
         isOpen={isOpen}
         onClose={onClose}
      >
         <EditKategoriaShpenzimeveForm />
      </Modal>
   );
};
