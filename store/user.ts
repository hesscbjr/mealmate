import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the possible sort preference values
export type RecipeSortPreference =
  | "max-used-ingredients"
  | "min-missing-ingredients";

interface UserState {
  firstName: string;
  lastName: string;
  dietaryRestrictions: string[];
  completedOnboarding: boolean;
  recipeSortPreference: RecipeSortPreference;
  setDietary: (diet: string[]) => void;
  markOnboardingComplete: () => void;
  setRecipeSortPreference: (preference: RecipeSortPreference) => void;
  setFullName: (firstName: string, lastName: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      firstName: "",
      lastName: "",
      dietaryRestrictions: [],
      completedOnboarding: false,
      recipeSortPreference: "max-used-ingredients",
      setDietary: (diet) => set({ dietaryRestrictions: diet }),
      markOnboardingComplete: () => set({ completedOnboarding: true }),
      setRecipeSortPreference: (preference) =>
        set({ recipeSortPreference: preference }),
      setFullName: (firstName, lastName) => set({ firstName, lastName }),
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