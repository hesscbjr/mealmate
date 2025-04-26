# Theme Preference Toggle

## Purpose

This molecule component provides a UI for users to select their preferred application theme: Light, Dark, or System default.

## Component (`index.tsx`)

- Displays three buttons representing the theme options.
- Highlights the currently selected preference.
- Calls a provided callback function when a new preference is selected.

## Props

- `currentPreference`: The currently active `ThemePreference` (`'light'`, `'dark'`, or `'system'`).
- `onSetPreference`: A function `(preference: ThemePreference) => void` called when the user selects a different theme option.

## Usage Example

```tsx
import React, { useState } from "react";
import ThemePreferenceToggle from "@/components/molecules/ThemePreferenceToggle";
import { ThemePreference } from "@/store/user";
import { View } from "react-native";

const ThemeSelectorExample = () => {
  const [preference, setPreference] = useState<ThemePreference>("system");

  return (
    <View style={{ padding: 20 }}>
      <ThemePreferenceToggle
        currentPreference={preference}
        onSetPreference={setPreference}
      />
    </View>
  );
};

export default ThemeSelectorExample;
```

## Styling

- Uses `StyleSheet.create` for internal styling.
- Leverages `useThemeColor` hook to adapt button colors (background, text) based on the currently applied application theme.
