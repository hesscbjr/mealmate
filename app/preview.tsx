import RecipeList from "@/components/organisms/RecipeList";
import { useIngredientExtraction } from "@/hooks/useIngredientExtraction";
import { useRecipeSuggestions } from "@/hooks/useRecipeSuggestions";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Loading messages for ingredients
const ingredientLoadingMessages = [
  "Squinting at your fridge contents... 👀🧅",
  "Consulting the culinary oracle... 🔮🥕",
  "Detecting rogue vegetables... 🥦🚨",
  "Analyzing pixels for deliciousness... 📸😋",
  "Is that... cilantro or parsley? 🤔🌿",
];

// Loading messages for recipes
const recipeLoadingMessages = [
  "Mixing ingredients in the digital cauldron... 🥣✨",
  "Asking the chef AI for inspiration... 🧑‍🍳🤖",
  "Preheating the suggestion oven... 🔥📜",
  "Simmering recipe ideas... 🍲🤔",
  "Plating up some tasty options... 🍽️😋",
];

export default function PreviewScreen() {
  const { imageUri } = useLocalSearchParams<{ imageUri: string }>();
  const themeBackgroundColor = useThemeColor({}, "background");
  const themeTextColor = useThemeColor({}, "text");
  const themeTintColor = useThemeColor({}, "tint");

  // State for cycling loading messages
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [currentLoadingMessages, setCurrentLoadingMessages] = useState(
    ingredientLoadingMessages
  );

  // --- Hooks ---
  // 1. Extract Ingredients
  const {
    data: ingredientData,
    loading: ingredientLoading,
    error: ingredientError,
  } = useIngredientExtraction(imageUri);

  // 2. Fetch Recipes (only if ingredients are successfully extracted)
  const {
    recipes,
    loading: recipeLoading,
    error: recipeError,
  } = useRecipeSuggestions(
    ingredientData && ingredientData.ingredients.length > 0
      ? ingredientData.ingredients
      : null
  );

  // Effect to cycle through loading messages
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    const isLoading = ingredientLoading || recipeLoading;

    // Set the correct message array based on which step is loading
    if (ingredientLoading) {
      setCurrentLoadingMessages(ingredientLoadingMessages);
    } else if (recipeLoading) {
      setCurrentLoadingMessages(recipeLoadingMessages);
    }

    if (isLoading) {
      intervalId = setInterval(() => {
        setLoadingMessageIndex(
          (prevIndex) => (prevIndex + 1) % currentLoadingMessages.length
        );
      }, 2000); // Change message every 2 seconds
    } else {
      // Reset index when loading stops
      setLoadingMessageIndex(0);
    }

    // Cleanup interval on unmount or when loading stops
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
    // Depend on both loading states and the message array itself to restart interval if messages change
  }, [ingredientLoading, recipeLoading, currentLoadingMessages]);

  if (!imageUri) {
    // Handle the case where the URI is missing
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: themeBackgroundColor }]}
      >
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: themeTextColor }]}>
            No image URI provided.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const renderIngredientContent = () => {
    if (ingredientLoading) {
      return (
        <View style={styles.centeredContent}>
          <ActivityIndicator size="large" color={themeTintColor} />
          <Text style={[styles.loadingText, { color: themeTextColor }]}>
            {currentLoadingMessages[loadingMessageIndex]}
          </Text>
        </View>
      );
    }

    if (ingredientError) {
      return (
        <View style={styles.centeredContent}>
          <Text style={[styles.errorText, { color: themeTextColor }]}>
            {ingredientError}
          </Text>
          <Text
            style={[
              styles.errorText, // Use errorText style
              { color: themeTextColor, marginTop: 10, fontWeight: "normal" },
            ]}
          >
            Please try another photo.
          </Text>
        </View>
      );
    }

    if (ingredientData) {
      if (
        ingredientData.ingredients.length === 0 &&
        ingredientData.description
      ) {
        return (
          <View style={styles.centeredContent}>
            <Text style={[styles.infoText, { color: themeTextColor }]}>
              {`Hmm, a picture of ${ingredientData.description.toLowerCase()}? That might not make the best meal... 😉 Try ingredients!`}
            </Text>
          </View>
        );
      }

      if (ingredientData.ingredients.length > 0) {
        // Render ingredients list AND recipe section
        return (
          <View style={{ flex: 1 }}>
            {/* Display ingredients as comma-separated text */}
            <View style={styles.ingredientTextContainer}>
              <Text
                style={[styles.ingredientHeader, { color: themeTextColor }]}
              >
                Detected Ingredients:{" "}
                <Text style={styles.ingredientValue}>
                  {ingredientData.ingredients
                    .map((ingredient) =>
                      ingredient
                        .split(" ")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")
                    )
                    .join(", ")}
                </Text>
              </Text>
            </View>

            {/* Recipe Section - Rendered below ingredients */}
            <View style={styles.recipeSectionContainer}>
              {renderRecipeContent()}
            </View>
          </View>
        );
      }

      if (
        ingredientData.ingredients.length === 0 &&
        !ingredientData.description
      ) {
        return (
          <View style={styles.centeredContent}>
            <Text style={[styles.infoText, { color: themeTextColor }]}>
              Couldn't find any ingredients. Try a clearer photo?
            </Text>
          </View>
        );
      }
    }

    return null; // Fallback
  };

  // Separate function to render recipe part (loading/error/list)
  const renderRecipeContent = () => {
    if (recipeLoading) {
      return (
        <View style={styles.centeredContentSmallPadding}>
          <ActivityIndicator size="small" color={themeTintColor} />
          <Text style={[styles.loadingTextSmall, { color: themeTextColor }]}>
            {currentLoadingMessages[loadingMessageIndex]}
          </Text>
        </View>
      );
    }

    if (recipeError) {
      return (
        <View style={styles.centeredContentSmallPadding}>
          <Text style={[styles.errorText, { color: themeTextColor }]}>
            {recipeError}
          </Text>
        </View>
      );
    }

    // Pass recipes, loading, error state to the RecipeList organism
    // Note: loading/error handled above, could pass directly if RecipeList handles them
    if (recipes) {
      return <RecipeList recipes={recipes} loading={false} error={null} />;
    }

    return null; // No recipes yet or finished loading but empty
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: themeBackgroundColor }]}
    >
      <View style={styles.imageWrapper}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      </View>

      {/* Render main content area */}
      <View style={styles.contentContainer}>{renderIngredientContent()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    fontWeight: "bold", // Make error text bold
    textAlign: "center",
  },
  infoText: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  imageWrapper: {
    flex: 0.4, // Slightly less space for image
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "grey",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    flex: 0.6, // More space for content
    paddingHorizontal: 5, // Reduce horizontal padding for more list width
    paddingTop: 10,
    paddingBottom: 10,
  },
  centeredContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  centeredContentSmallPadding: {
    // For recipe loading/error
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  loadingTextSmall: {
    // Smaller text for recipe loading
    marginTop: 5,
    fontSize: 14,
    textAlign: "center",
  },
  // New styles for single-line ingredients
  ingredientTextContainer: {
    paddingHorizontal: 15, // Consistent padding
    marginBottom: 10, // Space before recipe list
  },
  ingredientHeader: {
    fontSize: 16, // Slightly smaller than old list header
    fontWeight: "bold",
  },
  ingredientValue: {
    fontWeight: "normal", // Normal weight for the actual ingredients
  },
  recipeSectionContainer: {
    // Container for recipe loading/list
    flex: 1, // Allow recipe list to take remaining space
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#ccc", // Separator line
    paddingTop: 10, // Space above recipe content
  },
});
