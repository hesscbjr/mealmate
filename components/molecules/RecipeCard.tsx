import { useThemeColor } from "@/hooks/useThemeColor";
import { SpoonacularRecipe } from "@/services/spoonacular"; // Assuming the type is exported from here
import { Link } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

// Helper function to strip basic HTML tags
function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "");
}

interface RecipeCardProps {
  recipe: SpoonacularRecipe;
  style?: any; // Add style prop for custom styling
  // Add onPress or other interaction props if needed later
}

// Get screen width for layout calculations
const { width } = Dimensions.get("window");

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, style }) => {
  const themeTextColor = useThemeColor({}, "text");
  const themeBorderColor = useThemeColor({}, "icon"); // Use icon color for subtle border

  // Correctly link to the dynamic recipe route
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
              style={[styles.title, { color: themeTextColor }]}
              numberOfLines={1}
            >
              {recipe.title}
            </Text>
            <Text
              style={[styles.summary, { color: themeTextColor }]}
              numberOfLines={3}
            >
              {stripHtml(recipe.summary)}
            </Text>
            <Text style={[styles.details, { color: themeTextColor }]}>
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
});

export default RecipeCard;
