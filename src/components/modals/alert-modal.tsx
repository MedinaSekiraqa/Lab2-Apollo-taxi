"use client";

import { useEffect, useState } from "react";
import { Modal } from "../ui/smallModal";
import { Button } from "../ui/button";

interface AlertModalProps {
   isOpen: boolean;
   onClose: () => void;
   onConfirm: () => void;
   loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
   isOpen,
   onClose,
   onConfirm,
   loading,
}) => {
   const [isMonuted, setIsMounted] = useState(false);

   useEffect(() => {
      setIsMounted(true);
   }, []);

   if (!isMonuted) {
      return null;
   }

   return (
      <Modal
         title="Jeni te sigurte?"
         description="Nuk ka kthim mbrapa"
         isOpen={isOpen}
         onClose={onClose}
      >
         <div className="pt-6 space-x-2 flex items-center justify-end w-full">
            <Button disabled={loading} variant="outline" onClick={onClose}>
               Jo Kthehu
            </Button>
            <Button
               disabled={loading}
               variant="destructive"
               onClick={onConfirm}
            >
               PO
            </Button>
         </div>
      </Modal>
   );
};
