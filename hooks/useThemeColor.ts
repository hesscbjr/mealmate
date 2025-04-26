/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Dynamically generate the ColorName type from the Colors object keys
// Ensures that any key added to Colors.light/dark is automatically included
type ColorName = keyof (typeof Colors.light & typeof Colors.dark);

// Overload signature for single color name (existing behavior)
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: ColorName
): string;

// Overload signature for multiple color names
export function useThemeColor<
T extends ColorName>(
  props: Record<string, never>, // Props override not supported for multiple colors
  colorNames: T[]
): Record<T, string>;

// Implementation signature
export function useThemeColor<
T extends ColorName>(
  props: { light?: string; dark?: string } | Record<string, never>,
  colorNameOrNames: T | T[]
): string | Record<T, string> {
  const theme = useColorScheme() ?? 'light';

  if (typeof colorNameOrNames === 'string') {
    // Handle single color name
    const colorName = colorNameOrNames;
    const colorFromProps = (props as { light?: string; dark?: string })[theme];

    if (colorFromProps) {
      return colorFromProps;
    } else {
      return Colors[theme][colorName];
    }
  } else {
    // Handle array of color names
    const colorNames = colorNameOrNames;
    const result: Partial<Record<T, string>> = {}; // Use Partial initially
    for (const name of colorNames) {
      result[name] = Colors[theme][name];
    }
    return result as Record<T, string>; // Assert the final type
  }
}
