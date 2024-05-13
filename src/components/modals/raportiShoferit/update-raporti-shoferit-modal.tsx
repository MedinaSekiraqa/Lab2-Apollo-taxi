
"use client";
import { Modal } from "../../ui/smallModal";
import { z } from "zod";
import { updateRaportiShoferitSchema } from "@/lib/schemas";
import { RaportiShoferit } from "@/lib/type";
import { useUpdateRaportiShoferitModal } from "@/hooks/use-update-raporti-shoferit-modal";
import UpdateRaportiShoferitForm from "@/components/forms/raportiShoferit/updateRaportiShoferitForm";

type FormValues = z.infer<typeof updateRaportiShoferitSchema>;
type RaportiShoferitFormProps = {
   onSuccess?: () => void;
   raportiShoferit?: RaportiShoferit;
};

export function UpdateRaportiShoferitModal({
   raportiShoferit,
}: RaportiShoferitFormProps) {
   const { isOpen, onClose } = useUpdateRaportiShoferitModal();

   return (
      <Modal
         title="Raporti ditor"
         description=""
         isOpen={isOpen}
         onClose={onClose}
      >
         <UpdateRaportiShoferitForm />
      </Modal>
   );
}