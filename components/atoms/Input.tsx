import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useMemo } from "react";
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

const Input = React.forwardRef<TextInput, InputProps>(
  (
    { label, inputStyle, containerStyle, labelStyle, ...rest },
    ref // Receive the ref
  ) => {
    // Destructure style from rest and ignore it to prevent collision
    const { style, ...restProps } = rest;

    const themeBackground = useThemeColor({}, "background");
    const themeText = useThemeColor({}, "text");
    const themeBorder = useThemeColor({}, "icon"); // Using 'icon' for border/subtle elements seems consistent
    // Derive placeholder color from text color with opacity
    const placeholderColor = themeText + "80"; // '80' hex suffix for ~50% opacity

    // Memoize the TextInput style object
    const textInputComputedStyle = useMemo(
      () => [
        styles.input,
        {
          backgroundColor: themeBackground,
          color: themeText,
          borderColor: themeBorder,
        },
        inputStyle, // Apply passed inputStyle last
      ],
      [themeBackground, themeText, themeBorder, inputStyle]
    );

    return (
      <View style={[styles.container, containerStyle]}>
        {label && (
          <Text style={[styles.label, { color: themeText }, labelStyle]}>
            {label}
          </Text>
        )}
        <TextInput
          ref={ref} // Pass the ref to the TextInput
          style={textInputComputedStyle} // Use the memoized style
          placeholderTextColor={placeholderColor} // Use derived placeholder color
          {...restProps} // Pass down remaining TextInput props
        />
      </View>
    );
  }
);

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
    height: 48, // Add fixed height to prevent resizing
  },
});

export default Input;
