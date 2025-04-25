import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useLayoutEffect } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import IconButton from "@/components/molecules/IconButton";
import { useRecipeDetails } from "@/hooks/useRecipeDetails";
import { useThemeColor } from "@/hooks/useThemeColor";
import {
  RecipeInstructionStep,
  SpoonacularRecipe,
} from "@/services/spoonacular";
import { useRecipeStore } from "@/store/recipes";
import { parseAndLinkSummary } from "@/utils/textUtils";

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();

  const themeBackgroundColor = useThemeColor({}, "background");
  const themeTextColor = useThemeColor({}, "text");
  const themeSubtleTextColor = useThemeColor({}, "icon");
  const themeTintColor = useThemeColor({}, "tint");
  const themeBorderColor = useThemeColor({}, "icon");

  const { recipeDetails, loading, error } = useRecipeDetails(id);

  // --- Zustand Recipe Store --- //
  const { toggleStar } = useRecipeStore();
  const currentlyStarred = useRecipeStore((state) =>
    state.isStarred(recipeDetails?.id ?? -1)
  );

  // Set header title and star button dynamically
  useLayoutEffect(() => {
    if (recipeDetails) {
      navigation.setOptions({
        title: recipeDetails.title,
        headerRight: () => (
          <IconButton
            onPress={() => toggleStar(recipeDetails as SpoonacularRecipe)}
            name={currentlyStarred ? "star" : "staro"}
            size={24}
            color={themeTintColor}
            iconSet="antdesign"
          />
        ),
      });
    }
  }, [navigation, recipeDetails, currentlyStarred, toggleStar, themeTintColor]);

  const handleOpenSourceUrl = () => {
    if (recipeDetails?.sourceUrl) {
      WebBrowser.openBrowserAsync(recipeDetails.sourceUrl);
    }
  };

  if (loading) {
    return (
      <View
        style={[
          styles.centeredContainer,
          { backgroundColor: themeBackgroundColor },
        ]}
      >
        <ActivityIndicator size="large" color={themeTintColor} />
      </View>
    );
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

  // Helper to render instruction steps
  const renderInstructionStep = (
    item: RecipeInstructionStep,
    index: number
  ) => (
    <View key={`step-${index}`} style={styles.instructionStep}>
      <Text style={[styles.stepNumber, { color: themeTintColor }]}>
        {item.number}
      </Text>
      <Text style={[styles.stepText, { color: themeTextColor }]}>
        {item.step}
      </Text>
    </View>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: themeBackgroundColor }]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Use Stack.Screen to configure header options if preferred over useLayoutEffect */}
      {/* <Stack.Screen options={{ title: recipeDetails.title }} /> */}

      <Image source={{ uri: recipeDetails.image }} style={styles.image} />

      <View style={styles.section}>
        <Text style={[styles.title, { color: themeTextColor }]}>
          {recipeDetails.title}
        </Text>
        <View style={styles.summaryContainer}>
          {parseAndLinkSummary(recipeDetails.summary).map((segment, index) => {
            if (segment.type === "link") {
              return (
                <Link
                  key={`sum-${index}`}
                  href={`/recipe/${segment.recipeId}`}
                  asChild
                >
                  <Text style={{ color: "#007AFF" }}>{segment.content}</Text>
                </Link>
              );
            } else {
              return (
                <Text
                  key={`sum-${index}`}
                  style={[styles.summaryText, { color: themeSubtleTextColor }]}
                >
                  {segment.content}
                </Text>
              );
            }
          })}
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.infoText, { color: themeTextColor }]}>
            ⏱️ {recipeDetails.readyInMinutes} mins
          </Text>
          <Text style={[styles.infoText, { color: themeTextColor }]}>
            🍽️ Serves {recipeDetails.servings}
          </Text>
        </View>
        {/* Add dietary flags if needed */}
      </View>

      {/* Ingredients */}
      {recipeDetails.extendedIngredients &&
        recipeDetails.extendedIngredients.length > 0 && (
          <View style={[styles.section, { borderTopColor: themeBorderColor }]}>
            <Text style={[styles.sectionTitle, { color: themeTextColor }]}>
              Ingredients
            </Text>
            {recipeDetails.extendedIngredients.map((ing, index) => (
              <Text
                key={`ing-${index}`}
                style={[styles.listItem, { color: themeTextColor }]}
              >
                • {ing.original}
              </Text>
            ))}
          </View>
        )}

      {/* Instructions */}
      {recipeDetails.analyzedInstructions &&
        recipeDetails.analyzedInstructions.length > 0 && (
          <View style={[styles.section, { borderTopColor: themeBorderColor }]}>
            <Text style={[styles.sectionTitle, { color: themeTextColor }]}>
              Instructions
            </Text>
            {recipeDetails.analyzedInstructions.map((instructionSet, index) => (
              <View key={`instruction-set-${index}`}>
                {instructionSet.name && (
                  <Text
                    style={[
                      styles.instructionSetName,
                      { color: themeTextColor },
                    ]}
                  >
                    {instructionSet.name}
                  </Text>
                )}
                {instructionSet.steps.map(renderInstructionStep)}
              </View>
            ))}
          </View>
        )}

      {/* Fallback for raw instructions string */}
      {!recipeDetails.analyzedInstructions?.length &&
        recipeDetails.instructions && (
          <View style={[styles.section, { borderTopColor: themeBorderColor }]}>
            <Text style={[styles.sectionTitle, { color: themeTextColor }]}>
              Instructions
            </Text>
            <Text style={[styles.listItem, { color: themeTextColor }]}>
              {recipeDetails.instructions}
            </Text>
          </View>
        )}

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
  summaryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
    lineHeight: 20,
  },
  summaryText: {
    fontSize: 14,
    marginRight: 3,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  listItem: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 5,
    marginLeft: 5,
  },
  instructionSetName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  instructionStep: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "flex-start",
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
    minWidth: 20, // Ensure space for number
    textAlign: "right",
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
  },
  sourceButtonContainer: {
    margin: 20,
  },
});
