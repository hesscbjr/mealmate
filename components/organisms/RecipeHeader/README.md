# Recipe Header Component

## Purpose

Displays the header for the recipe detail screen, including navigation controls (back button), recipe title, key metadata (prep time, servings, missing ingredients), and actions (starring).

## Key Components / Files

- `RecipeHeader.tsx`: The main component file.
- Imports `IconButton` from molecules for interactive elements.
- Uses `useThemeColor` hook for dynamic styling.

## Props

- `title` (string, required): The name of the recipe.
- `readyInMinutes` (number, required): The estimated preparation time.
- `servings` (number, required): The number of servings the recipe yields.
- `missedCount?` (string, optional): The count of missing ingredients.
- `isStarred` (boolean, required): Whether the recipe is currently starred/saved.
- `onToggleStar` (function, required): Callback function executed when the star icon is pressed.
- `onBackPress` (function, required): Callback function executed when the back icon is pressed.

## Usage Example

```tsx
import RecipeHeader from "@/components/organisms/RecipeHeader";

// Inside your screen component

const handleToggleStar = () => {
  // Logic to toggle star status
};

const handleBack = () => {
  // Logic to navigate back
};

// ...

navigation.setOptions({
  headerShown: true,
  header: () => (
    <RecipeHeader
      title="Spaghetti Carbonara"
      readyInMinutes={30}
      servings={4}
      missedCount="1"
      isStarred={false}
      onToggleStar={handleToggleStar}
      onBackPress={handleBack}
    />
  ),
});
```
