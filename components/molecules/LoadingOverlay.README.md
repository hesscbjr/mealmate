# LoadingOverlay (`components/molecules/LoadingOverlay.tsx`)

## Purpose

This component displays an animated loading overlay, typically used during initial data fetching or transitions. It features:

- An animated fade-out effect based on a shared animation progress value.
- Displaying a series of messages using the `TypewriterText` component.

## Key Components Used

- `Animated.View` (from `react-native-reanimated`): Provides the container and handles the opacity animation.
- `TypewriterText` (Atom): Displays the loading messages with a typewriter effect.

## Interactions

- Receives an array of `messages` to display.
- Receives an animated `progress` value (`SharedValue<number>`) which controls the opacity (fades out as progress goes from 0 to 0.5).
- Receives `loadingTextInitialY` to set the initial vertical position.
- Receives `loadingIngredientHeaderStyle` to style the `TypewriterText` component.
- Becomes hidden (`display: 'none'`) when the `progress` value reaches 0.5 or greater to prevent interaction.

## Configuration

- Requires `messages`, `progress`, `loadingTextInitialY`, and `loadingIngredientHeaderStyle` props.
- Assumes `TypewriterText` constants (`TYPEWRITER_SPEED_MS`, `TYPEWRITER_PAUSE_MS`) are suitable or they might need to be passed as props if more flexibility is needed.

## Development Guidelines

- This component encapsulates the specific animation logic for the loading text overlay used in `PreviewScreen`.
- Ensure the `progress` value is correctly updated by the parent component to control the animation.

## Usage Example

```tsx
import LoadingOverlay from "@/components/molecules/LoadingOverlay";
import { useSharedValue } from "react-native-reanimated";

// Inside a parent component (e.g., PreviewScreen)

const animationProgress = useSharedValue(0);
const messages = ["Loading...", "Analyzing image..."];
const initialY = 100; // Calculated initial Y position
const textStyle = { fontSize: 18, color: "grey" }; // Style object

// Trigger animation elsewhere
// animationProgress.value = withTiming(1, { duration: 1000 });

return (
  <View style={{ flex: 1 }}>
    {/* Other components */}

    <LoadingOverlay
      messages={messages}
      progress={animationProgress}
      loadingTextInitialY={initialY}
      loadingIngredientHeaderStyle={textStyle}
    />

    {/* Other components */}
  </View>
);
```
