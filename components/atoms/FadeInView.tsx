import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, ViewStyle } from "react-native";

type FadeInViewProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  style?: ViewStyle;
};

const FadeInView = ({
  children,
  delay = 0,
  duration = 500,
  style,
}: FadeInViewProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, delay, duration]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }, style]}>
      {children}
    </Animated.View>
  );
};

export default FadeInView;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
});
