import {
  RecipeDetails,
  fetchRecipeDetailsById,
} from "@/services/spoonacular";
import { useEffect, useState } from "react";

export function useRecipeDetails(recipeId: string | number | null) {
  const [recipeDetails, setRecipeDetails] = useState<RecipeDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset state if recipeId is null or invalid
    if (!recipeId) {
      setRecipeDetails(null);
      setLoading(false);
      setError(null);
      return;
    }

    const run = async () => {
      setLoading(true);
      setError(null);
      setRecipeDetails(null); // Clear previous results
      try {
        const result = await fetchRecipeDetailsById(recipeId);
        setRecipeDetails(result);
      } catch (err: any) {
        console.error(`Recipe details fetch failed for ID ${recipeId}:`, err);
        setError(err.message || "Failed to fetch recipe details.");
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [recipeId]); // Depend only on recipeId

  return { recipeDetails, loading, error };
} 