import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import Text from "@/components/atoms/Text";
import ScanImage from "@/components/molecules/ScanImage";
import RecipeList from "@/components/organisms/RecipeList";
import { useIngredientExtraction } from "@/hooks/useIngredientExtraction";
import { useRecipeSuggestions } from "@/hooks/useRecipeSuggestions";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  const themeTintColor = useThemeColor({}, "tint");
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();

  // State for cycling loading messages
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [currentLoadingMessages, setCurrentLoadingMessages] = useState(
    ingredientLoadingMessages
  );

  // Calculate image container height based on screen width
  // Assuming paddingHorizontal: 20 on imageWrapper
  const wrapperPadding = 40; // 20 left + 20 right
  const availableWidth = screenWidth - wrapperPadding;
  // Width is 45% of availableWidth, height equals width due to aspectRatio: 1
  const imageContainerSize = availableWidth * 0.45;

  // --- Hooks ---
  const {
    data: ingredientData,
    loading: ingredientLoading,
    error: ingredientError,
  } = useIngredientExtraction(imageUri);

  const {
    recipes,
    loading: recipeLoading,
    error: recipeError,
    refreshRecipes,
  } = useRecipeSuggestions(
    ingredientData && ingredientData.ingredients.length > 0
      ? ingredientData.ingredients
      : null
  );

  // Effect to cycle through loading messages
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    // Only show loading messages when ingredients *or* recipes are loading initially
    // Recipe refresh loading is handled within RecipeList now
    const isLoading = ingredientLoading || (recipeLoading && !recipes);

    // Set the correct message array based on which step is loading
    if (ingredientLoading) {
      setCurrentLoadingMessages(ingredientLoadingMessages);
    } else if (recipeLoading && !recipes) {
      // Only show recipe messages on initial load
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
    // Depend on loading states and recipes presence for initial load messages
  }, [ingredientLoading, recipeLoading, recipes, currentLoadingMessages]);

  if (!imageUri) {
    // Handle the case where the URI is missing
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: themeBackgroundColor, paddingTop: insets.top },
        ]}
      >
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No image URI provided.</Text>
        </View>
      </View>
    );
  }

  const renderIngredientContent = () => {
    if (ingredientLoading) {
      return (
        <View style={styles.centeredContent}>
          <Text style={styles.loadingText}>
            {currentLoadingMessages[loadingMessageIndex]}
          </Text>
        </View>
      );
    }

    if (ingredientError) {
      return (
        <View style={styles.centeredContent}>
          <Text style={styles.errorText}>{ingredientError}</Text>
          <Text
            style={[styles.errorText, { marginTop: 10, fontWeight: "normal" }]}
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
            <Text style={styles.infoText}>
              {`Hmm, a picture of ${ingredientData.description.toLowerCase()}? That might not make the best meal... 😉 Try ingredients!`}
            </Text>
          </View>
        );
      }

      if (ingredientData.ingredients.length > 0) {
        // Render ingredients, refresh button (conditionally disabled), and recipe section
        return (
          <View style={{ flex: 1 }}>
            {/* Display ingredients as comma-separated text */}
            <View style={styles.ingredientTextContainer}>
              <Text style={styles.ingredientHeader}>
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

            {/* Refresh Button - Show immediately, disable while loading */}
            <View style={styles.refreshButtonContainer}>
              <Button
                title="Don't like these? Get 5 More"
                iconRight={
                  <Icon
                    name="sync-alt"
                    size={16}
                    color={themeBackgroundColor}
                  />
                }
                onPress={refreshRecipes}
                variant="primary"
                disabled={recipeLoading} // Directly use recipeLoading state
              />
            </View>

            {/* Recipe Section - Rendered below ingredients */}
            {renderRecipeContent()}
          </View>
        );
      }

      if (
        ingredientData.ingredients.length === 0 &&
        !ingredientData.description
      ) {
        return (
          <View style={styles.centeredContent}>
            <Text style={styles.infoText}>
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
    // Always render RecipeList. It handles its own loading (skeleton) and error states.
    // Pass loading and error states directly.
    return (
      <RecipeList
        recipes={recipes}
        loading={recipeLoading}
        error={recipeError}
      />
    );
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeBackgroundColor, paddingTop: insets.top },
      ]}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageWrapper}>
          <Image
            source={require("@/assets/images/looking.png")}
            style={styles.lookingImage}
            resizeMode="contain"
          />
          <ScanImage
            source={{ uri: imageUri }}
            style={styles.imageContainer}
            height={imageContainerSize}
            resizeMode="cover"
            loading={ingredientLoading}
            scanColor="rgba(0, 255, 0, 0.5)"
            scanHeight={3}
            duration={1000}
            pauseDuration={500}
          />
        </View>

        <View style={styles.contentContainer}>{renderIngredientContent()}</View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  infoText: {
    fontSize: 14,
    textAlign: "center",
  },
  imageWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  lookingImage: {
    width: "45%",
    aspectRatio: 1,
  },
  imageContainer: {
    width: "45%",
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
    paddingHorizontal: 5,
    paddingTop: 5,
    flex: 1, // Ensure content container takes up remaining space
  },
  centeredContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    minHeight: 150, // Keep some min height for ingredient loading/error
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    textAlign: "center",
  },
  ingredientTextContainer: {
    paddingHorizontal: 15,
    marginBottom: 10,
    paddingTop: 10,
  },
  ingredientHeader: {
    fontSize: 16,
    fontWeight: "bold",
  },
  ingredientValue: {
    fontWeight: "normal",
  },
  refreshButtonContainer: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
});
