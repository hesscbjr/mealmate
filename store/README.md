# Store Directory

## Purpose

This directory contains global state management logic for the MealMate application, primarily using Zustand.

## Key Components / Files

- `onboarding.ts`: Manages the state related to the user onboarding flow, including user name, dietary restrictions, and completion status. It uses Zustand's `persist` middleware with `AsyncStorage` to save the state across app sessions.

## Configuration Requirements

Ensure `@react-native-async-storage/async-storage` and `zustand` are installed:

```bash
npm install zustand @react-native-async-storage/async-storage
# or
yarn add zustand @react-native-async-storage/async-storage
```

## Development Guidelines

- Each distinct piece of global state should reside in its own file (e.g., `user.ts`, `settings.ts`).
- Use descriptive names for stores and state properties.
- Leverage Zustand middleware (like `persist`) where appropriate for features like state persistence.
- Keep state structures as flat as possible.

## Usage

To use the store in your components:

```typescript
import { useUserStore } from "@/store/user";

function MyComponent() {
  const { name, setName, completedOnboarding, markOnboardingComplete } =
    useUserStore();

  // ... component logic
}
```
