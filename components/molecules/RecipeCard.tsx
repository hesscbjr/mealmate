import Icon from "@/components/atoms/Icon"; // Added Icon import
import Text from "@/components/atoms/Text"; // Import custom Text atom
import TouchableOpacityHaptic from "@/components/atoms/TouchableOpacityHaptic";
import { useThemeColor } from "@/hooks/useThemeColor";
import { SpoonacularRecipe } from "@/services/spoonacular"; // Assuming the type is exported from here
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React from "react";
import { Dimensions, Image, StyleSheet, View, ViewStyle } from "react-native";

// Helper function to strip basic HTML tags
function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "");
}

interface RecipeCardProps {
  recipe?: SpoonacularRecipe; // Make recipe optional
  style?: ViewStyle | ViewStyle[]; // More specific type
  loading?: boolean; // Add loading prop
  // Add onPress or other interaction props if needed later
}

interface RecipeCardSkeletonProps {
  style?: ViewStyle | ViewStyle[]; // More specific type
}

// Get screen width for layout calculations
const { width } = Dimensions.get("window");

// Skeleton Component for loading state
const RecipeCardSkeleton = ({ style }: RecipeCardSkeletonProps) => {
  const { text: skeletonColor, background: skeletonBackground } = useThemeColor(
    {},
    ["text", "background"]
  );
  // Create slightly different shades for the gradient
  const gradientColor1 = skeletonBackground; // Use background as the base
  const gradientColor2 = skeletonColor + "1A"; // Use text color with low alpha for the shimmer

  const gradientColors = [
    gradientColor1,
    gradientColor2,
    gradientColor1,
  ] as const;

  const finalOuterContainerStyle = [
    styles.outerContainer,
    { borderBottomColor: "transparent" }, // Skeleton doesn't need a bottom border from theme
    style, // Apply external styles last
  ];

  return (
    <View style={finalOuterContainerStyle}>
      <View style={styles.horizontalContainer}>
        {/* Left side - Image Placeholder */}
        <View style={styles.skeletonImageWrapper}>
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0.5 }} // Horizontal gradient
            end={{ x: 1, y: 0.5 }}
            style={styles.skeletonImage}
          />
        </View>

        {/* Right side - Text Placeholder */}
        <View style={styles.textContainer}>
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={[styles.skeletonText, { width: "80%", height: 16 }]}
          />
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={[styles.skeletonText, { width: "100%", height: 14 }]}
          />
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={[styles.skeletonText, { width: "90%", height: 14 }]}
          />
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={[
              styles.skeletonText,
              {
                width: "50%",
                height: 12,
                marginTop: 4,
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const RecipeCard = ({ recipe, style, loading = false }: RecipeCardProps) => {
  const { icon: themeBorderColor, text: themeTextColor } = useThemeColor({}, [
    "icon",
    "text",
  ]);

  if (loading) {
    return <RecipeCardSkeleton style={style} />;
  }

  if (!recipe) {
    return null;
  }

  const hrefObject = {
    pathname: "/recipe/[id]" as const,
    params: {
      id: recipe.id.toString(),
      ...(recipe.missedIngredientCount && recipe.missedIngredientCount > 0
        ? { missedCount: recipe.missedIngredientCount.toString() }
        : {}),
    },
  };

  const finalOuterContainerStyle = [
    styles.outerContainer,
    { borderBottomColor: themeBorderColor },
    style,
  ];

  return (
    <Link href={hrefObject} asChild>
      <TouchableOpacityHaptic style={finalOuterContainerStyle}>
        <View style={styles.horizontalContainer}>
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: recipe.image }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          <View style={styles.textContainer}>
            <Text
              style={[styles.title, { color: themeTextColor }]}
              numberOfLines={1}
            >
              {recipe.title}
            </Text>
            <Text
              style={[styles.summary, { color: themeTextColor }]}
              numberOfLines={2}
            >
              {stripHtml(recipe.summary)}
            </Text>
            <Text style={[styles.details, { color: themeTextColor }]}>
              <Icon
                name="clockcircle"
                iconSet="antdesign"
                size={12}
                style={styles.iconStyle}
                color={themeTextColor}
              />{" "}
              {recipe.readyInMinutes} mins •{" "}
              <Icon
                name="utensils"
                size={12}
                style={styles.iconStyle}
                color={themeTextColor}
              />{" "}
              Serves {recipe.servings}
              {recipe.missedIngredientCount &&
              recipe.missedIngredientCount > 0 ? (
                <>
                  {" • "}
                  <Icon
                    name="shopping-cart"
                    size={12}
                    style={styles.iconStyle}
                    color={themeTextColor}
                  />{" "}
                  {recipe.missedIngredientCount} missing
                </>
              ) : (
                ""
              )}
            </Text>
            <View style={{ height: 36 }} />
          </View>
        </View>
      </TouchableOpacityHaptic>
    </Link>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: "100%",
    marginBottom: 24,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  horizontalContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  imageWrapper: {
    width: 100,
    height: 100,
    marginRight: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2.5,
    elevation: 3,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  skeletonImageWrapper: {
    width: 100,
    height: 100,
    marginRight: 15,
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  textContainer: {
    width: width - 145,
    flex: 0,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  summary: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 18,
  },
  details: {
    fontSize: 12,
    alignItems: "center", // Align icon and text vertically
  },
  skeletonImage: {
    width: "100%",
    height: 14,
    overflow: "hidden",
  },
  skeletonText: {
    borderRadius: 4,
    marginBottom: 8,
    height: 14,
    overflow: "hidden",
  },
  iconStyle: {
    marginRight: 4, // Add some space between icon and text
  },
});

export default RecipeCard;
