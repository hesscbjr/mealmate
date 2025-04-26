import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";

type RecipeDetailSkeletonProps = {
  themeBackgroundColor: string;
};

const gradientColors = ["#EAEAEA", "#CDCDCD"] as const;

const RecipeDetailSkeleton = ({
  themeBackgroundColor,
}: RecipeDetailSkeletonProps) => {
  return (
    <View
      style={[
        styles.skeletonOuterContainer,
        { backgroundColor: themeBackgroundColor },
      ]}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.skeletonImage}
      />
      <View style={styles.skeletonContentPadding}>
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.skeletonTitle, { marginBottom: 12 }]}
        />
        <View style={styles.skeletonMetaRow}>
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.skeletonMetaItem}
          />
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.skeletonMetaItem}
          />
        </View>
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.skeletonLine, { width: "100%" }]}
        />
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.skeletonLine, { width: "85%", marginBottom: 20 }]}
        />
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.skeletonSectionTitle, { marginBottom: 12 }]}
        />
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.skeletonLine, { width: "70%" }]}
        />
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.skeletonLine, { width: "60%", marginBottom: 20 }]}
        />
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.skeletonSectionTitle, { marginBottom: 12 }]}
        />
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.skeletonLine, { width: "80%" }]}
        />
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.skeletonLine, { width: "75%" }]}
        />
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
