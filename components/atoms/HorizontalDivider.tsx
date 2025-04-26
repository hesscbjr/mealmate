import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

type HorizontalDividerProps = {
  style?: ViewStyle;
};

const HorizontalDivider = ({ style }: HorizontalDividerProps) => {
  const dividerColor = useThemeColor({}, "divider");

  return (
    <View style={[styles.divider, { backgroundColor: dividerColor }, style]} />
  );
};

const styles = StyleSheet.create({
  divider: {
    height: StyleSheet.hairlineWidth,
    width: "100%",
  },
});

export default HorizontalDivider;
