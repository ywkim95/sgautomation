import User from "../models/user.model.ts";
import { create, StateCreator } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type UserStoreProps = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const useUserStoreCreator: StateCreator<UserStoreProps> = (set) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
});

export const useUserStore = create(
  persist<UserStoreProps>(useUserStoreCreator, {
    name: "user-store",
    storage: createJSONStorage(() => sessionStorage),
  }),
);
