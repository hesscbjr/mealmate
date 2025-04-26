import {
  RecipeDetails,
  fetchRecipeDetailsById,
} from "@/services/spoonacular";
import { useEffect, useState } from "react";

export function useRecipeDetails(recipeId: string | number | null) {
  const [recipeDetails, setRecipeDetails] = useState<RecipeDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!recipeId) {
      setRecipeDetails(null);
      setLoading(false);
      setError(null);
      setNotFound(false);
      return;
    }

    const run = async () => {
      setLoading(true);
      setError(null);
      setNotFound(false);
      setRecipeDetails(null);
      try {
        const result = await fetchRecipeDetailsById(recipeId);
        setRecipeDetails(result);
      } catch (err: any) {
        console.error(`Recipe details fetch failed for ID ${recipeId}:`, err);
        if (err.message && err.message.includes("(404)")) {
          setNotFound(true);
          setError(null);
        } else {
          setError(err.message || "Failed to fetch recipe details.");
        }
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [recipeId]);

  return { recipeDetails, loading, error, notFound };
} 