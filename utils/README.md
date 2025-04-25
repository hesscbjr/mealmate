# Utilities

This directory contains helper functions and utility modules used across the application.

## Purpose

Utilities encapsulate reusable logic that doesn't belong to a specific component or service. This promotes DRY (Don't Repeat Yourself) principles and keeps component logic focused.

## Files

### `shuffleArray.ts`

- **Purpose**: Provides a function to randomize the order of elements in an array.
- **Exports**: `shuffleArray<T>(array: T[]): T[]`
  - Takes an array of any type (`T`).
  - Returns a _new_ array with the elements randomly shuffled using the Fisher-Yates (Knuth) algorithm.
  - Does _not_ modify the original array.
- **Usage**: Useful for randomizing lists, such as loading messages or potentially recipe suggestions before displaying them.

```typescript
import { shuffleArray } from "@/utils/shuffleArray";

const originalMessages = ["Msg 1", "Msg 2", "Msg 3"];
const shuffled = shuffleArray(originalMessages);
// shuffled might be ["Msg 3", "Msg 1", "Msg 2"] (order is random)
// originalMessages remains ["Msg 1", "Msg 2", "Msg 3"]
```

## Development Guidelines

- Functions should be pure (predictable output for the same input, no side effects) whenever possible.
- Keep functions small and focused on a single task.
- Use clear function and parameter names.
- Add JSDoc comments to explain the purpose, parameters, and return values of exported functions.
- Avoid dependencies on specific components or UI elements.
