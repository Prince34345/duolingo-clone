import { create } from "zustand";

type PracitceModalState = {
    isOpen: boolean;
    open: () => void;
    close: () => void
}

export const usePracticeModal = create<PracitceModalState>((set) => ({
    isOpen: false,
    open: () => set({isOpen: true}),
    close: () => set({isOpen: false})
}))