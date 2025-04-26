/**
 * Formats an array of ingredient strings into a single title-cased, comma-separated string.
 *
 * @param ingredients - An array of ingredient names.
 * @returns A formatted string, e.g., "Ingredient One, Ingredient Two".
 */
export const formatIngredientList = (ingredients: string[]): string => {
  if (!ingredients || ingredients.length === 0) {
    return "";
  }

  return ingredients
    .map((ingredient) =>
      ingredient
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    )
    .join(", ");
}; 