import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "firebase/auth";

// Create a simpler user type for storage
interface SerializedUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface AppState {
  user: SerializedUser | null;
  setUser: (user: User | null) => void;
  isHydrated: boolean;
  setIsHydrated: (state: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      isHydrated: false,
      setUser: (user) =>
        set({
          user: user
            ? {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
              }
            : null,
        }),
      setIsHydrated: (state) => set({ isHydrated: state }),
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setIsHydrated(true);
      },
    }
  )
);
