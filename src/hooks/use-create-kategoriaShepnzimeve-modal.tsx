import { create } from "zustand";

interface UseCreateKategoriaShpenzimeveModalStore {
   isOpen: boolean;
   kategoriaEShpenzimeveData: any;
   onOpen: () => void;
   onClose: () => void;
   setKategoriaEShpenzimeveData: (kategoriaEShpenzimeveData: any) => void;
}

export const useCreateKategoriaShpenzimeveModal = create<UseCreateKategoriaShpenzimeveModalStore>((set) => ({
   isOpen: false,
   kategoriaEShpenzimeveData: null,
   onOpen: () => set({ isOpen: true }),
   onClose: () => set({ isOpen: false }),
   setKategoriaEShpenzimeveData: (kategoriaEShpenzimeveData) => set({ kategoriaEShpenzimeveData }),
}));
