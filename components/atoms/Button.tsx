import { useThemeColor } from "@/hooks/useThemeColor";
import React, { ReactNode, forwardRef } from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";
import TouchableOpacityHaptic from "./TouchableOpacityHaptic";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  variant?: "default" | "primary" | "secondary";
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
}

const Button = forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  (
    {
      title,
      iconLeft,
      iconRight,
      containerStyle,
      variant = "default",
      onPress: onPressProp,
      disabled,
      ...rest
    },
    ref
  ) => {
    const {
      background: themeBackground,
      buttonText: themeText,
      tint: themeTint,
    } = useThemeColor({}, ["background", "buttonText", "tint"]);

    // Simplified logic for background and text colors
    const buttonBackgroundColor =
      variant === "primary" ? themeTint : themeBackground;
    const buttonTextColor = variant === "secondary" ? themeTint : themeText;

    const finalButtonStyle = [
      styles.button,
      { backgroundColor: buttonBackgroundColor },
      containerStyle,
    ];

    return (
      <TouchableOpacityHaptic
        {...rest}
        ref={ref}
        style={finalButtonStyle}
        onPress={onPressProp}
        disabled={disabled}
        accessibilityLabel={rest.accessibilityLabel ?? title}
      >
        <View style={styles.contentContainer}>
          {iconLeft && <View style={styles.iconContainerLeft}>{iconLeft}</View>}
          <Text style={[styles.text, { color: buttonTextColor }]}>{title}</Text>
          {iconRight && (
            <View style={styles.iconContainerRight}>{iconRight}</View>
          )}
        </View>
      </TouchableOpacityHaptic>
    );
  }
);

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

Button.displayName = "Button";

export default Button;
