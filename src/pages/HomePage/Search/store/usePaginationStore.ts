import { create, StateCreator } from "zustand";
import PaginationModel from "../models/Pagination.model.ts";
import { createJSONStorage, persist } from "zustand/middleware";

interface PaginationStoreProps {
  paginationBody: PaginationModel;
  setPaginationBody: (props: PaginationModel) => void;
  resetBody: () => void;
}

const initialData: PaginationModel = {
  startIndex: 0,
  count: 50,
  filter: {
    status: 0b000,
  },
};

const usePaginationCreator: StateCreator<PaginationStoreProps> = (set) => ({
  paginationBody: initialData,
  setPaginationBody: (paginationBody: PaginationModel) => {
    set({ paginationBody });
  },
  resetBody: () => {
    set({
      paginationBody: initialData,
    });
  },
});

export const usePaginationStore = create(
  persist<PaginationStoreProps>(usePaginationCreator, {
    name: "pagination-store",
    storage: createJSONStorage(() => sessionStorage),
  }),
);
