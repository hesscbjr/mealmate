import Icon from "@/components/atoms/Icon"; // Added Icon import
import Text from "@/components/atoms/Text"; // Import custom Text atom
import TouchableOpacityHaptic from "@/components/atoms/TouchableOpacityHaptic";
import { useThemeColor } from "@/hooks/useThemeColor";
import { SpoonacularRecipe } from "@/services/spoonacular"; // Assuming the type is exported from here
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React, { useEffect, useRef } from "react"; // Added useRef, useEffect
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

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
const { width: screenWidth } = Dimensions.get("window"); // Renamed to avoid conflict

// Skeleton Component for loading state
const RecipeCardSkeleton = ({ style }: RecipeCardSkeletonProps) => {
  const { text: skeletonHighlight, background: skeletonBackground } =
    useThemeColor({}, ["text", "background"]);

  // Use a slightly transparent version of text for the highlight
  const shimmerColor = skeletonHighlight + "1A";
  const shimmerWidth = 200; // Width of the shimmer gradient

  // Animated value for the translateX transform
  const translateXAnim = useRef(new Animated.Value(-shimmerWidth)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(translateXAnim, {
        toValue: screenWidth, // Animate across the screen width
        duration: 1200, // Adjust duration as needed
        easing: Easing.linear,
        useNativeDriver: true, // Use native driver for performance
      })
    );
    animation.start();

    return () => {
      // Stop the animation when the component unmounts
      animation.stop();
    };
  }, [translateXAnim]);

  const animatedStyle = {
    transform: [{ translateX: translateXAnim }],
  };

  // Define the shimmer gradient colors
  const shimmerGradientColors = [
    "transparent", // Start transparent
    shimmerColor, // The highlight color
    "transparent", // End transparent
  ] as const;

  const finalOuterContainerStyle = [
    styles.outerContainer,
    { borderBottomColor: "transparent" },
    style,
  ];

  // Reusable component for skeleton shapes
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
          style={{ flex: 1, width: shimmerWidth }} // Gradient covers the animated view
        />
      </Animated.View>
    </View>
  );

  return (
    <View style={finalOuterContainerStyle}>
      <View style={styles.horizontalContainer}>
        {/* Left side - Image Placeholder */}
        <SkeletonShape shapeStyle={styles.skeletonImageWrapper} />

        {/* Right side - Text Placeholder */}
        <View style={styles.textContainer}>
          <SkeletonShape
            shapeStyle={[styles.skeletonTextBase, { width: "80%", height: 16 }]}
          />
          <SkeletonShape
            shapeStyle={[
              styles.skeletonTextBase,
              { width: "100%", height: 14 },
            ]}
          />
          <SkeletonShape
            shapeStyle={[styles.skeletonTextBase, { width: "90%", height: 14 }]}
          />
          <SkeletonShape
            shapeStyle={[
              styles.skeletonTextBase,
              { width: "50%", height: 12, marginTop: 4 },
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
    // overflow: 'hidden', // Moved to SkeletonShape
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  textContainer: {
    width: screenWidth - 145,
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
    // This style is no longer directly used for the gradient container
    // Kept for reference or potential future use, but effectively replaced by SkeletonShape
  },
  skeletonTextBase: {
    // Renamed from skeletonText and simplified
    borderRadius: 4,
    marginBottom: 8,
    // height and width are applied dynamically
    // overflow: 'hidden', // Moved to SkeletonShape
  },
  skeletonText: {
    // Removed as it's replaced by skeletonTextBase + dynamic styles
    // ... removed previous content ...
  },
  iconStyle: {
    marginRight: 4, // Add some space between icon and text
  },
});

export default RecipeCard;
