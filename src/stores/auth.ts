import { create } from "zustand";
import { produce, Draft } from "immer";
import { User, UserProfile } from "@types";

export interface AuthState {
  user?: User;
  profile?: UserProfile;
  isValidating: boolean;
  set: (cb: (state: Draft<AuthState>) => void) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: undefined,
  profile: undefined,
  isValidating: true,
  set: (cb: (state: Draft<AuthState>) => void) => {
    set(produce(cb));
  },
}));
