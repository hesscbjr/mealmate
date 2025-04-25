# Ingredient List (`IngredientsList.tsx`)

## Purpose

This component displays a list of recipe ingredients in a structured format. It includes a title ("Ingredients") and formats each ingredient item with a bullet point.

## Key Features

- Renders a section title.
- Maps over an array of `RecipeIngredient` objects.
- Displays the `original` string for each ingredient.
- Allows customization of styles and colors via props.
- Handles the case where no ingredients are provided by rendering nothing.

## Props

| Prop          | Type                   | Required | Default | Description                                      |
| ------------- | ---------------------- | -------- | ------- | ------------------------------------------------ |
| `ingredients` | `RecipeIngredient[]`   | Yes      | -       | An array of ingredient objects to display.       |
| `style`       | `StyleProp<ViewStyle>` | No       | -       | Custom style for the main container `View`.      |
| `titleStyle`  | `StyleProp<TextStyle>` | No       | -       | Custom style for the "Ingredients" title `Text`. |
| `itemStyle`   | `StyleProp<TextStyle>` | No       | -       | Custom style for each ingredient item `Text`.    |
| `titleColor`  | `string`               | No       | `#000`  | Color for the title text.                        |
| `itemColor`   | `string`               | No       | `#000`  | Color for the ingredient item text.              |
| `borderColor` | `string`               | No       | `#ccc`  | Color for the top border of the section.         |

## Interactions

- Receives the `ingredients` array and theme colors/styles as props from a parent component (e.g., a recipe detail screen).
- Does not have internal state or side effects.

## Configuration Requirements

- The parent component needs to fetch the recipe details, including the `extendedIngredients` array.
- The `RecipeIngredient` type should be imported from the service definition (`@/services/spoonacular`).

## Development Guidelines

- Keep this component focused solely on presenting the list.
- Ensure props are clearly defined and typed.

## Usage Example

```tsx
import IngredientsList from "@/components/molecules/IngredientsList";
import { useThemeColor } from "@/hooks/useThemeColor"; // Assuming hook for theme colors
import { mockIngredients } from "./mockData"; // Assuming mock data for ingredients

const RecipeScreen = () => {
  const themeTextColor = useThemeColor({}, "text");
  const themeBorderColor = useThemeColor({}, "icon");

  return (
    <IngredientsList
      ingredients={mockIngredients} // Pass the fetched or mock ingredients array
      titleColor={themeTextColor}
      itemColor={themeTextColor}
      borderColor={themeBorderColor}
      // Optionally add custom styles
      // style={{ marginTop: 10 }}
      // titleStyle={{ fontSize: 22 }}
    />
  );
};
```
