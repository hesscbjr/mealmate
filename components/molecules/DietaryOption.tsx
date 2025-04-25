import Text from "@/components/atoms/Text";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";

interface DietaryOptionProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  style?: ViewStyle; // Allow passing additional styles
}

const DietaryOption: React.FC<DietaryOptionProps> = ({
  label,
  selected,
  onPress,
  style,
}) => {
  const theme = useThemeColor({}, "background"); // Just to get current theme mode
  const backgroundColor = useThemeColor(
    {
      light: selected ? Colors.light.tint : Colors.light.background,
      dark: selected ? Colors.dark.tint : Colors.dark.background,
    },
    "background" // Fallback, but props are provided
  );
  const textColor = selected
    ? theme === Colors.light.background // Check if light mode
      ? Colors.dark.text // Selected in light mode
      : Colors.light.text // Selected in dark mode
    : useThemeColor({}, "text"); // Use default theme text color when unselected
  const borderColor = useThemeColor(
    { light: Colors.light.tint, dark: Colors.dark.tint },
    "tint"
  );

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        { backgroundColor, borderColor },
        selected ? styles.selected : styles.unselected,
        style, // Apply additional styles passed via props
      ]}
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20, // Pill shape
    borderWidth: 1,
    margin: 4, // Spacing between pills
    alignItems: "center",
    justifyContent: "center",
  },
  selected: {
    // Specific styles for selected state if needed beyond background/text color
  },
  unselected: {
    // Border color handled by borderColor derived from useThemeColor
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default DietaryOption;
