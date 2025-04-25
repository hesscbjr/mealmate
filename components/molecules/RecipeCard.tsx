import Text from "@/components/atoms/Text"; // Import custom Text atom
import { useThemeColor } from "@/hooks/useThemeColor";
import { SpoonacularRecipe } from "@/services/spoonacular"; // Assuming the type is exported from here
import { Link } from "expo-router";
import React from "react";
import { Dimensions, Image, Pressable, StyleSheet, View } from "react-native";

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
  const placeholderColor = "#E0E0E0"; // Use a standard light grey for placeholders

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
          <View
            style={[
              styles.skeletonImage,
              { backgroundColor: placeholderColor },
            ]}
          />
        </View>

        {/* Right side - Text Placeholder */}
        <View style={styles.textContainer}>
          <View
            style={[
              styles.skeletonText,
              { width: "80%", height: 16, backgroundColor: placeholderColor },
            ]}
          />
          <View
            style={[
              styles.skeletonText,
              { width: "100%", height: 14, backgroundColor: placeholderColor },
            ]}
          />
          <View
            style={[
              styles.skeletonText,
              { width: "90%", height: 14, backgroundColor: placeholderColor },
            ]}
          />
          <View
            style={[
              styles.skeletonText,
              {
                width: "50%",
                height: 12,
                marginTop: 4,
                backgroundColor: placeholderColor,
              },
            ]}
          />
          {/* Removed unnecessary empty View */}
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

  // Render actual card content if not loading and recipe exists
  return (
    <Link href={`/recipe/${recipe.id}`} asChild>
      <Pressable
        style={[
          styles.outerContainer,
          style,
          { borderBottomColor: themeBorderColor },
        ]}
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
              numberOfLines={3}
            >
              {stripHtml(recipe.summary)}
            </Text>
            <Text style={styles.details}>
              ⏱️ {recipe.readyInMinutes} mins • 🍽️ Serves {recipe.servings}
            </Text>
            <View style={{ height: 20 }} />
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: "100%",
    padding: 10,
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
