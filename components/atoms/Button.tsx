import { useThemeColor } from "@/hooks/useThemeColor";
import React, { ReactNode } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  variant?: "default" | "primary" | "secondary";
  style?: StyleProp<ViewStyle>;
  activeOpacity?: number;
}

const Button = ({
  title,
  iconLeft,
  iconRight,
  style,
  variant = "default",
  activeOpacity = 0.7,
  ...rest
}: ButtonProps) => {
  const themeBackground = useThemeColor({}, "background");
  const themeText = useThemeColor({}, "text");
  const themeTint = useThemeColor({}, "tint");

  let buttonBackgroundColor: string;
  let buttonTextColor: string;

  switch (variant) {
    case "primary":
      buttonBackgroundColor = themeTint;
      buttonTextColor = themeBackground;
      break;
    case "secondary":
      buttonBackgroundColor = themeBackground;
      buttonTextColor = themeTint;
      break;
    case "default":
    default:
      buttonBackgroundColor = themeBackground;
      buttonTextColor = themeText;
      break;
  }

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: buttonBackgroundColor }, style]}
      activeOpacity={activeOpacity}
      {...rest}
    >
      <View style={styles.contentContainer}>
        {iconLeft && <View style={styles.iconContainerLeft}>{iconLeft}</View>}
        <Text style={[styles.text, { color: buttonTextColor }]}>{title}</Text>
        {iconRight && (
          <View style={styles.iconContainerRight}>{iconRight}</View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    flexDirection: "row",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainerLeft: {
    marginRight: 8,
  },
  iconContainerRight: {
    marginLeft: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Button;
