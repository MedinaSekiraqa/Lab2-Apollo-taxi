
import React, { useState } from "react";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { AlertModal } from "@/components/modals/alert-modal";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";




import { useCreateKategoriaShpenzimeveModal } from "@/hooks/use-create-kategoriaShepnzimeve-modal";


//import { useEditKategoriaShpenzimeveModal } from "@/hooks/use-edit-kategoriaShepnzimeve-modal";

import { deletevetura } from "@/utils/mutation";
import { Vetura } from "@/lib/type";
import { useEditVeturaModal } from "@/hooks/use-edit-vetura-modal";

interface CellActionProps {
   data: Vetura;
}

export const CellAction = ({ data }: CellActionProps) => {
   const [open, setOpen] = useState(false);
   const [loading, setLoading] = useState(false);
   const veturamodal = useEditVeturaModal();
   const {data:session} = useSession();
   const router = useRouter();
   const onCopy = (id: string) => {
      navigator.clipboard.writeText(id);
      toast.success("User Id copied to clipboard.");
   };
  

  const onEdit = () => {
    veturamodal.setVeturaData(data);
    veturamodal.onOpen();
  };

   const onDelete = async () => {
      try {
         setLoading(true);
         //@ts-ignore
         await deletevetura(data.id,session?.token?.accessToken);
         toast.success("Vetura eshte fshire me sukses!");
        
         setOpen(false)
         setLoading(false)
         router.refresh();
      } catch (error: any) {
         if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<any>;

            if (axiosError.response) {
               const status = axiosError.response.status;
               const errorMessage = axiosError.response.data.error;

               if (status === 401) {
                  toast.error(errorMessage);
               } else if (status === 403) {
                  toast.error(errorMessage);
               } else if (status === 404) {
                  toast.error(errorMessage);
               } else {
                  toast.error(errorMessage);
               }
            } else {
               toast.error("Network error: Unable to connect to the server.");
            }
         } else {
            toast.error(" An error occurred.");
         }
      } finally {
         setLoading(false);
         setOpen(false);
      }
   };
   return (
      <>
         <AlertModal
            isOpen={open}
            loading={loading}
            onClose={() => setOpen(false)}
            onConfirm={onDelete}
         />

         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open Menu</span>
                  <MoreHorizontal className="h-4 w-4" />
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
               <DropdownMenuLabel>Actions</DropdownMenuLabel>
               <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => onCopy(data.id!)}
               >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Id
               </DropdownMenuItem>
               <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => onEdit()}
               >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
               </DropdownMenuItem>
               <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => setOpen(true)}
               >
                  <Trash stroke="red" className="mr-2 h-4 w-4" />
                  <span className="text-red-600">Delete</span>
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      </>
   );
};
