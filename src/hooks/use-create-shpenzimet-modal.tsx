import { create } from "zustand";

interface UseCreateShpenzimetModalStore {
   isOpen: boolean;
   shpenzimetData: any;
   onOpen: () => void;
   onClose: () => void;
   setShpenzimetData: (shpenzimetData: any) => void; 
}

export const useCreateShpenzimetModal = create<UseCreateShpenzimetModalStore>((set) => ({
   isOpen: false,
   shpenzimetData: null,
   onOpen: () => set({ isOpen: true }),
   onClose: () => set({ isOpen: false }),
   setShpenzimetData: (shpenzimetData) => set({ shpenzimetData }),
}));
