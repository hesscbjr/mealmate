
import { RecipeSortPreference } from "@/store/user";

const SPOONACULAR_API_KEY = process.env.EXPO_PUBLIC_SPOONACULAR_API_KEY;

if (!SPOONACULAR_API_KEY) {
  console.warn(
    "Spoonacular API Key not found. Please ensure SPOONACULAR_API_KEY is set in your environment variables (.env file)."
  );
}

const API_URL = "https://api.spoonacular.com/recipes/complexSearch";

export interface SpoonacularRecipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  summary: string;
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  usedIngredientCount?: number;
  missedIngredientCount?: number;
  likes?: number;
}

export interface RecipeIngredient {
  id: number;
  aisle: string | null;
  image: string | null;
  consistency: string | null;
  name: string;
  nameClean: string | null;
  original: string;
  originalName: string;
  amount: number;
  unit: string;
  meta: string[];
  measures: {
    us: { amount: number; unitShort: string; unitLong: string };
    metric: { amount: number; unitShort: string; unitLong: string };
  };
}

export interface RecipeInstructionStep {
  number: number;
  step: string;
  ingredients: { id: number; name: string; localizedName: string; image: string }[];
  equipment: { id: number; name: string; localizedName: string; image: string }[];
  length?: { number: number; unit: string };
}

export interface AnalyzedInstruction {
  name: string;
  steps: RecipeInstructionStep[];
}

export interface RecipeDetails extends SpoonacularRecipe {
  extendedIngredients: RecipeIngredient[];
  instructions: string | null;
  analyzedInstructions: AnalyzedInstruction[];
}


/**
 * Fetches recipes from Spoonacular based on a list of ingredients.
 * @param ingredients - An array of ingredient strings.
 * @param sortPreference - The sorting preference from the user store.
 * @param offset - The offset for pagination.
 * @returns A promise that resolves to an array of SpoonacularRecipe objects.
 */
export async function fetchRecipesByIngredients(
  ingredients: string[],
  sortPreference: RecipeSortPreference,
  offset: number = 0
): Promise<SpoonacularRecipe[]> {
  if (!SPOONACULAR_API_KEY) {
    throw new Error("Spoonacular API Key is not configured.");
  }

  const query = ingredients
    .map((i) => i.toLowerCase().trim())
    .filter((i) => i)
    .join(",");

  if (!query) {
    return [];
  }

  const url = `${API_URL}?includeIngredients=${encodeURIComponent(
    query
  )}&number=5&offset=${offset}&addRecipeInformation=true&instructionsRequired=true&sort=${sortPreference}&ignorePantry=true&apiKey=${SPOONACULAR_API_KEY}`;

  try {
    console.log("fetching recipes for", query);
    const response = await fetch(url);
    console.log("got recipes for", query);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Spoonacular API error: ${response.status} - ${errorText}`,
        `URL: ${url}`
      );
      throw new Error(
        `Spoonacular API error (${response.status}): Failed to fetch recipes.`
      );
    }

    const data = await response.json();

    if (data && Array.isArray(data.results)) {
      return data.results as SpoonacularRecipe[];
    } else {
      console.warn("Spoonacular API response did not contain 'results' array:", data);
      return [];
    }
  } catch (error) {
    console.error("Network or parsing error fetching Spoonacular recipes:", error);
    throw error;
  }
}

/**
 * Fetches detailed information for a specific recipe by its ID.
 * @param id - The Spoonacular ID of the recipe.
 * @returns A promise that resolves to the detailed RecipeDetails object.
 */
export async function fetchRecipeDetailsById(
  id: number | string
): Promise<RecipeDetails> {
  if (!SPOONACULAR_API_KEY) {
    throw new Error("Spoonacular API Key is not configured.");
  }

  const detailsUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${SPOONACULAR_API_KEY}`;

  try {
    console.log("fetching details for", id);
    const response = await fetch(detailsUrl);
    console.log("got details for", id);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Spoonacular details API error: ${response.status} - ${errorText}`,
        `URL: ${detailsUrl}`
      );
      throw new Error(
        `Spoonacular API error (${response.status}): Failed to fetch recipe details.`
      );
    }

    const data: RecipeDetails = await response.json();

    if (data && typeof data === 'object' && data.id) {
      return data;
    } else {
      console.warn("Spoonacular details API response was not a valid object:", data);
      throw new Error("Invalid data received from Spoonacular details API.");
    }
  } catch (error) {
    console.error(
      "Network or parsing error fetching Spoonacular recipe details:",
      error
    );
    throw error;
  }
} 