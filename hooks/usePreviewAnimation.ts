import { ExtractionResult } from "@/hooks/useIngredientExtraction";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

// Animation & Layout Constants
const LOADING_IMAGE_SCALE_FACTOR = 0.6;
const FINAL_IMAGE_SCALE_FACTOR = 0.6;
const FINAL_IMAGE_X_SCALE_FACTOR = 0.2;
const INITIAL_VERTICAL_OFFSET = 120;
const LOADING_TEXT_VERTICAL_SPACING = 15;
const ANIMATION_DURATION_MS = 1000;

// Styling & Appearance Constants
const IMAGE_BORDER_RADIUS_LOADING = 15;
const IMAGE_BORDER_RADIUS_FINAL = 10;
const SHADOW_OFFSET_Y_LOADING = 2;
const SHADOW_OFFSET_Y_FINAL = 1;
const SHADOW_OPACITY_LOADING = 0.25;
const SHADOW_RADIUS_LOADING = 5;
const SHADOW_RADIUS_FINAL = 3.84;
const ELEVATION_LOADING = 6;
const ELEVATION_FINAL = 5;
const OPACITY_TRANSITION_POINT = 0.999;

interface UsePreviewAnimationProps {
  imageUri?: string | null;
  ingredientLoading: boolean;
  recipeLoading: boolean;
  ingredientData: ExtractionResult | null;
  ingredientError: string | null;
}

export function usePreviewAnimation({
  imageUri,
  ingredientLoading,
  recipeLoading,
  ingredientData,
  ingredientError,
}: UsePreviewAnimationProps) {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const { shadow: themeShadowColor, imagePlaceholder: themeImagePlaceholderColor } =
    useThemeColor({}, ["shadow", "imagePlaceholder"]);

  const [initialLoadHasCompleted, setInitialLoadHasCompleted] = useState(false);
  const animationProgress = useSharedValue(0);

  // --- Dimension Calculations ---
  const loadingImageSize = screenWidth * LOADING_IMAGE_SCALE_FACTOR;
  const finalImageWidth = screenWidth * FINAL_IMAGE_SCALE_FACTOR;
  const finalImageHeight = finalImageWidth;

  const initialImageX = (screenWidth - loadingImageSize) / 2;
  const initialImageY =
    (screenHeight - loadingImageSize) / 2 - INITIAL_VERTICAL_OFFSET;

  const finalImageX = screenWidth * FINAL_IMAGE_X_SCALE_FACTOR;
  const finalImageY = 20;

  const loadingTextY =
    initialImageY + loadingImageSize + LOADING_TEXT_VERTICAL_SPACING;

  // --- Animation Trigger Effect ---
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

  // --- Animated Styles ---
  const loadingImageStyle = useAnimatedStyle(() => {
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

  const finalImageStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        animationProgress.value,
        [0, OPACITY_TRANSITION_POINT, 1],
        [0, 0, 1]
      ),
    };
  });

  return {
    animationProgress,
    initialLoadHasCompleted,
    loadingImageStyle,
    finalImageStyle,
    loadingTextY,
    finalImageHeight, // Also return this as it's needed in the component
    finalImageWidth, // Also return this as it's needed in the component
  };
} 