import {
  SpoonacularRecipe,
  fetchRecipesByIngredients,
} from "@/services/spoonacular";
import { useEffect, useState } from "react";

export function useRecipeSuggestions(ingredients: string[] | null) {
  const [recipes, setRecipes] = useState<SpoonacularRecipe[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset state if ingredients are null or empty
    if (!ingredients || ingredients.length === 0) {
      setRecipes(null);
      setLoading(false);
      setError(null);
      return;
    }

    const run = async () => {
      setLoading(true);
      setError(null);
      setRecipes(null); // Clear previous results
      try {
        const result = await fetchRecipesByIngredients(ingredients);
        setRecipes(result);
      } catch (err: any) {
        console.error("Recipe suggestion fetch failed:", err);
        setError(err.message || "Failed to fetch recipes.");
      } finally {
        setLoading(false);
      }
    };

    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(ingredients)]); // Depend on the stringified ingredients array

  return { recipes, loading, error };
} 