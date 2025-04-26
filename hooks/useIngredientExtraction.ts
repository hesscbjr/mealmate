import { extractIngredients } from "@/services/openai";
import { readFileAsBase64 } from "@/utils/fileSystem";
import { useEffect, useState } from "react";

// Define the structure returned by the hook
export interface ExtractionResult {
  ingredients: string[];
  description?: string;
}

export function useIngredientExtraction(uri: string | null) {
  // State holds the result object or null
  const [data, setData] = useState<ExtractionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!uri) {
      // Reset state if URI is cleared
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    const run = async () => {
      setLoading(true);
      setError(null);
      setData(null); // Clear previous data

      try {
        const base64 = await readFileAsBase64(uri);
        const result = await extractIngredients(base64);
        setData(result); // Set the full result object
      } catch (err: any) { // Catch specific error type if possible
        console.error("Ingredient extraction failed:", err);
        setError(err.message || "Failed to extract ingredients.");
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [uri]);

  // Return the data object along with loading and error states
  return { data, loading, error };
}
