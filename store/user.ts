import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the possible sort preference values
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
  themePreference: ThemePreference; // Add state variable
  markOnboardingComplete: () => void;
  setRecipeSortPreference: (preference: RecipeSortPreference) => void;
  setThemePreference: (preference: ThemePreference) => void; // Add setter action type
  setFullName: (firstName: string, lastName: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      firstName: "",
      lastName: "",
      completedOnboarding: false,
      recipeSortPreference: "max-used-ingredients",
      themePreference: "system", // Default to system preference
      markOnboardingComplete: () => set({ completedOnboarding: true }),
      setRecipeSortPreference: (preference) =>
        set({ recipeSortPreference: preference }),
      setThemePreference: (preference) => set({ themePreference: preference }), // Add setter implementation
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