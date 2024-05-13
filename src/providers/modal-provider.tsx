"use client";

import { useEffect, useState } from "react";
import { CreateUserModal } from "@/components/modals/user/create-user-modal";
import { CreateKategoriaShpenzimeveModal } from "@/components/modals/kategoriaShpenzimeve/create-kategoria-shpenzimeve-modal";
import { CreateShpenzimetModal } from "@/components/modals/shpenzimet/create-shpenzimet-modal";
import { CreateVeturaModal } from "@/components/modals/veturat/create-vetura-modal";
import { CreateRaportiShoferitModal } from "@/components/modals/raportiShoferit/create-raporti-shoferit-modal";
import { UpdateRaportiShoferitModal } from "@/components/modals/raportiShoferit/update-raporti-shoferit-modal";
import { Edit } from "lucide-react";
import { EditKategoriaShpenzimeveModal } from "@/components/modals/kategoriaShpenzimeve/edit-kategoria-shpenzimeve-modals";
import { EditShpenzimetModal } from "@/components/modals/shpenzimet/edit-shpenzimet-modal";
import { EditVeturaModal } from "@/components/modals/veturat/edit-vetura-modal";

export const ModalProvider = () => {
   const [isMounted, setIsMounted] = useState(false);

   useEffect(() => {
      setIsMounted(true);
   }, []);

   if (!isMounted) {
      return null;
   }

   return (
      <>
         <div>
            <CreateUserModal />
            <CreateKategoriaShpenzimeveModal />
            <CreateShpenzimetModal />
            <CreateRaportiShoferitModal />
            <CreateVeturaModal />  
            <UpdateRaportiShoferitModal   />
            <EditKategoriaShpenzimeveModal />
            <EditShpenzimetModal/>
            <EditVeturaModal/>
         </div> 
      </>
   );
};
