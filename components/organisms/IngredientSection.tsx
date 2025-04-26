import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import Stagger from "@/components/atoms/Stagger";
import FullScreenMessage from "@/components/molecules/FullScreenMessage";
import IngredientListDisplay from "@/components/molecules/IngredientListDisplay";
import RecipeList from "@/components/organisms/RecipeList";
import { ExtractionResult } from "@/hooks/useIngredientExtraction"; // Import the type
import { SpoonacularRecipe } from "@/services/spoonacular"; // Assuming Recipe type is SpoonacularRecipe
import React from "react";
import { StyleSheet, View } from "react-native";

// Animation constants (copied for FadeInView timings)
const FADE_IN_DELAY_MS = 400;
const FADE_IN_DURATION_MS = 500;
const STAGGER_DELAY_MS = 100; // Delay between items

interface IngredientSectionProps {
  ingredientData: ExtractionResult | null;
  ingredientError: string | null;
  onRetry: () => void;
  recipes: SpoonacularRecipe[] | null;
  recipeError: string | null;
  recipeLoading: boolean;
  refreshRecipes: () => void;
}

const IngredientSection: React.FC<IngredientSectionProps> = ({
  ingredientData,
  ingredientError,
  onRetry,
  recipes,
  recipeError,
  recipeLoading,
  refreshRecipes,
}) => {
  const renderFullScreenMessage = ({
    title,
    subtitle,
    retryLabel = "Try Again",
    containerStyle = styles.centeredContent,
  }: {
    title?: string;
    subtitle: string;
    retryLabel?: string;
    containerStyle?: object;
  }) => (
    <FullScreenMessage
      title={title}
      subtitle={subtitle}
      buttonProps={{
        title: retryLabel,
        onPress: onRetry,
        variant: "primary",
      }}
      containerStyle={containerStyle}
    />
  );

  if (ingredientError) {
    return renderFullScreenMessage({
      title: ingredientError,
      subtitle: "Please try another photo.",
    });
  }

  if (ingredientData) {
    if (ingredientData.ingredients.length === 0 && ingredientData.description) {
      return renderFullScreenMessage({
        subtitle: `Hmm, a picture of ${ingredientData.description.toLowerCase()}? That might not make the best meal...\\n\\n Try ingredients!`,
        containerStyle: styles.noIngredientTextContainer,
      });
    }

    if (ingredientData.ingredients.length > 0) {
      return (
        <Stagger
          parentDelay={FADE_IN_DELAY_MS}
          stagger={STAGGER_DELAY_MS}
          duration={FADE_IN_DURATION_MS}
        >
          <IngredientListDisplay ingredients={ingredientData.ingredients} />

          <View style={styles.recipeListContainer}>
            {recipes &&
              (recipes.length > 0 || recipeLoading) &&
              !recipeError && (
                <View style={styles.refreshButtonContainer}>
                  <Button
                    title="Don't like these? Get 5 More"
                    iconRight={<Icon name="sync-alt" size={16} />}
                    onPress={refreshRecipes}
                    variant="primary"
                  />
                </View>
              )}
            <RecipeList
              recipes={recipes}
              loading={recipeLoading}
              error={recipeError}
            />
          </View>
        </Stagger>
      );
    }

    if (
      ingredientData.ingredients.length === 0 &&
      !ingredientData.description
    ) {
      return renderFullScreenMessage({
        subtitle: "Couldn't find any ingredients. Try a clearer photo?",
      });
    }
  }

  return renderFullScreenMessage({
    title: "Error",
    subtitle: "Could not process ingredients or recipes.",
  });
};

const styles = StyleSheet.create({
  centeredContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    minHeight: 150,
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
    width: "100%",
  },
});

export default IngredientSection;
