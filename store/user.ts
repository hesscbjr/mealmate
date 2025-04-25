import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  name: string;
  dietaryRestrictions: string[];
  completedOnboarding: boolean;
  setName: (name: string) => void;
  setDietary: (diet: string[]) => void;
  markOnboardingComplete: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      name: "",
      dietaryRestrictions: [],
      completedOnboarding: false,
      setName: (name) => set({ name }),
      setDietary: (diet) => set({ dietaryRestrictions: diet }),
      markOnboardingComplete: () => set({ completedOnboarding: true }),
    }),
    {
      name: "mealmate:user",
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      },
    }
  )
); 