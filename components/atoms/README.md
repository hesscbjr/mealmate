# Atoms

This directory contains the base UI elements (atoms) of the application, following the Atomic Design methodology.

## Purpose

Atoms are the smallest, indivisible UI components. They serve as the fundamental building blocks for more complex components.

## Components

### `Icon.tsx`

- **Purpose**: Renders an icon using the FontAwesome 5 icon set provided by `@expo/vector-icons`.
- **Props**:
  - `name`: (Required) The name of the FontAwesome 5 icon to display. Refer to the `@expo/vector-icons` directory for available names.
  - `size`: (Optional) The size of the icon in pixels. Defaults to `24`.
  - `color`: (Optional) The color of the icon. Defaults to `black`.
- **Usage Example**:

  ```tsx
  import Icon from "@/components/atoms/Icon";

  // ...
  <Icon name="camera" size={32} color="blue" />;
  // ...
  ```

### `Button.tsx`

- **Purpose**: A pressable button component with theme-aware styling and variants.
- **Props**:
  - `title`: (Required) The text to display inside the button.
  - `variant`: (Optional) The button style variant. Accepts `'default'`, `'primary'`, or `'secondary'`. Defaults to `'default'`.
  - `style`: (Optional) Custom `ViewStyle` to apply to the button container.
  - `activeOpacity`: (Optional) The opacity of the button when pressed. Defaults to `0.7`.
  - ... other `TouchableOpacityProps` (like `onPress`).
- **Variants**:
  - `default`: Standard background and text colors from the theme.
  - `primary`: Uses the theme's `tint` color for the background and the theme's `background` color for text.
  - `secondary`: Uses the theme's `background` color for the background and the theme's `tint` color for text.
- **Usage**:

```tsx
import Button from '@/components/atoms/Button';

// ...

<Button title="Default Button" onPress={() => {}} />
<Button title="Primary Button" variant="primary" onPress={() => {}} />
<Button title="Secondary Button" variant="secondary" onPress={() => {}} />

// With custom styles
<Button
  title="Styled Primary Button"
  variant="primary"
  onPress={() => {}}
  style={{ margin: 10, borderRadius: 20 }}
  activeOpacity={0.9}
/>
```

## Development Guidelines

- Atoms should be pure UI components with no internal logic related to data fetching or complex state management.
- They should accept props for customization (e.g., text, onPress handlers, style overrides).
- Use `StyleSheet.create` or `nativewind` for styling.
- Ensure components adapt to light/dark themes using the `useThemeColor` hook where appropriate.
- Atoms must not import components from `molecules/` or `organisms/`.
