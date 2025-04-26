import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Define the possible sort preference values, these are used to tell spoonacular what to sort the recipes by
export type RecipeSortPreference =
  | "max-used-ingredients"
  | "min-missing-ingredients";

// Add Theme Preference Type
export type ThemePreference = "light" | "dark" | "system";

interface UserState {
  firstName: string;
  lastName: string;
  completedOnboarding: boolean;
  recipeSortPreference: RecipeSortPreference;
  themePreference: ThemePreference; 
  markOnboardingComplete: () => void;
  setRecipeSortPreference: (preference: RecipeSortPreference) => void;
  setThemePreference: (preference: ThemePreference) => void; 
  setFullName: (firstName: string, lastName: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      firstName: "",
      lastName: "",
      completedOnboarding: false,
      recipeSortPreference: "max-used-ingredients",
      themePreference: "system",
      markOnboardingComplete: () => set({ completedOnboarding: true }),
      setRecipeSortPreference: (preference) =>
        set({ recipeSortPreference: preference }),
      setThemePreference: (preference) => set({ themePreference: preference }),
      setFullName: (firstName, lastName) => set({ firstName, lastName }),
    }),
    {
      name: "mealmate:user",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
); 