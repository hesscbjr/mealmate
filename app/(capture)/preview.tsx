import Button from "@/components/atoms/Button";
import FadeInView from "@/components/atoms/FadeInView";
import Icon from "@/components/atoms/Icon";
import Text from "@/components/atoms/Text";
import TypewriterText from "@/components/atoms/TypewriterText";
import IconButton from "@/components/molecules/IconButton";
import RecipeList from "@/components/organisms/RecipeList";
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

export default function PreviewScreen() {
  const { imageUri } = useLocalSearchParams<{ imageUri: string }>();
  const themeBackgroundColor = useThemeColor({}, "background");
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const navigation = useNavigation();
  const themeTintColor = useThemeColor({}, "tint");

  const [shuffledMessages, setShuffledMessages] = useState<string[]>([]);
  const [initialLoadHasCompleted, setInitialLoadHasCompleted] = useState(false);

  const animationProgress = useSharedValue(0);

  const loadingImageSize = screenWidth * 0.6;
  const finalImageWidth = screenWidth * 0.6;
  const finalImageHeight = finalImageWidth;
  const finalImagePaddingTop = 20;
  const finalImagePaddingBottom = 10;

  const initialImageX = (screenWidth - loadingImageSize) / 2;
  const initialImageY = (screenHeight - loadingImageSize) / 2 - 120;

  const finalImageX = screenWidth * 0.2;
  const finalImageY = finalImagePaddingTop;

  const loadingTextInitialY = initialImageY + loadingImageSize + 15;

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
        duration: 1000,
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
          style={{ marginLeft: Platform.OS === "ios" ? 10 : 0 }}
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
      borderRadius: interpolate(animationProgress.value, [0, 1], [15, 10]),
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: interpolate(animationProgress.value, [0, 1], [2, 1]),
      },
      shadowOpacity: interpolate(
        animationProgress.value,
        [0, 0.999, 1],
        [0.25, 0.25, 0]
      ),
      shadowRadius: interpolate(animationProgress.value, [0, 1], [5, 3.84]),
      elevation: interpolate(animationProgress.value, [0, 1], [6, 5]),
      backgroundColor: "grey",
      opacity: interpolate(animationProgress.value, [0, 0.999, 1], [1, 1, 0]),
    };
  });

  const animatedLoadingTextStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      top: loadingTextInitialY,
      left: 0,
      right: 0,
      alignItems: "center",
      opacity: interpolate(
        animationProgress.value,
        [0, 0.5],
        [1, 0],
        Extrapolation.CLAMP
      ),
    };
  });

  const animatedScrollImageStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animationProgress.value, [0, 0.999, 1], [0, 0, 1]),
    };
  });

  if (!imageUri) {
    return (
      <View
        style={[styles.container, { backgroundColor: themeBackgroundColor }]}
      >
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No image URI provided.</Text>
        </View>
      </View>
    );
  }

  const renderContent = () => {
    if (ingredientError) {
      return (
        <FadeInView delay={400} duration={500} style={styles.centeredContent}>
          <Text style={styles.errorText}>{ingredientError}</Text>
          <Text
            style={[styles.errorText, { marginTop: 10, fontWeight: "normal" }]}
          >
            Please try another photo.
          </Text>
        </FadeInView>
      );
    }

    if (ingredientData) {
      if (
        ingredientData.ingredients.length === 0 &&
        ingredientData.description
      ) {
        return (
          <FadeInView delay={400} duration={500}>
            <View style={styles.noIngredientTextContainer}>
              <Text
                style={[
                  styles.ingredientHeader,
                  { fontWeight: "normal", fontSize: 18, marginTop: 20 },
                ]}
              >
                {`Hmm, a picture of ${ingredientData.description.toLowerCase()}? That might not make the best meal... 😉 Try ingredients!`}
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Button
                title="Try Again"
                onPress={() => navigation.goBack()}
                variant="primary"
                style={{ marginTop: 30, width: "40%" }}
              />
            </View>
          </FadeInView>
        );
      }

      if (ingredientData.ingredients.length > 0) {
        return (
          <>
            <FadeInView delay={400} duration={500}>
              <View style={styles.ingredientTextContainer}>
                <Text style={styles.ingredientHeader}>
                  🛒 Ingredients:{" "}
                  <Text style={styles.ingredientValue}>
                    {ingredientData.ingredients
                      .map((ingredient) =>
                        ingredient
                          .split(" ")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")
                      )
                      .join(", ")}
                  </Text>
                </Text>
              </View>
            </FadeInView>

            <FadeInView
              delay={500}
              duration={500}
              style={styles.recipeListContainer}
            >
              {(recipes || recipeError) && (
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
              )}
              <RecipeList
                recipes={recipes}
                loading={recipeLoading}
                error={recipeError}
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
          <FadeInView delay={400} duration={500} style={styles.centeredContent}>
            <Text style={styles.infoText}>
              Couldn't find any ingredients. Try a clearer photo?
            </Text>
          </FadeInView>
        );
      }
    }

    return (
      <FadeInView delay={400} duration={500} style={styles.centeredContent}>
        <Text style={styles.infoText}>Could not process ingredients.</Text>
      </FadeInView>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: themeBackgroundColor }]}>
      <Animated.Image
        source={{ uri: imageUri }}
        style={animatedImageStyle}
        resizeMode="cover"
      />

      {!initialLoadHasCompleted && (
        <Animated.View style={animatedLoadingTextStyle}>
          {shuffledMessages.length > 0 && (
            <TypewriterText
              messages={shuffledMessages}
              style={styles.loadingIngredientHeader}
              typingSpeed={30}
              pauseDuration={1500}
            />
          )}
        </Animated.View>
      )}

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
        scrollEnabled={initialLoadHasCompleted}
      >
        <View
          style={[
            styles.finalImageWrapper,
            {
              paddingTop: finalImagePaddingTop,
              paddingBottom: finalImagePaddingBottom,
            },
          ]}
        >
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

        {initialLoadHasCompleted && renderContent()}
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
  },
  imageContainer: {
    width: "60%",
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: "grey",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
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
  noIngredientHeader: {
    fontSize: 24,
    fontWeight: "normal",
    marginTop: 20,
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
    color: "#333",
    width: "90%",
  },
  finalImageWrapper: {
    alignItems: "center",
  },
  recipeListContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
});
