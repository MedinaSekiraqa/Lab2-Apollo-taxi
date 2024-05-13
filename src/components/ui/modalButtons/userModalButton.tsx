"use client";

import { Button } from "../button";
import { PlusCircle } from "lucide-react";
import { useCreateUserModal } from "@/hooks/use-create-user-modal";

export default function UserModalButton() {
   const userModal = useCreateUserModal();

   return (
      <Button onClick={() => userModal.onOpen()}>
         <PlusCircle className="mr-3 p-1" /> Shto User te ri
      </Button>
   );
}
