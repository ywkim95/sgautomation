import { StateCreator, create } from "zustand";

interface FoldState {
  isFold: boolean;
  toggleFold: () => void;
  setFold: (isFold: boolean) => void;
}

const useFoldStateCreator: StateCreator<FoldState> = (set) => ({
  isFold: false,
  toggleFold: () => set((state) => ({ isFold: !state.isFold })),
  setFold: (isFold) => set({ isFold }),
});

const useFoldStateStore = create(useFoldStateCreator);

export default useFoldStateStore;
