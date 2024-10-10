import { create, StateCreator } from "zustand";
import { Result } from "../models/Result.model.ts";

interface ListStoreProps {
  list: Result[];
  setList: (list: Result[]) => void;
  addList: (list: Result[]) => void;
}

export const useListCreator: StateCreator<ListStoreProps> = (set) => ({
  list: [],
  setList: (list: Result[]) => set({ list }),
  addList: (list: Result[]) =>
    set((state) => ({ list: [...state.list, ...list] })),
});

export const useListStore = create(useListCreator);
