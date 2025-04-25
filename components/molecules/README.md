# Molecules (`components/molecules/`)

## Purpose

This directory contains molecule components, which are relatively simple combinations of atoms that form distinct UI elements.
They represent tangible pieces of the interface like a search input field with a button, or a single item in a list.

## Key Components

- **`DietaryOption.tsx`**: A toggleable pill button representing a single dietary restriction choice. Used within the `DietaryRestrictionPicker`.
- **`RecipeCard.tsx`**: Displays a preview of a recipe (image, title, maybe tags). Used in `RecipeList`.
- **`PhotoItem.tsx`**: Displays a photo thumbnail, potentially with selection state or actions. Used in image selection screens.
- **`ScanImage.tsx`**: Wraps an `Image` component, adding an optional animated scanning bar overlay controlled by a `loading` prop. Useful for indicating processing on an image.
- _Add other molecules here as they are created..._

## Interactions

- Molecules combine `atom` components.
- They receive props (including data and event handlers) from parent components (usually `organisms`).
- They should generally not contain complex internal state or logic beyond what's necessary for their immediate presentation based on props.

## Configuration

No specific configuration is typically required for molecules themselves.

## Development Guidelines

- Keep molecules focused on a single UI task.
- Ensure they are reusable and configurable via props.
- Use atoms for the base building blocks.
- Style using `StyleSheet.create` or `nativewind`.
- Import only from `atoms` or standard libraries.

## Usage Examples

```tsx
import DietaryOption from "@/components/molecules/DietaryOption";

const MyComponent = () => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <DietaryOption
      label="Vegan"
      selected={isSelected}
      onPress={() => setIsSelected(!isSelected)}
    />
  );
};
```

### `ScanImage` Example

```tsx
import ScanImage from "@/components/molecules/ScanImage";
import { useState } from "react";

const MyImageProcessor = ({ imageUri }) => {
  const [isProcessing, setIsProcessing] = useState(true);

  // Simulate processing finish after 3 seconds
  setTimeout(() => setIsProcessing(false), 3000);

  return (
    <ScanImage
      source={{ uri: imageUri }}
      containerStyle={{ width: 200, height: 200, borderRadius: 10 }}
      resizeMode="cover"
      loading={isProcessing}
      scanColor="rgba(0, 255, 255, 0.6)"
      scanHeight={5}
      duration={800} // Time for scan down OR up
      pauseDuration={600} // Pause time at the top
    />
  );
};
```
