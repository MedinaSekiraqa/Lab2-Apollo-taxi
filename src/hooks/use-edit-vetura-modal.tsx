import { create } from "zustand";

interface UseEditVeturaModalStore {
   isOpen: boolean;
   veturaData: any;
   onOpen: () => void;
   onClose: () => void;
   setVeturaData: (veturaData: any) => void; 
}

export const useEditVeturaModal = create<UseEditVeturaModalStore>((set) => ({
   isOpen: false,
   veturaData: null,
   onOpen: () => set({ isOpen: true }),
   onClose: () => set({ isOpen: false }),
   setVeturaData: (veturaData) => set({ veturaData }),
}));