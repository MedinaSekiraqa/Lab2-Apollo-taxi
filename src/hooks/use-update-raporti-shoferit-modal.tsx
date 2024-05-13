
import { RaportiShoferit } from "@/lib/type";
import { create } from "zustand";

interface UseUpdateRaportiShoferitModalStore {
   isOpen: boolean;
   data: any;
   onOpen: () => void;
   onClose: () => void;
   setData: (data: RaportiShoferit) => void;
}

export const useUpdateRaportiShoferitModal = create<UseUpdateRaportiShoferitModalStore>((set) => ({
   isOpen: false,
   data: null,
   onOpen: () => set({ isOpen: true }),
   onClose: () => set({ isOpen: false }),
   setData: (data) => set({ data }),
}));