import React from "react";
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { ButtonProps } from "@/components/atoms/Button";
import Button from "@/components/atoms/Button";
import FadeInView from "@/components/atoms/FadeInView";
import type { IconProps } from "@/components/atoms/Icon";
import Icon from "@/components/atoms/Icon";
import Text from "@/components/atoms/Text";
import { useThemeColor } from "@/hooks/useThemeColor";

interface FullScreenMessageProps {
  /** The main title text to display. */
  title?: string;
  /** The secondary subtitle text to display. */
  subtitle?: string;
  /** Optional icon properties to display above the title. */
  iconProps?: IconProps;
  /** Show an ActivityIndicator instead of text/icon. */
  loading?: boolean;
  /** Props for the primary action button. If undefined, no button is shown. */
  buttonProps?: ButtonProps;
  /** Props for a secondary action button. If undefined, no secondary button is shown. */
  secondaryButtonProps?: ButtonProps;
  /** Whether to fade the content in. Defaults to true. */
  fadeIn?: boolean;
  /** Optional additional style for the container View. */
  containerStyle?: StyleProp<ViewStyle>;
  /** Delay for the fade-in animation (ms). Defaults to 400. */
  fadeInDelay?: number;
  /** Duration for the fade-in animation (ms). Defaults to 500. */
  fadeInDuration?: number;
}

const FADE_IN_DELAY_DEFAULT = 400;
const FADE_IN_DURATION_DEFAULT = 500;
const CONTAINER_PADDING = 20;
const ICON_MARGIN_BOTTOM = 15;
const TITLE_MARGIN_BOTTOM = 10;
const BUTTON_MARGIN_BOTTOM = 10;

export default function FullScreenMessage({
  title,
  subtitle,
  iconProps,
  loading = false,
  buttonProps,
  secondaryButtonProps,
  fadeIn = true,
  containerStyle,
  fadeInDelay = FADE_IN_DELAY_DEFAULT,
  fadeInDuration = FADE_IN_DURATION_DEFAULT,
}: FullScreenMessageProps) {
  const insets = useSafeAreaInsets();
  const themeBackgroundColor = useThemeColor({}, "background");
  const themeTextColor = useThemeColor({}, "text");
  const themeInfoTextColor = useThemeColor({}, "infoText");

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: CONTAINER_PADDING,
      backgroundColor: themeBackgroundColor,
      paddingTop: insets.top + CONTAINER_PADDING,
      paddingBottom: insets.bottom + CONTAINER_PADDING,
      paddingLeft: insets.left + CONTAINER_PADDING,
      paddingRight: insets.right + CONTAINER_PADDING,
    },
    icon: {
      marginBottom: ICON_MARGIN_BOTTOM,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
      color: themeTextColor,
      marginBottom: TITLE_MARGIN_BOTTOM,
    },
    subtitle: {
      fontSize: 16,
      textAlign: "center",
      color: themeInfoTextColor,
      marginBottom: buttonProps || secondaryButtonProps ? CONTAINER_PADDING : 0,
    },
    button: {
      marginBottom: BUTTON_MARGIN_BOTTOM,
      minWidth: "50%", // Give buttons a decent minimum width
      alignSelf: "stretch", // Make button stretch if content is narrow
      marginHorizontal: CONTAINER_PADDING, // Add horizontal margin
    },
    secondaryButton: {
      minWidth: "50%",
      alignSelf: "stretch",
      marginHorizontal: CONTAINER_PADDING,
    },
  });

  const content = (
    <View style={[styles.container, containerStyle]}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          {iconProps && (
            <Icon
              {...iconProps}
              style={[styles.icon, iconProps.style]}
              color={iconProps.color ?? themeTextColor} // Default color
            />
          )}
          {title && <Text style={styles.title}>{title}</Text>}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          {buttonProps && (
            <Button
              {...buttonProps}
              style={[styles.button, buttonProps.style]}
              variant={buttonProps.variant || "primary"} // Default variant
            />
          )}
          {secondaryButtonProps && (
            <Button
              {...secondaryButtonProps}
              style={[styles.secondaryButton, secondaryButtonProps.style]}
              variant={secondaryButtonProps.variant || "secondary"} // Default variant
            />
          )}
        </>
      )}
    </View>
  );

  if (fadeIn) {
    return (
      <FadeInView delay={fadeInDelay} duration={fadeInDuration}>
        {content}
      </FadeInView>
    );
  }

  return content;
}
