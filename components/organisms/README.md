# Organisms

This directory contains organism components according to the Atomic Design methodology.
Organisms are assemblies of molecules functioning together as a distinct section of an interface.

These components form more complex parts of the UI, like headers, footers, or lists with multiple items.

## Key Components

- `PhotoList.tsx`: Displays a grid or list of photos using `PhotoItem` molecules.
- `RecipeList.tsx`: Displays a list of recipes using `RecipeCard` molecules.

## Usage

Import organisms into screens or templates:

```typescript
import RecipeList from "@/components/organisms/RecipeList";
```
