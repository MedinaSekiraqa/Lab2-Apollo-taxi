import { create } from "zustand";

interface UseCreateVeturaModalStore {
   isOpen: boolean;
   onOpen: () => void;
   onClose: () => void;
}

export const useCreateVeturaModal = create<UseCreateVeturaModalStore>((set) => ({
   isOpen: false,
   onOpen: () => set({ isOpen: true }),
   onClose: () => set({ isOpen: false }),
}));
