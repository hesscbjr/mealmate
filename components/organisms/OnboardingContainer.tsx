import { useThemeColor } from "@/hooks/useThemeColor";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Stagger from "../molecules/Stagger";

type OnboardingContainerProps = {
  children: React.ReactNode;
  style?: ViewStyle;
  staggerDelay?: number;
  parentDelay?: number;
};

const OnboardingContainer = ({
  children,
  style,
  staggerDelay = 150,
  parentDelay = 50,
}: OnboardingContainerProps) => {
  const backgroundGradientStart = useThemeColor({}, "backgroundGradientStart");
  const backgroundGradientEnd = useThemeColor({}, "backgroundGradientEnd");

  return (
    <LinearGradient
      colors={[backgroundGradientStart, backgroundGradientEnd]}
      locations={[0, 0.6]}
      style={[styles.gradientContainer, style]}
    >
      <View style={styles.contentContainer}>
        <Stagger
          parentDelay={parentDelay}
          stagger={staggerDelay}
          style={styles.staggerContainer}
        >
          {children}
        </Stagger>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingBottom: 80,
  },
  staggerContainer: {
    width: "100%",
    alignItems: "center",
  },
});

export default OnboardingContainer;
