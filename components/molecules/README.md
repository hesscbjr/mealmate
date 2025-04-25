# Molecules (`components/molecules/`)

## Purpose

This directory contains "molecule" components, which are relatively simple combinations of "atom" components working together as a unit. They form distinct parts of the UI but are not complex enough to be full sections (organisms).

## Key Components / Files

- `ExpandableText.tsx`: Displays text that can be collapsed or expanded.
- `IconButton.tsx`: A button component that primarily displays an icon.
- `IngredientsList.tsx`: Displays a formatted list of recipe ingredients.
- `InstructionsList.tsx`: Displays a formatted list of recipe instructions (analyzed or raw).
- `RecipeCard.tsx`: Represents a single recipe item in a list format, often used in `RecipeList`.

## Interactions

- Molecules often combine `atoms` like `Button`, `Text`, and `Icon`.
- They receive data and callbacks as props from parent components (usually `organisms` or screens).
- They should generally be kept stateless or manage only simple UI state (like expansion state).

## Configuration Requirements

- Ensure necessary `atom` components are available.
- Pass required props (like data arrays, theme colors, event handlers) from parent components.

## Development Guidelines

- Molecules should be reusable across different parts of the application.
- Avoid complex logic or data fetching within molecules.
- Focus on composing atoms to create a specific UI pattern.
- Define clear props using TypeScript interfaces.
- Use `nativewind` or `StyleSheet.create` for styling.

## Usage Examples

See individual component `README.md` files for specific usage examples:

- `ExpandableText.README.md`
- `IconButton.README.md`
- `IngredientsList.README.md`
- `InstructionsList.README.md`
- `RecipeCard.README.md`
