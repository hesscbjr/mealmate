import Button from "@/components/atoms/Button";
import FadeInView from "@/components/atoms/FadeInView";
import Icon from "@/components/atoms/Icon";
import Text from "@/components/atoms/Text";
import FullScreenMessage from "@/components/molecules/FullScreenMessage";
import RecipeList from "@/components/organisms/RecipeList";
import { useThemeColor } from "@/hooks/useThemeColor";
import { SpoonacularRecipe } from "@/services/spoonacular"; // Assuming Recipe type is SpoonacularRecipe
import React from "react";
import { StyleSheet, View } from "react-native";

// Copied from useIngredientExtraction hook
interface ExtractionResult {
  ingredients: string[];
  description?: string;
}

// Animation constants (copied for FadeInView timings)
const FADE_IN_DELAY_MS = 400;
const FADE_IN_DURATION_MS = 500;

interface IngredientSectionProps {
  ingredientData: ExtractionResult | null;
  ingredientError: string | null;
  onRetry: () => void;
  recipes: SpoonacularRecipe[] | null;
  recipeError: string | null;
  recipeLoading: boolean;
  refreshRecipes: () => void;
  themeBackgroundColor: string; // Needed for button icon color
}

const IngredientSection: React.FC<IngredientSectionProps> = ({
  ingredientData,
  ingredientError,
  onRetry,
  recipes,
  recipeError,
  recipeLoading,
  refreshRecipes,
  themeBackgroundColor,
}) => {
  // Use theme colors needed within this component
  const {
    text: themeTextColor,
    infoText: themeInfoTextColor,
    shadow: themeShadowColor, // Needed for styles
    imagePlaceholder: themeImagePlaceholderColor, // Needed for styles
  } = useThemeColor({}, ["text", "infoText", "shadow", "imagePlaceholder"]);

  // Define necessary styles locally (copied & adapted from PreviewScreen)
  // Note: Ideally, styles would be shared or managed differently (e.g., nativewind)
  const styles = StyleSheet.create({
    errorContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    centeredContent: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      minHeight: 150,
    },
    ingredientTextContainer: {
      paddingTop: 10,
      minHeight: 40,
      paddingHorizontal: 15,
    },
    ingredientHeader: {
      fontSize: 16,
      fontWeight: "bold",
      color: themeTextColor, // Use theme color
    },
    ingredientValue: {
      fontWeight: "normal",
      color: themeTextColor, // Use theme color
    },
    noIngredientHeader: {
      fontSize: 18,
      fontWeight: "normal",
      marginTop: 20,
      textAlign: "center",
      color: themeTextColor, // Use theme color
    },
    noIngredientTextContainer: {
      paddingHorizontal: 40,
      paddingTop: 10,
      minHeight: 40,
    },
    refreshButtonContainer: {
      marginHorizontal: 15,
      marginVertical: 10,
    },
    recipeListContainer: {
      flex: 1,
      paddingHorizontal: 15,
    },
    tryAgainButton: {
      marginTop: 30,
      width: "40%",
    },
    // Add any other styles from the original renderContent that were directly used
    // For example, errorText, infoText styles if FullScreenMessage doesn't handle them fully.
    errorText: {
      // Added just in case
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
      color: themeTextColor, // Use theme color
    },
    infoText: {
      // Added just in case
      fontSize: 14,
      textAlign: "center",
      color: themeInfoTextColor, // Use theme color
    },
  });

  // Logic copied directly from renderContent
  if (ingredientError) {
    return (
      <FullScreenMessage
        title={ingredientError}
        subtitle="Please try another photo."
        buttonProps={{
          title: "Try Again",
          onPress: onRetry, // Use prop
          variant: "primary",
          style: styles.tryAgainButton,
        }}
        containerStyle={styles.centeredContent} // Use local style
      />
    );
  }

  if (ingredientData) {
    if (ingredientData.ingredients.length === 0 && ingredientData.description) {
      return (
        <FullScreenMessage
          subtitle={`Hmm, a picture of ${ingredientData.description.toLowerCase()}? That might not make the best meal...\n\n Try ingredients!`}
          buttonProps={{
            title: "Try Again",
            onPress: onRetry, // Use prop
            variant: "primary",
            style: styles.tryAgainButton,
          }}
          containerStyle={styles.noIngredientTextContainer} // Use local style
        />
      );
    }

    if (ingredientData.ingredients.length > 0) {
      return (
        <>
          <FadeInView delay={FADE_IN_DELAY_MS} duration={FADE_IN_DURATION_MS}>
            <View style={styles.ingredientTextContainer}>
              <Text style={styles.ingredientHeader}>
                🛒 Ingredients:{" "}
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
          </FadeInView>

          <FadeInView
            delay={FADE_IN_DELAY_MS + 100}
            duration={FADE_IN_DURATION_MS}
            style={styles.recipeListContainer}
          >
            {!recipeLoading &&
              recipes &&
              recipes.length > 0 &&
              !recipeError && (
                <View style={styles.refreshButtonContainer}>
                  <Button
                    title="Don't like these? Get 5 More"
                    iconRight={
                      <Icon
                        name="sync-alt"
                        size={16}
                        color={themeBackgroundColor} // Use passed theme color
                      />
                    }
                    onPress={refreshRecipes} // Use prop
                    variant="primary"
                  />
                </View>
              )}
            <RecipeList
              recipes={recipes} // Use prop
              loading={recipeLoading} // Use prop
              error={recipeError} // Use prop
            />
          </FadeInView>
        </>
      );
    }

    if (
      ingredientData.ingredients.length === 0 &&
      !ingredientData.description
    ) {
      return (
        <FullScreenMessage
          subtitle="Couldn't find any ingredients. Try a clearer photo?"
          buttonProps={{
            title: "Try Again",
            onPress: onRetry, // Use prop
            variant: "primary",
            style: styles.tryAgainButton,
          }}
          containerStyle={styles.centeredContent} // Use local style
        />
      );
    }
  }

  // Default case (should ideally not be reached if logic above is exhaustive)
  // Added a fallback for safety.
  return (
    <FullScreenMessage
      title="Error"
      subtitle="Could not process ingredients or recipes."
      buttonProps={{
        title: "Try Again",
        onPress: onRetry, // Use prop
        variant: "primary",
        style: styles.tryAgainButton,
      }}
      containerStyle={styles.centeredContent} // Use local style
    />
  );
};

export default IngredientSection;
