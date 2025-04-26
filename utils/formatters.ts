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