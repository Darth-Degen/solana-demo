import { create } from "zustand";

interface ViewState {
  showView: boolean;
  setShowView: (value: boolean) => void;
  showModal: boolean,
  setShowModal: (value: boolean) => void,
}

export const useViewStore = create<ViewState>((set) => ({
  showView: false, // Initial state
  setShowView: (value: boolean) => set({ showView: value }), // Update state
  showModal: false,
  setShowModal: (value: boolean) => set({ showModal: value}),
}));
 