import { create } from "zustand";

interface UseEditShpenzimetModalStore {
   isOpen: boolean;
   shpenzimetData: any;
   onOpen: () => void;
   onClose: () => void;
   setShpenzimetData: (shpenzimetData: any) => void; 
}

export const useEditShpenzimetModal = create<UseEditShpenzimetModalStore>((set) => ({
   isOpen: false,
   shpenzimetData: null,
   onOpen: () => set({ isOpen: true }),
   onClose: () => set({ isOpen: false }),
   setShpenzimetData: (shpenzimetData) => set({ shpenzimetData }),
}));
