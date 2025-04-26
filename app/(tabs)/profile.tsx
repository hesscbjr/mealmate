import Text from "@/components/atoms/Text";
import RecipeSortPreferenceToggle from "@/components/molecules/RecipeSortPreferenceToggle";
import { useThemeColor } from "@/hooks/useThemeColor";
import { RecipeSortPreference, useUserStore } from "@/store/user";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const themeBackground = useThemeColor({}, "background");

  const firstName = useUserStore((state) => state.firstName);
  const lastName = useUserStore((state) => state.lastName);
  const currentPreference = useUserStore((state) => state.recipeSortPreference);
  const setPreference = useUserStore((state) => state.setRecipeSortPreference);

  const handleSetPreference = (preference: RecipeSortPreference) => {
    setPreference(preference);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: themeBackground }]}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.nameText}>{`${firstName} ${lastName}`}</Text>

        <View style={styles.settingsSection}>
          <Text style={styles.settingLabel}>Recipe Recommendation Sorting</Text>
          <RecipeSortPreferenceToggle
            currentPreference={currentPreference}
            onSetPreference={handleSetPreference}
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
