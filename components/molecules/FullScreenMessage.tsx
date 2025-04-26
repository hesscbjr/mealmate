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
  title?: string;
  subtitle?: string;
  iconProps?: IconProps;
  loading?: boolean;
  buttonProps?: ButtonProps;
  secondaryButtonProps?: ButtonProps;
  fadeIn?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  fadeInDelay?: number;
  fadeInDuration?: number;
}

const FADE_IN_DELAY_DEFAULT = 400;
const FADE_IN_DURATION_DEFAULT = 500;
const CONTAINER_PADDING = 20;
const ICON_MARGIN_BOTTOM = 15;
const TITLE_MARGIN_BOTTOM = 10;
const BUTTON_MARGIN_BOTTOM = 10;

const FullScreenMessage = ({
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
}: FullScreenMessageProps) => {
  const insets = useSafeAreaInsets();
  const {
    background: themeBackgroundColor,
    text: themeTextColor,
    infoText: themeInfoTextColor,
  } = useThemeColor({}, ["background", "text", "infoText"]);

  const content = (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeBackgroundColor,
          paddingTop: insets.top + CONTAINER_PADDING,
          paddingBottom: insets.bottom + CONTAINER_PADDING,
          paddingLeft: insets.left + CONTAINER_PADDING,
          paddingRight: insets.right + CONTAINER_PADDING,
        },
        containerStyle,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="large" color={themeTextColor} />
      ) : (
        <>
          {iconProps && (
            <Icon
              {...iconProps}
              style={[styles.icon, iconProps.style]}
              color={iconProps.color ?? themeTextColor}
            />
          )}
          {title && (
            <Text style={[styles.title, { color: themeTextColor }]}>
              {title}
            </Text>
          )}
          {subtitle && (
            <Text
              style={[
                styles.subtitle,
                {
                  color: themeInfoTextColor,
                  marginBottom:
                    buttonProps || secondaryButtonProps ? CONTAINER_PADDING : 0,
                },
              ]}
            >
              {subtitle}
            </Text>
          )}
          {buttonProps && (
            <Button
              {...buttonProps}
              style={[styles.button, buttonProps.style]}
              variant={buttonProps.variant || "primary"}
            />
          )}
          {secondaryButtonProps && (
            <Button
              {...secondaryButtonProps}
              style={[styles.secondaryButton, secondaryButtonProps.style]}
              variant={secondaryButtonProps.variant || "secondary"}
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
};

export default FullScreenMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: CONTAINER_PADDING,
  },
  icon: {
    marginBottom: ICON_MARGIN_BOTTOM,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: TITLE_MARGIN_BOTTOM,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
  },
  button: {
    marginBottom: BUTTON_MARGIN_BOTTOM,
    minWidth: "50%",
    alignSelf: "stretch",
    marginHorizontal: CONTAINER_PADDING,
  },
  secondaryButton: {
    minWidth: "50%",
    alignSelf: "stretch",
    marginHorizontal: CONTAINER_PADDING,
  },
});
