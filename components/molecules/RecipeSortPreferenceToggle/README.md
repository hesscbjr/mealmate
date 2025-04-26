# Recipe Sort Preference Toggle

## Purpose

This molecule component provides a user interface for selecting between two predefined recipe sorting preferences: 'Maximize Used Ingredients' and 'Minimize Missing Ingredients'. It displays the current selection and allows the user to change it.

## Props

- `currentPreference` (RecipeSortPreference): The currently selected sorting preference ('max-used-ingredients' or 'min-missing-ingredients').
- `onSetPreference` ((preference: RecipeSortPreference) => void): A callback function that is invoked when the user selects a new preference.

## Usage Example

```tsx
import RecipeSortPreferenceToggle from "@/components/molecules/RecipeSortPreferenceToggle";
import { useUserStore } from "@/store/user";

const ProfileSettings = () => {
  const currentPreference = useUserStore((state) => state.recipeSortPreference);
  const setPreference = useUserStore((state) => state.setRecipeSortPreference);

  return (
    <RecipeSortPreferenceToggle
      currentPreference={currentPreference}
      onSetPreference={setPreference}
    />
  );
};
```
