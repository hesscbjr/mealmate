import { extractIngredients } from "@/services/openai";
import { readFileAsBase64 } from "@/utils/fileSystem";
import { useEffect, useState } from "react";

export interface ExtractionResult {
  ingredients: string[];
  description?: string;
}

export function useIngredientExtraction(uri: string | null) {
  const [data, setData] = useState<ExtractionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!uri) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    const run = async () => {
      setLoading(true);
      setError(null);
      setData(null);

      try {
        const base64 = await readFileAsBase64(uri);
        const result = await extractIngredients(base64);
        setData(result);
      } catch (err: any) {
        console.error("Ingredient extraction failed:", err);
        setError(err.message || "Failed to extract ingredients.");
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [uri]);

  return { data, loading, error };
}
