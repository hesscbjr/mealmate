import Button from "@/components/atoms/Button";
import Text from "@/components/atoms/Text";
import { RecipeSortPreference } from "@/store/user";
import React from "react";
import { StyleSheet, View } from "react-native";

interface RecipeSortPreferenceToggleProps {
  currentPreference: RecipeSortPreference;
  onSetPreference: (preference: RecipeSortPreference) => void;
}

const RecipeSortPreferenceToggle: React.FC<RecipeSortPreferenceToggleProps> = ({
  currentPreference,
  onSetPreference,
}) => {
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
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.dividerLine} />
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
    // Buttons stack vertically by default with the Button component's marginVertical
  },
  toggleButton: {
    // Add any specific styles for toggle buttons if needed
    // Example: make them full width
    // width: '100%',
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15, // Adjust spacing as needed
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc", // Or use a theme color
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#888", // Or use a theme color
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default RecipeSortPreferenceToggle;
