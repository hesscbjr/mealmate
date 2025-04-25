# Molecules

This directory contains molecule components according to the Atomic Design methodology.
Molecules are groups of atoms bonded together and are the smallest fundamental units of a compound.

These components are built from atoms and represent more complex UI elements like forms, cards, or navigation items.

## Key Components

- `RecipeCard.tsx`: Displays a summary of a single recipe.
- `PhotoItem.tsx`: Displays a single photo thumbnail, potentially with actions.

## Usage

Import molecules into organisms or screens as needed:

```typescript
import RecipeCard from "@/components/molecules/RecipeCard";
```
