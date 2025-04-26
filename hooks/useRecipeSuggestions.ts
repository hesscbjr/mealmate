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

  const fetchRecipesInternal = useCallback(async (currentOffset: number) => {
    if (!ingredients || ingredients.length === 0) {
      setRecipes(null);
      setOffset(0);
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
      setOffset(currentOffset + 5);
    } catch (err: any) {
      console.error("Recipe suggestion fetch failed:", err);
      setError(err.message || "Failed to fetch recipes.");
    } finally {
      setLoading(false);
    }
  }, [ingredients, sortPreference]);

  useEffect(() => {
    if (ingredients && ingredients.length > 0) {
      setRecipes(null);
      setOffset(0);
      fetchRecipesInternal(0);
    } else {
      setRecipes(null);
      setOffset(0);
      setLoading(false);
      setError(null);
    }
  }, [ingredients, sortPreference]);

  const refreshRecipes = useCallback(() => {
    fetchRecipesInternal(offset);
  }, [fetchRecipesInternal, offset]);

  return { recipes, loading, error, refreshRecipes };
}
