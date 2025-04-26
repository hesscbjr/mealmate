# Organisms (`components/organisms/`)

## Purpose

This directory contains organism components, which are assemblies of molecules and/or atoms forming distinct sections of an interface.
Organisms represent more complex, standalone parts of the UI, such as a header, a recipe list section, or a camera view with controls.

## Key Components

- **`DietaryRestrictionPicker.tsx`**: Displays a grid of `DietaryOption` molecules, allowing users to select their dietary preferences. It interacts with the user store to manage state.
- **`OnboardingContainer.tsx`**: Provides a consistent background gradient container for the onboarding flow screens.

  - **Props**:
    - `children`: `React.ReactNode` - The content to be rendered inside the container.
    - `style?`: `ViewStyle` - Optional additional styles for the container.
  - **Usage**:

    ```tsx
    import OnboardingContainer from "@/components/organisms/OnboardingContainer";

    <OnboardingContainer>
      <Text>Your onboarding screen content here</Text>
    </OnboardingContainer>;
    ```

- _Add other organisms here as they are created..._

## Interactions

- Organisms combine `molecules` and `atoms` to create functional UI sections.
- They often manage some internal state or fetch data relevant to their section (though major data fetching might be delegated to screens or hooks).
- They handle interactions within their section and pass necessary data and handlers down to molecules and atoms.

## Configuration

Organisms might require specific props to function, often including data arrays or callbacks for actions.

## Development Guidelines

- Organisms should represent a significant, self-contained piece of the UI.
- Aim for composition over inheritance.
- Keep data fetching and complex state management localized if possible, or receive data via props.
- Style using `StyleSheet.create` or `nativewind`.
- Import from `molecules`, `atoms`, hooks, stores, or standard libraries.

## Usage Examples

```tsx
import DietaryRestrictionPicker from "@/components/organisms/DietaryRestrictionPicker";

const UserProfileScreen = () => {
  // User store handles the state internally in this example
  return (
    <View>
      <Text>Your Profile</Text>
      {/* ... other profile elements ... */}
      <DietaryRestrictionPicker />
      {/* ... other profile elements ... */}
    </View>
  );
};
```
