# Hooks Directory (`hooks/`)

(Generated by Gemini 2.5 Pro)

This directory contains custom React hooks used across the MealMate application to encapsulate reusable logic, state management, and side effects.

## Purpose

Custom hooks help keep components clean and focused on rendering UI by abstracting away complex logic, API calls, animations, or interactions with device features.

## Key Hooks

- `useAppColorScheme.ts`: Determines the effective color scheme (`'light'` or `'dark'`) based on the user's preference stored in `useUserStore` (`'light'`, `'dark'`, or `'system'`) and the device's native color scheme. Defaults to `'light'` if the user preference is `'system'` and the device has no preference.
- `useCapturePermissions.ts`: Manages permissions required for image capture (Camera and Media Library). It checks current status, requests permissions if needed, and provides status flags (`loading`, `granted`, `denied`) along with functions to request permissions or open app settings.
- `useIngredientExtraction.ts`: Handles the process of extracting ingredients from an image URI. It takes a URI, reads the file as base64, calls the OpenAI service (`extractIngredients`), and returns the extraction result (`ingredients` array, optional `description`), loading state, and error state.
- `usePreviewAnimation.ts`: Manages the complex animation sequence for the `preview.tsx` screen. It orchestrates the transition of the image from a loading state (centered, larger) to a final state (top corner, smaller) using `react-native-reanimated`. It returns animated styles, animation progress, and layout values needed for the animation.
- `useRecipeDetails.ts`: Fetches detailed information for a specific recipe ID using `fetchRecipeDetailsById` from the Spoonacular service. Manages loading, error, and not found states for the fetch operation.
- `useRecipeSuggestions.ts`: Fetches a list of recipe suggestions based on a list of ingredients. It uses `fetchRecipesByIngredients` (Spoonacular service), incorporates the user's sorting preference from `useUserStore`, handles pagination/offset for refreshing recipes, and manages loading and error states.
- `useThemeColor.ts`: A utility hook to retrieve theme-specific colors from the `Colors` constant based on the current `useAppColorScheme`. It can return a single color value or an object mapping multiple color names to their values for the current theme.

## Development Guidelines

- Hooks should have a single, clear purpose.
- Name hooks starting with `use` (e.g., `useUserData`).
- Keep hooks focused on logic and side effects; avoid returning JSX directly (unless it's a render prop pattern, which is generally discouraged here).
- Document the hook's purpose, parameters, and return values clearly (using JSDoc or comments).

## Usage Examples

```tsx
// Example usage within a screen component
import { useRecipeSuggestions } from "@/hooks/useRecipeSuggestions";
import { useThemeColor } from "@/hooks/useThemeColor";

function RecipeSuggestScreen({ ingredientsList }) {
  const { recipes, loading, error, refreshRecipes } =
    useRecipeSuggestions(ingredientsList);
  const backgroundColor = useThemeColor({}, "background");

  // ... render UI based on recipes, loading, error ...

  return (
    <View style={{ flex: 1, backgroundColor }}>
      {/* ... List, Loading Indicator, Error Message ... */}
      <Button title="Refresh" onPress={refreshRecipes} disabled={loading} />
    </View>
  );
}
```
