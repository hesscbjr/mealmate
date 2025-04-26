import FullScreenMessage from "@/components/molecules/FullScreenMessage";
import IconButton from "@/components/molecules/IconButton";
import LoadingOverlay from "@/components/molecules/LoadingOverlay";
import IngredientSection from "@/components/organisms/IngredientSection";
import { INGREDIENT_LOADING_MESSAGES } from "@/constants/LoadingMessages";
import { useIngredientExtraction } from "@/hooks/useIngredientExtraction";
import { usePreviewAnimation } from "@/hooks/usePreviewAnimation";
import { useRecipeSuggestions } from "@/hooks/useRecipeSuggestions";
import { useThemeColor } from "@/hooks/useThemeColor";
import { shuffleArray } from "@/utils/shuffleArray";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

// Constant for final image style
const IMAGE_BORDER_RADIUS_FINAL = 10;
const SHADOW_OFFSET_Y_FINAL = 1;
const SHADOW_RADIUS_FINAL = 3.84;
const ELEVATION_FINAL = 5;

const staticStyles = StyleSheet.create({
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
  imageContainerBase: {
    aspectRatio: 1,
    borderRadius: IMAGE_BORDER_RADIUS_FINAL,
    shadowOffset: { width: 0, height: SHADOW_OFFSET_Y_FINAL },
    shadowOpacity: 0.2,
    shadowRadius: SHADOW_RADIUS_FINAL,
    elevation: ELEVATION_FINAL,
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
  },
  ingredientValue: {
    fontWeight: "normal",
  },
  noIngredientHeader: {
    fontSize: 18,
    fontWeight: "normal",
    marginTop: 20,
    textAlign: "center",
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
  loadingIngredientHeaderBase: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    width: "90%",
  },
  finalImageWrapper: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 10,
  },
  recipeListContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  tryAgainButton: {
    marginTop: 30,
    width: "40%",
  },
});

export default function PreviewScreen() {
  const { imageUri } = useLocalSearchParams<{ imageUri: string }>();
  const navigation = useNavigation();
  const {
    tint: themeTintColor,
    shadow: themeShadowColor,
    imagePlaceholder: themeImagePlaceholderColor,
    loadingText: themeLoadingTextColor,
    background: themeBackgroundColor,
  } = useThemeColor({}, [
    "tint",
    "shadow",
    "imagePlaceholder",
    "loadingText",
    "background",
  ]);

  const [shuffledMessages, setShuffledMessages] = useState<string[]>([]);

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

  const {
    animationProgress,
    initialLoadHasCompleted,
    loadingImageStyle,
    finalImageStyle,
    loadingTextY,
    finalImageHeight,
    finalImageWidth,
  } = usePreviewAnimation({
    imageUri,
    ingredientLoading,
    recipeLoading,
    ingredientData,
    ingredientError,
  });

  useEffect(() => {
    setShuffledMessages(shuffleArray(INGREDIENT_LOADING_MESSAGES));
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Recipes",
      headerLeft: () => (
        <IconButton
          onPress={() => navigation.goBack()}
          name="arrow-left"
          size={24}
          color={themeTintColor}
          iconSet="fa5"
          style={{
            marginLeft: Platform.OS === "ios" ? 10 : 0,
            marginRight: Platform.OS === "ios" ? 0 : 10,
          }}
        />
      ),
    });
  }, [navigation, themeTintColor]);

  if (!imageUri) {
    return (
      <FullScreenMessage
        title="Error"
        subtitle="No image URI provided."
        fadeIn={false}
      />
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: themeBackgroundColor }}>
      <Animated.Image
        source={{ uri: imageUri }}
        style={loadingImageStyle}
        resizeMode="cover"
      />

      {!initialLoadHasCompleted && (
        <LoadingOverlay
          messages={shuffledMessages}
          progress={animationProgress}
          loadingTextInitialY={loadingTextY}
          loadingIngredientHeaderStyle={{
            ...staticStyles.loadingIngredientHeaderBase,
            color: themeLoadingTextColor,
          }}
        />
      )}

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={staticStyles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
        scrollEnabled={initialLoadHasCompleted}
      >
        <View style={staticStyles.finalImageWrapper}>
          <Animated.Image
            source={{ uri: imageUri }}
            style={[
              staticStyles.imageContainerBase,
              {
                width: finalImageWidth,
                backgroundColor: themeImagePlaceholderColor,
                shadowColor: themeShadowColor,
                height: finalImageHeight,
              },
              finalImageStyle,
            ]}
            resizeMode="cover"
          />
        </View>

        {initialLoadHasCompleted && (
          <IngredientSection
            ingredientData={ingredientData}
            ingredientError={ingredientError}
            onRetry={() => navigation.goBack()}
            recipes={recipes}
            recipeError={recipeError}
            recipeLoading={recipeLoading}
            refreshRecipes={refreshRecipes}
          />
        )}
      </ScrollView>
    </View>
  );
}
