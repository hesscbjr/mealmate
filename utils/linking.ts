import * as Linking from "expo-linking";

/**
 * Creates a deep link URL for a given recipe ID using the app's scheme.
 * @param recipeId The ID of the recipe.
 * @returns A string URL that will open the recipe detail screen when used.
 */
export function createRecipeLink(recipeId: string | number): string {
  return Linking.createURL(`/recipe/${recipeId}`);
}
