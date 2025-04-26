import Text from "@/components/atoms/Text"; // Import custom Text atom
import TouchableOpacityHaptic from "@/components/atoms/TouchableOpacityHaptic";
import { useThemeColor } from "@/hooks/useThemeColor";
import { SpoonacularRecipe } from "@/services/spoonacular"; // Assuming the type is exported from here
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";

// Helper function to strip basic HTML tags
function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "");
}

interface RecipeCardProps {
  recipe?: SpoonacularRecipe; // Make recipe optional
  style?: any; // Add style prop for custom styling
  loading?: boolean; // Add loading prop
  // Add onPress or other interaction props if needed later
}

// Get screen width for layout calculations
const { width } = Dimensions.get("window");
const textContainerWidth = width - 145; // Screen width minus image width, margins and padding

// Skeleton Component for loading state
const RecipeCardSkeleton: React.FC<{ style?: any }> = ({ style }) => {
  // Define gradient colors using const assertion for correct type
  const gradientColors = ["#EAEAEA", "#CDCDCD"] as const;

  return (
    <View
      style={[
        styles.outerContainer,
        style,
        { borderBottomColor: "transparent" },
      ]}
    >
      <View style={styles.horizontalContainer}>
        {/* Left side - Image Placeholder */}
        <View style={styles.imageWrapper}>
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.skeletonImage}
          />
        </View>

        {/* Right side - Text Placeholder */}
        <View style={styles.textContainer}>
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.skeletonText, { width: "80%", height: 16 }]}
          />
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.skeletonText, { width: "100%", height: 14 }]}
          />
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.skeletonText, { width: "90%", height: 14 }]}
          />
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
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

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  style,
  loading = false,
}) => {
  const themeBorderColor = useThemeColor({}, "icon"); // Use icon color for subtle border
  // const themePlaceholderColor = useThemeColor({}, "icon"); // Placeholder color handled in Skeleton component now

  // Render Skeleton if loading
  if (loading) {
    return <RecipeCardSkeleton style={style} />;
  }

  // If not loading, but no recipe, return null (or some error/empty state)
  if (!recipe) {
    return null; // Or handle appropriately
  }

  // Construct the href object with typed pathname and params
  const hrefObject = {
    pathname: "/recipe/[id]" as const, // Use the typed route string
    params: {
      id: recipe.id.toString(), // Ensure id is always present
      ...(recipe.missedIngredientCount && recipe.missedIngredientCount > 0
        ? { missedCount: recipe.missedIngredientCount.toString() }
        : {}),
    },
  };

  // Render actual card content if not loading and recipe exists
  return (
    <Link href={hrefObject} asChild>
      <TouchableOpacityHaptic
        style={[
          styles.outerContainer,
          style,
          { borderBottomColor: themeBorderColor },
        ]}
        activeOpacity={0.8} // Optional: adjust active opacity
      >
        <View style={styles.horizontalContainer}>
          {/* Left side - Image */}
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: recipe.image }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          {/* Right side - Text content */}
          <View style={styles.textContainer}>
            <Text
              style={styles.title} // Removed direct color styling
              numberOfLines={1}
            >
              {recipe.title}
            </Text>
            <Text
              style={styles.summary} // Removed direct color styling
              numberOfLines={2}
            >
              {stripHtml(recipe.summary)}
            </Text>
            <Text style={styles.details}>
              ⏱️ {recipe.readyInMinutes} mins • 🍽️ Serves {recipe.servings}
              {recipe.missedIngredientCount && recipe.missedIngredientCount > 0
                ? ` • 🛒 ${recipe.missedIngredientCount} missing`
                : ""}
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
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 8,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  textContainer: {
    width: width - 145, // Screen width minus image width, margins and padding
    flex: 0, // Don't let it flex
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  summary: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 18, // Improve readability
  },
  details: {
    fontSize: 12,
    // color: '#555', // Use theme color
  },
  // --- Skeleton Styles ---
  skeletonImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  skeletonText: {
    borderRadius: 4, // Slight rounding for text placeholders
    marginBottom: 8, // Spacing between skeleton lines
  },
});

export default RecipeCard;
