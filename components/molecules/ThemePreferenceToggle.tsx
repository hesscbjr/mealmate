import Text from "@/components/atoms/Text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemePreference } from "@/store/user";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

type ThemePreferenceToggleProps = {
  currentPreference: ThemePreference;
  onSetPreference: (preference: ThemePreference) => void;
};

const OPTIONS: ThemePreference[] = ["light", "dark", "system"];

const ThemePreferenceToggle = ({
  currentPreference,
  onSetPreference,
}: ThemePreferenceToggleProps) => {
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

  return (
    <View style={[styles.container, { backgroundColor: themeSecondary }]}>
      {OPTIONS.map((option) => {
        const isSelected = currentPreference === option;
        return (
          <Pressable
            key={option}
            style={[
              styles.optionButton,
              isSelected && { backgroundColor: themeTint },
            ]}
            onPress={() => onSetPreference(option)}
          >
            <Text
              style={[
                styles.optionText,
                { color: isSelected ? themeButtonText : themeText },
                isSelected && styles.selectedOptionText,
              ]}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default ThemePreferenceToggle;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 8,
    padding: 4,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
    alignItems: "center",
    marginHorizontal: 2,
  },
  optionText: {
    fontWeight: "500",
    fontSize: 14,
  },
  selectedOptionText: {
    fontWeight: "bold",
  },
});
