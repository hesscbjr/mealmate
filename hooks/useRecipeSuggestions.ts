import {
  SpoonacularRecipe,
  fetchRecipesByIngredients,
} from "@/services/spoonacular";
import { useUserStore } from "@/store/user";
import { useCallback, useEffect, useState } from "react";

export function useRecipeSuggestions(ingredients: string[] | null) {
  const [recipes, setRecipes] = useState<SpoonacularRecipe[] | null>(null);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sortPreference = useUserStore((state) => state.recipeSortPreference);

  // Function to fetch recipes, takes the current offset
  const fetchRecipesInternal = useCallback(async (currentOffset: number) => {
    if (!ingredients || ingredients.length === 0) {
      setRecipes(null);
      setOffset(0); // Reset offset if ingredients are invalid
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const result = await fetchRecipesByIngredients(
        ingredients,
        sortPreference,
        currentOffset
      );
      setRecipes(result);
      // Increment offset for the *next* potential fetch
      setOffset(currentOffset + 5);
    } catch (err: any) {
      console.error("Recipe suggestion fetch failed:", err);
      setError(err.message || "Failed to fetch recipes.");
      // Optionally reset recipes on error?
      // setRecipes(null);
    } finally {
      setLoading(false);
    }
  }, [ingredients, sortPreference]);

  // Effect for initial fetch when ingredients or preference change
  useEffect(() => {
    if (ingredients && ingredients.length > 0) {
      setRecipes(null); // Clear previous recipes
      setOffset(0); // Reset offset for new ingredients/preference
      fetchRecipesInternal(0); // Fetch initial batch with offset 0
    } else {
      // Clear state if ingredients become null/empty
      setRecipes(null);
      setOffset(0);
      setLoading(false);
      setError(null);
    }
    // Intentionally excluding fetchRecipesInternal from dependencies
    // to only trigger on ingredient or preference change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredients, sortPreference]);

  // Function exposed to the component to fetch the *next* batch
  const refreshRecipes = useCallback(() => {
    // Use the current offset state for the next fetch
    fetchRecipesInternal(offset);
  }, [fetchRecipesInternal, offset]); // Depends on the internal fetcher and current offset

  return { recipes, loading, error, refreshRecipes };
}
