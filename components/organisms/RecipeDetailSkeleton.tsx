import { useThemeColor } from "@/hooks/useThemeColor";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");

type RecipeDetailSkeletonProps = {
  // No props needed currently, but keeping type for consistency
};

const RecipeDetailSkeleton = (props: RecipeDetailSkeletonProps) => {
  const { text: skeletonHighlight, background: skeletonBackground } =
    useThemeColor({}, ["text", "background"]);

  const shimmerColor = skeletonHighlight + "1A";
  const shimmerWidth = 200;

  const translateXAnim = useRef(new Animated.Value(-shimmerWidth)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(translateXAnim, {
        toValue: screenWidth,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    animation.start();

    return () => {
      animation.stop();
    };
  }, [translateXAnim]);

  const animatedStyle = {
    transform: [{ translateX: translateXAnim }],
  };

  const shimmerGradientColors = [
    "transparent",
    shimmerColor,
    "transparent",
  ] as const;

  const SkeletonShape = ({
    shapeStyle,
  }: {
    shapeStyle: ViewStyle | ViewStyle[];
  }) => (
    <View
      style={[
        shapeStyle,
        { backgroundColor: skeletonBackground, overflow: "hidden" },
      ]}
    >
      <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
        <LinearGradient
          colors={shimmerGradientColors}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{ flex: 1, width: shimmerWidth }}
        />
      </Animated.View>
    </View>
  );

  return (
    <View
      style={[
        styles.skeletonOuterContainer,
        { backgroundColor: skeletonBackground },
      ]}
    >
      <SkeletonShape shapeStyle={styles.skeletonImage} />

      <View style={styles.skeletonContentPadding}>
        <SkeletonShape
          shapeStyle={[styles.skeletonTitle, { marginBottom: 12 }]}
        />
        <View style={styles.skeletonMetaRow}>
          <SkeletonShape shapeStyle={styles.skeletonMetaItem} />
          <SkeletonShape shapeStyle={styles.skeletonMetaItem} />
        </View>
        <SkeletonShape shapeStyle={[styles.skeletonLine, { width: "100%" }]} />
        <SkeletonShape
          shapeStyle={[styles.skeletonLine, { width: "85%", marginBottom: 20 }]}
        />
        <SkeletonShape
          shapeStyle={[styles.skeletonSectionTitle, { marginBottom: 12 }]}
        />
        <SkeletonShape shapeStyle={[styles.skeletonLine, { width: "70%" }]} />
        <SkeletonShape
          shapeStyle={[styles.skeletonLine, { width: "60%", marginBottom: 20 }]}
        />
        <SkeletonShape
          shapeStyle={[styles.skeletonSectionTitle, { marginBottom: 12 }]}
        />
        <SkeletonShape shapeStyle={[styles.skeletonLine, { width: "80%" }]} />
        <SkeletonShape shapeStyle={[styles.skeletonLine, { width: "75%" }]} />
      </View>
    </View>
  );
};

export default RecipeDetailSkeleton;

const styles = StyleSheet.create({
  skeletonOuterContainer: {
    flex: 1,
  },
  skeletonContentPadding: {
    padding: 15,
  },
  skeletonImage: {
    width: "100%",
    height: 250,
  },
  skeletonTitle: {
    height: 24,
    width: "70%",
    borderRadius: 4,
  },
  skeletonMetaRow: {
    flexDirection: "row",
    marginBottom: 15,
  },
  skeletonMetaItem: {
    height: 14,
    width: "30%",
    borderRadius: 4,
    marginRight: 15,
  },
  skeletonLine: {
    height: 14,
    borderRadius: 4,
    marginBottom: 8,
  },
  skeletonSectionTitle: {
    height: 20,
    width: "40%",
    borderRadius: 4,
  },
});
