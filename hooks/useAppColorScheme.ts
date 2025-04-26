import { ThemePreference, useUserStore } from "@/store/user";
import { useColorScheme as useNativeColorScheme } from "react-native";

/**
 * Determines the color scheme to use based on user preference or system setting.
 * Defaults to 'light' if the system has no preference and the user chose 'system'.
 */
export function useAppColorScheme(): NonNullable<ThemePreference> {
  const userPreference = useUserStore((state) => state.themePreference);
  const systemScheme = useNativeColorScheme();

  if (userPreference === "light" || userPreference === "dark") {
    return userPreference;
  }

  // If preference is 'system', use the system scheme, defaulting to 'light'
  return systemScheme ?? "light";
} 