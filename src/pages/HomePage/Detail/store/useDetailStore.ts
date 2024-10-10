import { create, StateCreator } from "zustand";
import Detail from "../models/Detail.model.ts";
import { Result } from "../../Search/models/Result.model.ts";

interface State {
  result: Result | null;
  detail: Detail | null;
  isPending: boolean;
  errorMessage: string | null;
}

interface Action {
  setResult: (result: Result | null) => void;
  setDetail: (detail: Detail | null) => void;
  setIsPending: (isPending: boolean) => void;
  setErrorMessage: (errorMessage: string | null) => void;
  reset: () => Promise<void>;
}

const useDetailCreator: StateCreator<State & Action> = (set) => ({
  result: null,
  detail: null,
  isPending: false,
  errorMessage: null,
  setResult: (result: Result | null) => set({ result }),
  setDetail: (detail: Detail | null) => set({ detail }),
  setIsPending: (isPending: boolean) => set({ isPending }),
  setErrorMessage: (errorMessage: string | null) => set({ errorMessage }),
  reset: async () =>
    set({ result: null, detail: null, isPending: false, errorMessage: null }),
});

const useDetailStore = create(useDetailCreator);

export default useDetailStore;
