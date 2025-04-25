import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { Text as DefaultText, TextProps } from "react-native";

// Define props for the custom Text component, extending default TextProps
type ThemedTextProps = TextProps & {
  // Add any custom props specific to your themed text component if needed
  // Example: lightColor?: string; darkColor?: string;
};

const Text: React.FC<ThemedTextProps> = (props) => {
  const { style, ...otherProps } = props;
  const themeTextColor = useThemeColor({}, "text"); // Get the theme text color

  return (
    <DefaultText
      style={[{ color: themeTextColor }, style]} // Apply theme color and merge with incoming styles
      {...otherProps} // Pass down all other props
    />
  );
};

export default Text;
