import { create } from "zustand";

interface UseCreateRaportiShoferitModalStore {
   isOpen: boolean;
   onOpen: () => void;
   onClose: () => void;
}

export const useCreateRaportiShoferitModal = create<UseCreateRaportiShoferitModalStore>((set) => ({
   isOpen: false,
   onOpen: () => set({ isOpen: true }),
   onClose: () => set({ isOpen: false }),
}));
