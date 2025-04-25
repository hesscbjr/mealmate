import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>; // Allow overriding input style directly
}

const Input = ({
  label,
  style, // Rename to inputStyle for clarity if preferred, but 'style' is conventional for the main element
  containerStyle,
  labelStyle,
  ...rest
}: InputProps) => {
  const themeBackground = useThemeColor({}, "background");
  const themeText = useThemeColor({}, "text");
  const themeBorder = useThemeColor({}, "icon"); // Using 'icon' for border/subtle elements seems consistent
  const themePlaceholder = useThemeColor({}, "icon"); // Use 'icon' color for placeholder

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, { color: themeText }, labelStyle]}>
          {label}
        </Text>
      )}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: themeBackground, // Match background for subtlety or use a slightly different shade if needed
            color: themeText,
            borderColor: themeBorder,
          },
          style, // Apply passed styles last
        ]}
        placeholderTextColor={themePlaceholder}
        {...rest} // Pass down other TextInput props
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15, // Add some space below the input
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
});

export default Input;
