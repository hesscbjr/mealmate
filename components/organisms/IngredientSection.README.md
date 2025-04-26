# IngredientSection (`components/organisms/IngredientSection.tsx`)

## Purpose

This component is responsible for displaying the results of ingredient extraction from an image. It handles various states:

- Displaying an error message if ingredient extraction fails.
- Displaying specific messages if no ingredients are found (with or without a general image description).
- Displaying the list of extracted ingredients.
- Displaying recipe suggestions based on the extracted ingredients.
- Handling errors during recipe fetching.
- Providing a button to refresh recipe suggestions.

## Key Components Used

- `FullScreenMessage` (Molecule): Used for displaying error states and messages when no ingredients are found.
- `FadeInView` (Atom): Used to animate the appearance of the ingredient list and recipe section.
- `Text` (Atom): Used to display ingredient names.
- `Button` (Atom): Used for the "Try Again" and "Get 5 More" recipe refresh actions.
- `Icon` (Atom): Used within the refresh button.
- `RecipeList` (Organism): Used to display the fetched recipe suggestions.

## Interactions

- Receives ingredient data (`ingredientData`), potential ingredient errors (`ingredientError`), recipe data (`recipes`), potential recipe errors (`recipeError`), recipe loading state (`recipeLoading`), and theme information (`themeBackgroundColor`) via props.
- Receives callback functions `onRetry` (triggered when ingredient extraction fails or no ingredients are found) and `refreshRecipes` (triggered to fetch new recipes) via props.
- Renders different UI based on the state of `ingredientData`, `ingredientError`, `recipes`, `recipeError`, and `recipeLoading`.
- Calls `onRetry` when the user taps the "Try Again" button.
- Calls `refreshRecipes` when the user taps the "Get 5 More" button.

## Configuration

- Requires all props defined in `IngredientSectionProps` to be passed down from the parent component (likely a screen like `PreviewScreen`).

## Development Guidelines

- This component purely handles the presentation logic based on the props received.
- It does not perform any data fetching itself.
- Styles are currently defined locally within the component using `StyleSheet.create`. Consider moving to a shared styling solution if reused elsewhere.

## Usage Example

```tsx
import IngredientSection from "@/components/organisms/IngredientSection";

// Inside PreviewScreen.tsx or similar:

// ... hooks to get data and handlers ...

return (
  <IngredientSection
    ingredientData={ingredientData} // { ingredients: ['apple', 'banana'], description?: 'fruit' } | null
    ingredientError={ingredientError} // string | null
    onRetry={handleRetry} // () => void
    recipes={recipes} // SpoonacularRecipe[] | null
    recipeError={recipeError} // string | null
    recipeLoading={recipeLoading} // boolean
    refreshRecipes={refreshRecipes} // () => void
    themeBackgroundColor={themeBackgroundColor} // string (e.g., '#ffffff')
  />
);
```
