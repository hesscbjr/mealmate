# Molecules (`components/molecules/`)

## Purpose

This directory contains molecule components, which are relatively simple combinations of atoms that form distinct UI elements.
They represent tangible pieces of the interface like a search input field with a button, or a single item in a list.

## Key Components

- **`DietaryOption.tsx`**: A toggleable pill button representing a single dietary restriction choice. Used within the `DietaryRestrictionPicker`.
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
