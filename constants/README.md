# Constants

This directory contains constant values used throughout the application.

## Purpose

Centralizing constants improves maintainability and consistency. Instead of hardcoding values like colors, API keys, or static lists in multiple components, define them here and import them where needed.

## Files

### `Colors.ts`

- **Purpose**: Defines color palettes for light and dark themes.
- **Exports**: `Colors` object containing color names and their corresponding hex values.
- **Usage**: Typically used within the `useThemeColor` hook or potentially for specific component styling needs.

### `LoadingMessages.ts`

- **Purpose**: Defines arrays of messages to be displayed during loading states.
- **Exports**:
  - `INGREDIENT_LOADING_MESSAGES`: An array of strings used when identifying ingredients from an image.
- **Usage**: Imported by components that need to display loading text, often used with the `TypewriterText` component and potentially shuffled.

## Development Guidelines

- Use clear, uppercase, snake-case names for exported constants (e.g., `API_TIMEOUT`).
- Group related constants into logical files.
- Add comments explaining the purpose of non-obvious constants.
