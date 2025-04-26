import Text from "@/components/atoms/Text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemePreference } from "@/store/user";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

interface ThemePreferenceToggleProps {
  currentPreference: ThemePreference;
  onSetPreference: (preference: ThemePreference) => void;
}

const OPTIONS: ThemePreference[] = ["light", "dark", "system"];

const ThemePreferenceToggle: React.FC<ThemePreferenceToggleProps> = ({
  currentPreference,
  onSetPreference,
}) => {
  const {
    background: themeBackground,
    text: themeText,
    tint: themeTint,
    secondary: themeSecondary,
    buttonText: themeButtonText,
  } = useThemeColor({}, [
    "background",
    "text",
    "tint",
    "secondary",
    "buttonText",
  ]);

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-around",
      backgroundColor: themeSecondary, // Use secondary as background for the toggle
      borderRadius: 8,
      padding: 4,
    },
    optionButton: {
      flex: 1,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 6,
      alignItems: "center",
      marginHorizontal: 2, // Add slight margin between buttons
    },
    selectedOptionButton: {
      backgroundColor: themeTint, // Use tint for selected background
    },
    optionText: {
      fontWeight: "500",
      fontSize: 14,
      color: themeText, // Use default text color
    },
    selectedOptionText: {
      color: themeButtonText, // Use button text color for selected
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.container}>
      {OPTIONS.map((option) => (
        <Pressable
          key={option}
          style={[
            styles.optionButton,
            currentPreference === option && styles.selectedOptionButton,
          ]}
          onPress={() => onSetPreference(option)}
        >
          <Text
            style={[
              styles.optionText,
              currentPreference === option && styles.selectedOptionText,
            ]}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default ThemePreferenceToggle;
