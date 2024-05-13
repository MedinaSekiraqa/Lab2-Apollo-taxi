"use client";

import { Button } from "../button";
import { PlusCircle } from "lucide-react";
import { useCreateKategoriaShpenzimeveModal } from "@/hooks/use-create-kategoriaShepnzimeve-modal";

export default function KategoriaShpenzimeveModalButton() {
   const kategoriaShpenzimetModal = useCreateKategoriaShpenzimeveModal();

   return (
      <Button onClick={() => kategoriaShpenzimetModal.onOpen()}>
         <PlusCircle className="mr-3 p-1" /> Shto kategori te shpenzimeve
      </Button>
   );
}
