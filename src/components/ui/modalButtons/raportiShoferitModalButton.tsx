"use client";

import { useCreateRaportiShoferitModal } from "@/hooks/use-create-raporti-shoferit-modal";
import { Button } from "../button";
import { PlusCircle } from "lucide-react";

export default function RaportiShoferitModalButton() {
   const raportishoferitModal = useCreateRaportiShoferitModal();

   return (
      <Button onClick={() => raportishoferitModal.onOpen()}>
         <PlusCircle className="mr-3 p-1" /> Start
      </Button>
   );
}
