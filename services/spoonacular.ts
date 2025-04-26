// A simple approach to potentially get the API key.
// It's better to use a dedicated library like react-native-dotenv if possible,
// but process.env might work in some Expo setups, especially with web.
const SPOONACULAR_API_KEY = process.env.EXPO_PUBLIC_SPOONACULAR_API_KEY;

// Basic check if the key is loaded - provide a warning if not.
if (!SPOONACULAR_API_KEY) {
  console.warn(
    "Spoonacular API Key not found. Please ensure SPOONACULAR_API_KEY is set in your environment variables (.env file)."
  );
}

const API_URL = "https://api.spoonacular.com/recipes/complexSearch";

// Interface based on the user's provided example and the JSON structure
export interface SpoonacularRecipe {
  id: number;
  title: string;
  image: string;
  // Added fields from the example JSON that might be useful
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  summary: string;
  // Basic dietary flags
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  // Extra info from the example
  usedIngredientCount?: number; // Made optional as they might not always be present
  missedIngredientCount?: number; // Made optional
  likes?: number; // Made optional
}

// --- Interface for detailed recipe information ---
// Based on Spoonacular /recipes/{id}/information endpoint
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
  length?: { number: number; unit: string }; // Optional length for steps
}

export interface AnalyzedInstruction {
  name: string;
  steps: RecipeInstructionStep[];
}

export interface RecipeDetails extends SpoonacularRecipe { // Extends base recipe info
  extendedIngredients: RecipeIngredient[];
  instructions: string | null; // Raw instructions string (might be null)
  analyzedInstructions: AnalyzedInstruction[];
  // Add other potentially useful fields from the endpoint if needed
  // e.g., winePairing, taste, nutrition, etc.
}

import { RecipeSortPreference } from "@/store/user"; // Import the type

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

  // Prepare the ingredients query string (lowercase, trim, join)
  const query = ingredients
    .map((i) => i.toLowerCase().trim())
    .filter((i) => i) // Remove empty strings after trimming
    .join(",");

  if (!query) {
    console.log("No valid ingredients provided to fetchRecipesByIngredients.");
    return []; // Return empty if no valid ingredients are passed
  }

  // Construct the request URL
  const url = `${API_URL}?includeIngredients=${encodeURIComponent(
    query
  )}&number=5&offset=${offset}&addRecipeInformation=true&instructionsRequired=true&sort=${sortPreference}&ignorePantry=true&apiKey=${SPOONACULAR_API_KEY}`;

  console.log("Fetching Spoonacular recipes with URL:", url); // Log the URL for debugging

  try {
    const response = await fetch(url);

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

    // Ensure data.results exists and is an array before returning
    if (data && Array.isArray(data.results)) {
      // You might want to add further validation here to ensure
      // each item in data.results matches the SpoonacularRecipe interface
      return data.results as SpoonacularRecipe[];
    } else {
      console.warn("Spoonacular API response did not contain 'results' array:", data);
      return []; // Return empty array if the structure is unexpected
    }
  } catch (error) {
    console.error("Network or parsing error fetching Spoonacular recipes:", error);
    // Re-throw the error or return an empty array/handle differently
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

  console.log("Fetching Spoonacular recipe details with URL:", detailsUrl);

  try {
    const response = await fetch(detailsUrl);

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

    // Basic validation
    if (data && typeof data === 'object' && data.id) {
      console.log("Spoonacular recipe details:", data);
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
    throw error; // Re-throw
  }
} 