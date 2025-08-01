# Onboarding Screens (`app/(onboarding)/`)

(Generated by Gemini 2.5 Pro)

This directory contains the screens that guide a new user through the initial setup process.

## Key Components / Files

- `_layout.tsx`: Defines the stack navigator layout for the onboarding flow. It ensures that none of the onboarding screens display a header.
- `welcome.tsx`: The first screen shown to a new user. It displays a welcome message and a button to start the onboarding process.
- `user-info.tsx`: Prompts the user to enter their first and last name. It uses the `useUserStore` (Zustand) to save the user's name.
- `done.tsx`: The final screen in the onboarding flow. It confirms completion and provides a button to navigate to the main part of the app (`/(tabs)`).

## Navigation

- The flow starts at `welcome.tsx`.
- Pressing "Get Started" on `welcome.tsx` navigates to `user-info.tsx`.
- Entering a first and last name and pressing "Next" on `user-info.tsx` navigates to `done.tsx`.
- Pressing "Let's Go!" on `done.tsx` replaces the entire onboarding stack with the main application tabs (`/(tabs)`).
- The `_layout.tsx` ensures a consistent, headerless presentation throughout the onboarding sequence.

## State Management

- The `user-info.tsx` and `done.tsx` screens interact with the `useUserStore` (likely located in `/store`) to persist the user's name and onboarding completion status.
