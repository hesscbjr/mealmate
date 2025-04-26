# Molecules

## Purpose

This directory contains "molecule" components according to the Atomic Design methodology. Molecules are relatively simple combinations of atoms working together as a unit.

Examples:

- A search input field combined with a button.
- A user avatar with a username label.
- A card component displaying summary information (like `RecipeCard`).

## Key Components / Files

- `RecipeSortPreferenceToggle/`: Component for selecting recipe sorting preference.
- _(Add other molecule components here as they are created)_

## Interactions

Molecules typically combine atoms (`components/atoms/`) to create slightly more complex UI elements. They should remain presentation-focused and generally do not contain complex application logic or data fetching.

## Development Guidelines

- Molecules should be self-contained and reusable.
- They receive data and callbacks via props.
- Import atoms from `components/atoms/`.
- Do not import from `components/organisms/`.

## Usage

Import molecules directly into organisms or screen components where needed.

```tsx
import RecipeSortPreferenceToggle from "@/components/molecules/RecipeSortPreferenceToggle";
// ... other imports

const MyScreen = () => {
  // ... state and logic
  return (
    <View>
      {/* ... other components */}
      <RecipeSortPreferenceToggle
        currentPreference={someState}
        onSetPreference={handlePreferenceChange}
      />
      {/* ... other components */}
    </View>
  );
};
```
