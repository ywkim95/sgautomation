import { create, StateCreator } from "zustand";

interface State {
  isMobile: boolean;
}

interface Action {
  setMobile: (isMobile: boolean) => void;
}

const useCheckMobileCreator: StateCreator<State & Action> = (set) => ({
  isMobile: false,
  setMobile: (isMobile) => set({ isMobile }),
});

const useCheckMobileStore = create(useCheckMobileCreator);

export default useCheckMobileStore;
