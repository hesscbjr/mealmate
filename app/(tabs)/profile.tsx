import Text from "@/components/atoms/Text";
import RecipeSortPreferenceToggle from "@/components/molecules/RecipeSortPreferenceToggle";
import ThemePreferenceToggle from "@/components/molecules/ThemePreferenceToggle";
import { useThemeColor } from "@/hooks/useThemeColor";
import {
  RecipeSortPreference,
  ThemePreference,
  useUserStore,
} from "@/store/user";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import switchTheme from "react-native-theme-switch-animation";

export default function ProfileScreen() {
  const themeBackground = useThemeColor({}, "background");

  const firstName = useUserStore((state) => state.firstName);
  const lastName = useUserStore((state) => state.lastName);
  const currentSortPreference = useUserStore(
    (state) => state.recipeSortPreference
  );
  const setSortPreference = useUserStore(
    (state) => state.setRecipeSortPreference
  );
  const currentThemePreference = useUserStore((state) => state.themePreference);
  const setThemePreference = useUserStore((state) => state.setThemePreference);

  const handleSetSortPreference = (preference: RecipeSortPreference) => {
    setSortPreference(preference);
  };

  const handleSetThemePreference = (preference: ThemePreference) => {
    switchTheme({
      switchThemeFunction: () => {
        setThemePreference(preference);
      },
      animationConfig: {
        type: "fade",
        duration: 300,
      },
    });
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: themeBackground }]}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.nameText}>{`${firstName} ${lastName}`}</Text>

        <View style={styles.settingsSection}>
          <Text style={styles.settingLabel}>Appearance</Text>
          <ThemePreferenceToggle
            currentPreference={currentThemePreference}
            onSetPreference={handleSetThemePreference}
          />
        </View>

        <View style={styles.settingsSection}>
          <Text style={styles.settingLabel}>Recipe Recommendation Sorting</Text>
          <RecipeSortPreferenceToggle
            currentPreference={currentSortPreference}
            onSetPreference={handleSetSortPreference}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  nameText: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },
  settingsSection: {
    marginBottom: 30,
  },
  settingLabel: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },
});
