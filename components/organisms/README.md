# Organisms

## Purpose

This directory contains organism-level components according to Atomic Design principles. Organisms are complex UI components composed of molecules and atoms, representing distinct sections of an interface.

## Key Components

- `RecipeList`: Displays a list of recipe cards.
- `CameraView`: (Assumed future component) Handles camera interaction.
- `IngredientSection`: Displays extracted ingredients, handles related errors, and shows recipe suggestions with refresh functionality.
- `RecipeDetailSkeleton`: Displays a skeleton loader for the recipe detail screen.
- `RecipeHeader`: Displays the header for the recipe detail screen, including title, meta, and actions.

## Interactions

- Organisms orchestrate the display and interaction of multiple smaller components.
- They typically receive data and callbacks as props from screen-level components or state management.

## Configuration

- No specific configuration is typically required for organisms themselves, but they rely on props passed down.

## Development Guidelines

- Organisms should encapsulate a significant piece of UI functionality.
- Avoid putting business logic or direct data fetching inside organisms; pass data and handlers as props.
- Import components primarily from `molecules/` and `atoms/`.

## Usage Examples

```tsx
// Example usage within a screen component
import IngredientSection from "@/components/organisms/IngredientSection";

function MyScreen() {
  // ... fetch data, get handlers ...

  return (
    <IngredientSection
      ingredientData={data}
      ingredientError={error}
      onRetry={handleRetry}
      recipes={recipeData}
      // ... other props
    />
  );
}
```
