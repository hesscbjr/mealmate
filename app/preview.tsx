import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import Text from "@/components/atoms/Text";
import TypewriterText from "@/components/atoms/TypewriterText";
import RecipeList from "@/components/organisms/RecipeList";
import { INGREDIENT_LOADING_MESSAGES } from "@/constants/LoadingMessages";
import { useIngredientExtraction } from "@/hooks/useIngredientExtraction";
import { useRecipeSuggestions } from "@/hooks/useRecipeSuggestions";
import { useThemeColor } from "@/hooks/useThemeColor";
import { shuffleArray } from "@/utils/shuffleArray";
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

export default function PreviewScreen() {
  const { imageUri } = useLocalSearchParams<{ imageUri: string }>();
  const themeBackgroundColor = useThemeColor({}, "background");
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();

  const [shuffledMessages, setShuffledMessages] = useState<string[]>([]);

  useEffect(() => {
    setShuffledMessages(shuffleArray(INGREDIENT_LOADING_MESSAGES));
  }, []);

  const wrapperPadding = 40;
  const availableWidth = screenWidth - wrapperPadding;
  const imageContainerSize = availableWidth * 0.45;

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

  if (!imageUri) {
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
        <View style={styles.ingredientTextContainer}>
          {shuffledMessages.length > 0 && (
            <TypewriterText
              messages={shuffledMessages}
              style={styles.ingredientHeader}
              typingSpeed={30}
              pauseDuration={1500}
            />
          )}
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
        return (
          <View style={{ flex: 1 }}>
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
                disabled={recipeLoading}
              />
            </View>

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

    return null;
  };

  const renderRecipeContent = () => {
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
            source={{ uri: imageUri }}
            style={styles.imageContainer}
            height={imageContainerSize}
            resizeMode="cover"
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
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    width: "60%",
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: "grey",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    paddingHorizontal: 5,
    paddingTop: 5,
    flex: 1,
  },
  centeredContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    minHeight: 150,
  },
  ingredientTextContainer: {
    paddingHorizontal: 15,
    marginBottom: 10,
    paddingTop: 10,
    minHeight: 40,
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
