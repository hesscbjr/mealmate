import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useLayoutEffect, useMemo } from "react";
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import ExpandableText from "@/components/molecules/ExpandableText";
import IconButton from "@/components/molecules/IconButton";
import IngredientsList from "@/components/molecules/IngredientsList";
import InstructionsList from "@/components/molecules/InstructionsList";
import { useRecipeDetails } from "@/hooks/useRecipeDetails";
import { useThemeColor } from "@/hooks/useThemeColor";
import { SpoonacularRecipe } from "@/services/spoonacular";
import { useRecipeStore } from "@/store/recipes";
import { parseAndLinkSummary } from "@/utils/textUtils";

// --- Skeleton Component ---
const RecipeDetailSkeleton: React.FC<{
  themeBackgroundColor: string;
}> = ({ themeBackgroundColor }) => {
  // Define gradient colors (same as RecipeCardSkeleton)
  const gradientColors = ["#EAEAEA", "#CDCDCD"] as const;

  return (
    <View
      style={[
        styles.skeletonOuterContainer,
        { backgroundColor: themeBackgroundColor },
      ]}
    >
      {/* Image Placeholder */}
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.skeletonImage}
      />
      <View style={styles.skeletonContentPadding}>
        {/* Title Placeholder */}
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.skeletonTitle, { marginBottom: 12 }]}
        />
        {/* Meta Info Placeholder */}
        <View style={styles.skeletonMetaRow}>
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.skeletonMetaItem}
          />
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.skeletonMetaItem}
          />
        </View>
        {/* Summary Placeholder */}
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.skeletonLine, { width: "100%" }]}
        />
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.skeletonLine, { width: "85%", marginBottom: 20 }]}
        />
        {/* Section Title Placeholder */}
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.skeletonSectionTitle, { marginBottom: 12 }]}
        />
        {/* Item Placeholders */}
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.skeletonLine, { width: "70%" }]}
        />
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.skeletonLine, { width: "60%", marginBottom: 20 }]}
        />
        {/* Section Title Placeholder */}
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.skeletonSectionTitle, { marginBottom: 12 }]}
        />
        {/* Item Placeholders */}
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.skeletonLine, { width: "80%" }]}
        />
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.skeletonLine, { width: "75%" }]}
        />
      </View>
    </View>
  );
};
// --- End Skeleton Component ---

export default function RecipeDetailScreen() {
  const { id, missedCount } = useLocalSearchParams<{
    id: string;
    missedCount?: string;
  }>();
  const navigation = useNavigation();
  const router = useRouter();

  const themeBackgroundColor = useThemeColor({}, "background");
  const themeTextColor = useThemeColor({}, "text");
  const themeSubtleTextColor = useThemeColor({}, "icon");
  const themeTintColor = useThemeColor({}, "tint");
  const themeBorderColor = useThemeColor({}, "icon");

  const { recipeDetails, loading, error } = useRecipeDetails(id);

  const summaryData = useMemo(() => {
    if (recipeDetails?.summary) {
      const parsed = parseAndLinkSummary(recipeDetails.summary);
      const fullSummary = parsed.summaryText;

      return {
        fullSummary,
        relatedRecipes: parsed.relatedRecipes,
      };
    }
    return null;
  }, [recipeDetails?.summary]);

  // --- Zustand Recipe Store --- //
  const { toggleStar } = useRecipeStore();
  const currentlyStarred = useRecipeStore((state) =>
    state.isStarred(recipeDetails?.id ?? -1)
  );

  // Set header title and star button dynamically
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "", // Keep title empty
      headerRight: () => (
        <IconButton
          onPress={() => {
            // Only allow starring if recipeDetails exist
            if (recipeDetails) {
              toggleStar(recipeDetails as SpoonacularRecipe);
            }
          }}
          name={currentlyStarred ? "star" : "staro"}
          size={24}
          color={themeTintColor}
          iconSet="antdesign"
          style={{ marginRight: Platform.OS === "ios" ? 10 : 0 }}
          // Disable button visually while loading? Optional enhancement.
          // disabled={!recipeDetails}
        />
      ),
      headerLeft: () => (
        <IconButton
          onPress={() => router.back()}
          name="arrow-left"
          size={24}
          color={themeTintColor}
          iconSet="fa5"
          style={{ marginLeft: Platform.OS === "ios" ? 10 : 0 }}
        />
      ),
    });
  }, [
    navigation,
    recipeDetails,
    currentlyStarred,
    toggleStar,
    themeTintColor,
    router,
  ]);

  const handleOpenSourceUrl = () => {
    if (recipeDetails?.sourceUrl) {
      WebBrowser.openBrowserAsync(recipeDetails.sourceUrl);
    }
  };

  if (loading) {
    return <RecipeDetailSkeleton themeBackgroundColor={themeBackgroundColor} />;
  }

  if (error || !recipeDetails) {
    return (
      <View
        style={[
          styles.centeredContainer,
          { backgroundColor: themeBackgroundColor },
        ]}
      >
        <Text style={[styles.errorText, { color: themeTextColor }]}>
          {error || "Recipe not found."}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: themeBackgroundColor }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Use Stack.Screen to configure header options if preferred over useLayoutEffect */}
      {/* <Stack.Screen options={{ title: recipeDetails.title }} /> */}

      <Image source={{ uri: recipeDetails.image }} style={styles.image} />

      <View style={styles.section}>
        <Text style={[styles.title, { color: themeTextColor }]}>
          {recipeDetails.title}
        </Text>
        {/* Info Row: Time and Servings */}
        <View style={styles.metaInfoContainer}>
          <Text
            style={[
              styles.infoText,
              { color: themeTextColor, marginRight: 15 },
            ]}
          >
            ⏱️ {recipeDetails.readyInMinutes} mins
          </Text>
          <Text
            style={[
              styles.infoText,
              { color: themeTextColor, marginRight: 15 },
            ]}
          >
            🍽️ Serves {recipeDetails.servings}
          </Text>
          {/* Conditionally display missed ingredient count */}
          {missedCount && parseInt(missedCount, 10) > 0 && (
            <Text style={[styles.infoText, { color: themeTextColor }]}>
              🛒 {missedCount} missing
            </Text>
          )}
        </View>
        {/* Display the cleaned summary text */}
        {summaryData?.fullSummary && (
          <View style={styles.summaryContentContainer}>
            <ExpandableText
              text={summaryData.fullSummary}
              initialLines={2}
              textStyle={[styles.summaryText, { color: themeSubtleTextColor }]}
              buttonTextStyle={styles.viewMoreText}
              buttonColor={themeTintColor}
            />
          </View>
        )}
        {/* Add dietary flags if needed */}
      </View>

      {/* Ingredients - Replaced with component */}
      {recipeDetails.extendedIngredients &&
        recipeDetails.extendedIngredients.length > 0 && (
          <IngredientsList
            ingredients={recipeDetails.extendedIngredients}
            titleColor={themeTextColor}
            itemColor={themeTextColor}
            borderColor={themeBorderColor}
            // Pass other styles if needed, e.g., style={styles.customSectionStyle}
          />
        )}

      {/* Instructions - Replaced with component */}
      <InstructionsList
        analyzedInstructions={recipeDetails.analyzedInstructions}
        rawInstructions={recipeDetails.instructions}
        titleColor={themeTextColor}
        setNameColor={themeTextColor}
        stepNumberColor={themeTintColor}
        stepTextColor={themeTextColor}
        borderColor={themeBorderColor}
      />

      {/* Source Link Button */}
      {recipeDetails.sourceUrl && (
        <Button
          title="View Full Recipe Online"
          variant="primary"
          onPress={handleOpenSourceUrl}
          iconLeft={
            <Icon
              name="external-link-alt"
              size={16}
              color={themeBackgroundColor}
            />
          }
          style={styles.sourceButtonContainer}
          activeOpacity={0.7}
        />
      )}

      {/* Related Recipes Section */}
      {summaryData && summaryData.relatedRecipes.length > 0 && (
        <View style={[styles.section, { borderTopWidth: 0 }]}>
          <Text style={[styles.sectionTitle, { color: themeTextColor }]}>
            Related Recipes
          </Text>
          {summaryData.relatedRecipes.map((relatedRecipe) => (
            <Pressable
              key={relatedRecipe.id}
              onPress={() => {
                console.log(`Pushing to /recipe/${relatedRecipe.id}`);
                router.push({
                  pathname: "/recipe/[id]",
                  params: { id: relatedRecipe.id },
                });
              }}
              style={styles.relatedRecipeLinkContainer}
            >
              <Text
                style={[
                  styles.relatedRecipeLinkText,
                  { color: themeTintColor },
                ]}
              >
                • {relatedRecipe.title}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40, // Ensure space at the bottom
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 250, // Adjust height as needed
  },
  section: {
    padding: 15,
    borderTopWidth: StyleSheet.hairlineWidth,
    // borderTopColor will be set dynamically
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  summaryContentContainer: {
    marginBottom: 5,
  },
  summaryText: {
    // Base styles moved to ExpandableText, keep color style here
  },
  metaInfoContainer: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 15,
  },
  infoText: {
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sourceButtonContainer: {
    margin: 20,
  },
  relatedRecipeLinkContainer: {
    marginBottom: 8,
    marginLeft: 5,
  },
  relatedRecipeLinkText: {
    fontSize: 16,
    lineHeight: 22,
    textDecorationLine: "underline",
  },
  viewMoreText: {
    fontSize: 13,
    fontWeight: "bold",
    // Style now primarily controlled within ExpandableText,
    // but can be overridden/augmented via buttonTextStyle prop
  },
  // --- Skeleton Styles ---
  skeletonOuterContainer: {
    flex: 1, // Take full screen space initially
  },
  skeletonContentPadding: {
    padding: 15,
  },
  skeletonImage: {
    width: "100%",
    height: 250, // Match real image height
  },
  skeletonTitle: {
    height: 24,
    width: "70%",
    borderRadius: 4,
  },
  skeletonMetaRow: {
    flexDirection: "row",
    marginBottom: 15,
  },
  skeletonMetaItem: {
    height: 14,
    width: "30%",
    borderRadius: 4,
    marginRight: 15,
  },
  skeletonLine: {
    height: 14,
    borderRadius: 4,
    marginBottom: 8,
  },
  skeletonSectionTitle: {
    height: 20,
    width: "40%",
    borderRadius: 4,
  },
  // --- End Skeleton Styles ---
});
