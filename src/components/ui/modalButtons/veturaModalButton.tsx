"use client";

import { useCreateVeturaModal } from "@/hooks/use-create-vetura-modal";
import { Button } from "../button";
import { PlusCircle } from "lucide-react";
//import { useCreateVeturaModal } from "@/components/ui/modals/useCreateVeturaModal";

export default function VeturaModalButton() {
   const veturaModal = useCreateVeturaModal();

   return (
      <Button onClick={() => veturaModal.onOpen()}>
         <PlusCircle className="mr-3 p-1" /> Shto Vetur te re
      </Button>
   );
}
