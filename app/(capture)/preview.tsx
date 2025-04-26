import FullScreenMessage from "@/components/molecules/FullScreenMessage";
import IconButton from "@/components/molecules/IconButton";
import LoadingOverlay from "@/components/molecules/LoadingOverlay";
import IngredientSection from "@/components/organisms/IngredientSection";
import { INGREDIENT_LOADING_MESSAGES } from "@/constants/LoadingMessages";
import { useIngredientExtraction } from "@/hooks/useIngredientExtraction";
import { useRecipeSuggestions } from "@/hooks/useRecipeSuggestions";
import { useThemeColor } from "@/hooks/useThemeColor";
import { shuffleArray } from "@/utils/shuffleArray";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

// Animation & Layout
const LOADING_IMAGE_SCALE_FACTOR = 0.6;
const FINAL_IMAGE_SCALE_FACTOR = 0.6;
const FINAL_IMAGE_X_SCALE_FACTOR = 0.2;
const INITIAL_VERTICAL_OFFSET = 120;
const LOADING_TEXT_VERTICAL_SPACING = 15;
const ANIMATION_DURATION_MS = 1000;
const FADE_IN_DELAY_MS = 400;
const FADE_IN_DURATION_MS = 500;

// Styling & Appearance
const IMAGE_BORDER_RADIUS_LOADING = 15;
const IMAGE_BORDER_RADIUS_FINAL = 10;
const SHADOW_OFFSET_Y_LOADING = 2;
const SHADOW_OFFSET_Y_FINAL = 1;
const SHADOW_OPACITY_LOADING = 0.25;
const SHADOW_RADIUS_LOADING = 5;
const SHADOW_RADIUS_FINAL = 3.84;
const ELEVATION_LOADING = 6;
const ELEVATION_FINAL = 5;
const OPACITY_TRANSITION_POINT = 0.999; // Point where image opacity transitions complete

export default function PreviewScreen() {
  const { imageUri } = useLocalSearchParams<{ imageUri: string }>();
  const themeBackgroundColor = useThemeColor({}, "background");
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const navigation = useNavigation();
  const {
    tint: themeTintColor,
    shadow: themeShadowColor,
    imagePlaceholder: themeImagePlaceholderColor,
    loadingText: themeLoadingTextColor,
    text: themeTextColor,
    infoText: themeInfoTextColor,
  } = useThemeColor({}, [
    "tint",
    "shadow",
    "imagePlaceholder",
    "loadingText",
    "text",
    "infoText",
  ]);

  const [shuffledMessages, setShuffledMessages] = useState<string[]>([]);
  const [initialLoadHasCompleted, setInitialLoadHasCompleted] = useState(false);

  const animationProgress = useSharedValue(0);

  const loadingImageSize = screenWidth * LOADING_IMAGE_SCALE_FACTOR;
  const finalImageWidth = screenWidth * FINAL_IMAGE_SCALE_FACTOR;
  const finalImageHeight = finalImageWidth;

  const initialImageX = (screenWidth - loadingImageSize) / 2;
  const initialImageY =
    (screenHeight - loadingImageSize) / 2 - INITIAL_VERTICAL_OFFSET;

  const finalImageX = screenWidth * FINAL_IMAGE_X_SCALE_FACTOR;
  const finalImageY = 20;

  const loadingTextInitialY =
    initialImageY + loadingImageSize + LOADING_TEXT_VERTICAL_SPACING;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeBackgroundColor,
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
      color: themeTextColor,
    },
    infoText: {
      fontSize: 14,
      textAlign: "center",
      color: themeInfoTextColor,
    },
    imageContainer: {
      width: `${FINAL_IMAGE_SCALE_FACTOR * 100}%`,
      aspectRatio: 1,
      borderRadius: IMAGE_BORDER_RADIUS_FINAL,
      backgroundColor: themeImagePlaceholderColor,
      shadowColor: themeShadowColor,
      shadowOffset: { width: 0, height: SHADOW_OFFSET_Y_FINAL },
      shadowOpacity: SHADOW_OPACITY_LOADING,
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
      color: themeTextColor,
    },
    ingredientValue: {
      fontWeight: "normal",
      color: themeTextColor,
    },
    noIngredientHeader: {
      fontSize: 18,
      fontWeight: "normal",
      marginTop: 20,
      textAlign: "center",
      color: themeTextColor,
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
    loadingIngredientHeader: {
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
      color: themeLoadingTextColor,
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

  useEffect(() => {
    setShuffledMessages(shuffleArray(INGREDIENT_LOADING_MESSAGES));
  }, []);

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

  useEffect(() => {
    if (initialLoadHasCompleted || !imageUri) {
      return;
    }

    if (
      !ingredientLoading &&
      !recipeLoading &&
      (ingredientData !== null || ingredientError !== null)
    ) {
      setInitialLoadHasCompleted(true);
      animationProgress.value = withTiming(1, {
        duration: ANIMATION_DURATION_MS,
        easing: Easing.out(Easing.exp),
      });
    }
  }, [
    ingredientLoading,
    recipeLoading,
    imageUri,
    initialLoadHasCompleted,
    ingredientData,
    ingredientError,
    animationProgress,
  ]);

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
          }}
        />
      ),
    });
  }, [navigation, themeTintColor]);

  const animatedImageStyle = useAnimatedStyle(() => {
    const currentWidth = interpolate(
      animationProgress.value,
      [0, 1],
      [loadingImageSize, finalImageWidth],
      Extrapolation.CLAMP
    );
    const currentHeight = interpolate(
      animationProgress.value,
      [0, 1],
      [loadingImageSize, finalImageHeight],
      Extrapolation.CLAMP
    );
    const currentX = interpolate(
      animationProgress.value,
      [0, 1],
      [initialImageX, finalImageX],
      Extrapolation.CLAMP
    );
    const currentY = interpolate(
      animationProgress.value,
      [0, 1],
      [initialImageY, finalImageY],
      Extrapolation.CLAMP
    );

    return {
      position: "absolute",
      top: currentY,
      left: currentX,
      width: currentWidth,
      height: currentHeight,
      borderRadius: interpolate(
        animationProgress.value,
        [0, 1],
        [IMAGE_BORDER_RADIUS_LOADING, IMAGE_BORDER_RADIUS_FINAL]
      ),
      shadowColor: themeShadowColor,
      shadowOffset: {
        width: 0,
        height: interpolate(
          animationProgress.value,
          [0, 1],
          [SHADOW_OFFSET_Y_LOADING, SHADOW_OFFSET_Y_FINAL]
        ),
      },
      shadowOpacity: interpolate(
        animationProgress.value,
        [0, OPACITY_TRANSITION_POINT, 1],
        [SHADOW_OPACITY_LOADING, SHADOW_OPACITY_LOADING, 0]
      ),
      shadowRadius: interpolate(
        animationProgress.value,
        [0, 1],
        [SHADOW_RADIUS_LOADING, SHADOW_RADIUS_FINAL]
      ),
      elevation: interpolate(
        animationProgress.value,
        [0, 1],
        [ELEVATION_LOADING, ELEVATION_FINAL]
      ),
      backgroundColor: themeImagePlaceholderColor,
      opacity: interpolate(
        animationProgress.value,
        [0, OPACITY_TRANSITION_POINT, 1],
        [1, 1, 0]
      ),
    };
  });

  const animatedScrollImageStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        animationProgress.value,
        [0, OPACITY_TRANSITION_POINT, 1],
        [0, 0, 1]
      ),
    };
  });

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
    <View style={styles.container}>
      <Animated.Image
        source={{ uri: imageUri }}
        style={animatedImageStyle}
        resizeMode="cover"
      />

      {!initialLoadHasCompleted && (
        <LoadingOverlay
          messages={shuffledMessages}
          progress={animationProgress}
          loadingTextInitialY={loadingTextInitialY}
          loadingIngredientHeaderStyle={styles.loadingIngredientHeader}
        />
      )}

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
        scrollEnabled={initialLoadHasCompleted}
      >
        <View style={styles.finalImageWrapper}>
          <Animated.Image
            source={{ uri: imageUri }}
            style={[
              styles.imageContainer,
              animatedScrollImageStyle,
              { height: finalImageHeight },
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
            themeBackgroundColor={themeBackgroundColor}
          />
        )}
      </ScrollView>
    </View>
  );
}
