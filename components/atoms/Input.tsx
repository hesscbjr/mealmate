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
  inputStyle?: StyleProp<TextStyle>;
}

const Input = React.forwardRef<TextInput, InputProps>(
  ({ label, inputStyle, containerStyle, labelStyle, ...rest }, ref) => {
    const {
      background: themeBackground,
      text: themeText,
      icon: themeBorder,
    } = useThemeColor({}, ["background", "text", "icon"]);

    // Add 80 to placeholder color to make it lighter
    const placeholderColor = themeText + "80";

    const finalInputStyle = useMemo(
      () => [
        styles.input,
        {
          backgroundColor: themeBackground,
          color: themeText,
          borderColor: themeBorder,
        },
        inputStyle,
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
          ref={ref}
          style={finalInputStyle}
          placeholderTextColor={placeholderColor}
          {...rest}
        />
      </View>
    );
  }
);

Input.displayName = "Input";

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
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
    height: 48,
  },
});

export default Input;
