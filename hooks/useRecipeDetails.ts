import {
  RecipeDetails,
  fetchRecipeDetailsById,
} from "@/services/spoonacular";
import { useEffect, useState } from "react";

// Define a custom error type if needed, or check error message/status
// For simplicity, we'll check the error message for "404"
// A more robust solution might involve custom error classes or status codes
// passed up from the fetch function.

export function useRecipeDetails(recipeId: string | number | null) {
  const [recipeDetails, setRecipeDetails] = useState<RecipeDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false); // <-- Add notFound state

  useEffect(() => {
    // Reset state if recipeId is null or invalid
    if (!recipeId) {
      setRecipeDetails(null);
      setLoading(false);
      setError(null);
      setNotFound(false); // <-- Reset notFound
      return;
    }

    const run = async () => {
      setLoading(true);
      setError(null);
      setNotFound(false); // <-- Reset notFound on new fetch
      setRecipeDetails(null); // Clear previous results
      try {
        const result = await fetchRecipeDetailsById(recipeId);
        setRecipeDetails(result);
      } catch (err: any) {
        console.error(`Recipe details fetch failed for ID ${recipeId}:`, err);
        // Check if the error message indicates a 404 Not Found
        if (err.message && err.message.includes("(404)")) {
          setNotFound(true); // <-- Set notFound specifically for 404
          setError(null); // Clear generic error if it's just 'not found'
        } else {
          setError(err.message || "Failed to fetch recipe details.");
        }
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [recipeId]); // Depend only on recipeId

  return { recipeDetails, loading, error, notFound }; // <-- Return notFound
} 