import Button from "@/components/atoms/Button";
import Text from "@/components/atoms/Text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { RecipeSortPreference } from "@/store/user";
import React from "react";
import { StyleSheet, View } from "react-native";

type RecipeSortPreferenceToggleProps = {
  currentPreference: RecipeSortPreference;
  onSetPreference: (preference: RecipeSortPreference) => void;
};

const RecipeSortPreferenceToggle = ({
  currentPreference,
  onSetPreference,
}: RecipeSortPreferenceToggleProps) => {
  const { secondary: themeSecondary, text: themeText } = useThemeColor({}, [
    "secondary",
    "text",
  ]);

  return (
    <View style={styles.toggleContainer}>
      <Button
        title="Maximize Used Ingredients"
        onPress={() => onSetPreference("max-used-ingredients")}
        variant={
          currentPreference === "max-used-ingredients" ? "primary" : "secondary"
        }
        style={styles.toggleButton}
      />
      <View style={styles.dividerContainer}>
        <View
          style={[styles.dividerLine, { backgroundColor: themeSecondary }]}
        />
        <Text style={[styles.dividerText, { color: themeText }]}>OR</Text>
        <View
          style={[styles.dividerLine, { backgroundColor: themeSecondary }]}
        />
      </View>
      <Button
        title="Minimize Missing Ingredients"
        onPress={() => onSetPreference("min-missing-ingredients")}
        variant={
          currentPreference === "min-missing-ingredients"
            ? "primary"
            : "secondary"
        }
        style={styles.toggleButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    // Container styles if needed, otherwise rely on parent layout
  },
  toggleButton: {
    // Static button adjustments if needed
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 12,
    fontWeight: "bold",
    opacity: 0.6,
  },
});

export default RecipeSortPreferenceToggle;
