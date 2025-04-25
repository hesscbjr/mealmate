# Instructions List (`InstructionsList.tsx`)

## Purpose

This component displays recipe instructions. It can handle both structured `analyzedInstructions` (with steps and optional set names) and a fallback `rawInstructions` string.

## Key Features

- Renders a section title ("Instructions").
- Intelligently renders `analyzedInstructions` if available, including set names and numbered steps.
- Falls back to displaying the `rawInstructions` string if `analyzedInstructions` are not provided or empty.
- Allows customization of styles and colors via props.
- Handles the case where no instructions (neither analyzed nor raw) are provided by rendering nothing.

## Props

| Prop                      | Type                            | Required | Default   | Description                                                      |
| ------------------------- | ------------------------------- | -------- | --------- | ---------------------------------------------------------------- |
| `analyzedInstructions`    | `AnalyzedInstruction[] \| null` | No       | `null`    | An array of structured instruction sets.                         |
| `rawInstructions`         | `string \| null`                | No       | `null`    | A raw instruction string (used as fallback).                     |
| `style`                   | `StyleProp<ViewStyle>`          | No       | -         | Custom style for the main container `View`.                      |
| `titleStyle`              | `StyleProp<TextStyle>`          | No       | -         | Custom style for the "Instructions" title `Text`.                |
| `instructionSetNameStyle` | `StyleProp<TextStyle>`          | No       | -         | Custom style for the instruction set name `Text`.                |
| `stepNumberStyle`         | `StyleProp<TextStyle>`          | No       | -         | Custom style for the step number `Text`.                         |
| `stepTextStyle`           | `StyleProp<TextStyle>`          | No       | -         | Custom style for the step description `Text`.                    |
| `titleColor`              | `string`                        | No       | `#000`    | Color for the title text.                                        |
| `setNameColor`            | `string`                        | No       | `#000`    | Color for the instruction set name text.                         |
| `stepNumberColor`         | `string`                        | No       | `#007AFF` | Color for the step number text (defaults similar to theme tint). |
| `stepTextColor`           | `string`                        | No       | `#000`    | Color for the step description text.                             |
| `borderColor`             | `string`                        | No       | `#ccc`    | Color for the top border of the section.                         |

## Interactions

- Receives instruction data (`analyzedInstructions`, `rawInstructions`) and theme colors/styles as props from a parent component.
- Contains internal logic to decide which instruction format to display.
- Uses a helper function (`renderInstructionStep`) internally for analyzed steps.

## Configuration Requirements

- The parent component needs to fetch recipe details which might contain `analyzedInstructions` and/or `instructions`.
- The `AnalyzedInstruction` and `RecipeInstructionStep` types should be imported from `@/services/spoonacular`.

## Development Guidelines

- Keep the component focused on presenting instructions based on the available data.
- Ensure clear fallback logic between analyzed and raw instructions.

## Usage Example

```tsx
import InstructionsList from "@/components/molecules/InstructionsList";
import { useThemeColor } from "@/hooks/useThemeColor";
import { mockAnalyzedInstructions, mockRawInstructions } from "./mockData";

const RecipeScreen = () => {
  const themeTextColor = useThemeColor({}, "text");
  const themeTintColor = useThemeColor({}, "tint");
  const themeBorderColor = useThemeColor({}, "icon");

  // Example with Analyzed Instructions
  return (
    <InstructionsList
      analyzedInstructions={mockAnalyzedInstructions}
      rawInstructions={null} // Pass null if analyzed are available
      titleColor={themeTextColor}
      setNameColor={themeTextColor}
      stepNumberColor={themeTintColor}
      stepTextColor={themeTextColor}
      borderColor={themeBorderColor}
    />
  );

  // Example with Raw Instructions Fallback
  /*
  return (
    <InstructionsList
      analyzedInstructions={null} // Pass null or empty array
      rawInstructions={mockRawInstructions}
      titleColor={themeTextColor}
      stepTextColor={themeTextColor}
      borderColor={themeBorderColor}
    />
  );
  */
};
```
