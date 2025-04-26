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

### `Input.tsx`

- **Purpose**: A themed text input component with an optional label.
- **Props**:
  - `label`: (Optional) Text to display above the input field.
  - `style`: (Optional) Custom `TextStyle` to apply directly to the `TextInput` element.
  - `containerStyle`: (Optional) Custom `ViewStyle` to apply to the outer container wrapping the label and input.
  - `labelStyle`: (Optional) Custom `TextStyle` to apply to the label.
  - ... other `TextInputProps` (like `value`, `onChangeText`, `placeholder`, `keyboardType`, etc.).
- **Theming**: Uses `useThemeColor` to set the background, text, border, and placeholder text colors based on the current theme.
- **Usage**:

```tsx
import Input from '@/components/atoms/Input';

// ...

const [name, setName] = useState('');

// ...

<Input
  label="Your Name"
  value={name}
  onChangeText={setName}
  placeholder="Enter your full name"
  autoCapitalize="words"
/>

<Input
  value={email} // Assuming email state exists
  onChangeText={setEmail} // Assuming setEmail state setter exists
  placeholder="Email Address"
  keyboardType="email-address"
  containerStyle={{ marginTop: 20 }} // Custom container style
/>
```

### `PhotoThumbnail.tsx`

- **Purpose**: Displays a small, square image thumbnail, typically used in grids or lists.
- **Props**:
  - `uri`: (Required) The URI of the image to display.
  - `size`: (Optional) The width and height of the thumbnail. Defaults to `100`.
  - `style`: (Optional) Custom `ImageStyle` to apply to the `Image` component.
  - ... other `ImageProps`.
- **Usage**:

```tsx
import PhotoThumbnail from "@/components/atoms/PhotoThumbnail";

// ...

<PhotoThumbnail uri={imageUri} size={80} style={{ borderRadius: 10 }} />;
```

### `BottomSheet.tsx`

- **Purpose**: A reusable wrapper around the `@gorhom/bottom-sheet` library, providing a simplified interface for creating bottom sheets.
- **Props**:
  - `children`: (Required) The content to render inside the bottom sheet.
  - `contentContainerStyle`: (Optional) Custom `ViewStyle` to apply to the `BottomSheetView` that wraps the children.
  - `ref`: (Required) A ref object created using `useRef<BottomSheetMethods>(null)` to control the bottom sheet (e.g., `expand()`, `close()`).
  - `snapPoints`: (Required) An array of numbers, percentages, or "POINT" constants defining the positions the sheet should snap to.
  - `onChange`: (Optional) Callback function that is called when the sheet position changes.
  - ... other props accepted by the `@gorhom/bottom-sheet` `BottomSheet` component.
- **Usage**:

```tsx
import React, { useRef, useMemo } from "react";
import { View, Button } from "react-native";
import BottomSheet from "@/components/atoms/BottomSheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types"; // Or import directly from @gorhom/bottom-sheet if available

const MyScreen = () => {
  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  const handleOpenPress = () => bottomSheetRef.current?.expand();
  const handleClosePress = () => bottomSheetRef.current?.close();

  return (
    <View style={{ flex: 1, padding: 24, backgroundColor: "grey" }}>
      <Button title="Open Sheet" onPress={handleOpenPress} />
      <BottomSheet
        ref={bottomSheetRef}
        index={-1} // Start closed
        snapPoints={snapPoints}
        onChange={(index) => console.log("Sheet changed to index:", index)}
        enablePanDownToClose={true}
      >
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text>This is the content of the bottom sheet!</Text>
          <Button title="Close Sheet" onPress={handleClosePress} />
        </View>
      </BottomSheet>
    </View>
  );
};
```

### `Text.tsx`

- **Purpose**: A fundamental text component that automatically applies the theme's text color.
- **Props**:
  - Extends all standard React Native `TextProps`.
- **Theming**: Uses `useThemeColor` to set the `color` style based on the theme's `text` color.
- **Usage**:

```tsx
import Text from "@/components/atoms/Text";

// ...

<Text>This text will use the theme color.</Text>
<Text style={{ fontWeight: 'bold', fontSize: 18 }}>Styled themed text.</Text>
```

### `TypewriterText.tsx`

- **Purpose**: Displays text with a typewriter effect, cycling through an array of messages.
- **Props**:
  - `messages`: (Required) An array of strings to display sequentially.
  - `typingSpeed`: (Optional) The delay in milliseconds between typing each character. Defaults to `50`.
  - `pauseDuration`: (Optional) The delay in milliseconds after a message is fully typed before starting the next one. Defaults to `1000`.
  - `style`: (Optional) Custom `TextStyle` to apply to the `Text` component.
  - ... other standard React Native `TextProps` (except `children`).
- **Behavior**:
  - Types out each message character by character.
  - Triggers a light selection haptic feedback (`Haptics.selectionAsync()`) via `expo-haptics` for each character typed.
  - Pauses after a message is complete.
  - Clears the text and starts typing the next message in the array (loops).
  - Displays a non-breaking space (`\u00A0`) when no text is visible to maintain layout height.
- **Usage**:

```

```

### `Stagger.tsx`

- **Purpose**: Wraps multiple child components and applies a staggered `FadeInView` animation to each valid React element child.
- **Props**:
  - `children`: `React.ReactNode` - The child elements to animate.
  - `parentDelay?`: `number` (default: 0) - Initial delay before the first child animates.
  - `stagger?`: `number` (default: 150) - Delay (ms) between each subsequent child's animation.
  - `duration?`: `number` (default: 500) - Duration (ms) of the fade-in animation for each child.
  - `style?`: `ViewStyle` - Optional style applied to the container `View` wrapping children.
- **Usage**:

  ```tsx
  import Stagger from '@/components/atoms/Stagger';

  <Stagger parentDelay={100} stagger={200}>
    <Text>First Item</Text>
    <Image source={...} />
    <Button title="Action" />
  </Stagger>
  ```
