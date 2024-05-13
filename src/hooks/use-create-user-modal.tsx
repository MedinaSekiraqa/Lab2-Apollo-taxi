import { create } from "zustand";

interface UseCreateUserModalStore {
   isOpen: boolean;
   userData: any;
   onOpen: () => void;
   onClose: () => void;
   setUserData: (userData: any) => void; 
}

export const useCreateUserModal = create<UseCreateUserModalStore>((set) => ({
   isOpen: false,
   userData: null,
   onOpen: () => set({ isOpen: true }),
   onClose: () => set({ isOpen: false }),
   setUserData: (userData) => set({ userData }), // Define setUserData method
}));
