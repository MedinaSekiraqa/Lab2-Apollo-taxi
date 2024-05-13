import { create } from "zustand";

interface UseEditKategoriaShpenzimeveModalStore {
   isOpen: boolean;
   kategoriaEShpenzimeveData: any;
   onOpen: () => void;
   onClose: () => void;
   setKategoriaEShpenzimeveData: (kategoriaEShpenzimeveData: any) => void;
}

export const useEditKategoriaShpenzimeveModal = create<UseEditKategoriaShpenzimeveModalStore>((set) => ({
   isOpen: false,
   kategoriaEShpenzimeveData: null,
   onOpen: () => set({ isOpen: true }),
   onClose: () => set({ isOpen: false }),
   setKategoriaEShpenzimeveData: (kategoriaEShpenzimeveData) => set({ kategoriaEShpenzimeveData }),
}));
