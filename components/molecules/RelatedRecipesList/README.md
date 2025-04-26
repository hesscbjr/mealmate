# Related Recipes List (`RelatedRecipesList`)

## Purpose

Displays a list of related recipes, typically extracted from a recipe summary, with links to navigate to their respective detail pages.

## Key Components / Files

- `RelatedRecipesList.tsx`: The main component file.

## Props

- `relatedRecipes`: An array of `RelatedRecipe` objects, each containing `id` and `title`.
- `titleColor`: The color for the section title text.
- `linkColor`: The color for the recipe link text.

## Usage Example

```tsx
import RelatedRecipesList from "@/components/molecules/RelatedRecipesList/RelatedRecipesList";
import { RelatedRecipe } from "@/utils/textUtils"; // Ensure this type is exported

const related: RelatedRecipe[] = [
  { id: "123", title: "Another Pasta Dish" },
  { id: "456", title: "Similar Soup Recipe" },
];

// Inside your component's render method:
<RelatedRecipesList
  relatedRecipes={related}
  titleColor="#333"
  linkColor="blue"
/>;
```
