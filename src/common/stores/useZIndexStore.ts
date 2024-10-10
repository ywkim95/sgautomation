import { StateCreator, create } from "zustand";

interface ZIndexStoreProps {
  isZIndexZero: boolean;
  toggleZIndexZero: () => void;
  setIndexZero: (isZIndexZero: boolean) => void;
}

const useZIndexCreator: StateCreator<ZIndexStoreProps> = (set) => ({
  isZIndexZero: false,
  toggleZIndexZero: () =>
    set((state) => ({ isZIndexZero: !state.isZIndexZero })),
  setIndexZero: (isZIndexZero) => set({ isZIndexZero }),
});

const useZIndexStore = create(useZIndexCreator);

export default useZIndexStore;
