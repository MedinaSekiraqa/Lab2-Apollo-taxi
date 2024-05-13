"use client";

import { useCreateShpenzimetModal } from "@/hooks/use-create-shpenzimet-modal";
import { Button } from "../button";
import { PlusCircle } from "lucide-react";

export default function ShpenzimetModalButton() {
   const shpenzimetModal = useCreateShpenzimetModal();

   return (
      <Button onClick={() => shpenzimetModal.onOpen()}>
         <PlusCircle className="mr-3 p-1"/> Shto shpenzim te ri
      </Button>
   );
}
