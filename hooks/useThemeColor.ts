import { Colors } from '@/constants/Colors';
import { useAppColorScheme } from '@/hooks/useAppColorScheme';

type ColorName = keyof typeof Colors.light;

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: ColorName
): string;

export function useThemeColor<
T extends ColorName>(
  props: Record<string, never>,
  colorNames: T[]
): Record<T, string>;

export function useThemeColor<
  T extends ColorName
>(
  props: { light?: string; dark?: string } | Record<string, never>,
  colorNameOrNames: T | T[]
): string | Record<T, string> {
  const appColorScheme = useAppColorScheme();
  const theme = appColorScheme as Extract<typeof appColorScheme, 'light' | 'dark'>;

  if (typeof colorNameOrNames === 'string') {
    const colorName = colorNameOrNames;
    const colorFromProps = (props as { light?: string; dark?: string })[theme];

    if (colorFromProps) {
      return colorFromProps;
    } else {
      const themeColors = theme === 'light' ? Colors.light : Colors.dark;
      return themeColors[colorName];
    }
  } else {
    const colorNames = colorNameOrNames;
    const themeColors = theme === 'light' ? Colors.light : Colors.dark;
    const result: Partial<Record<T, string>> = {};
    for (const name of colorNames) {
      result[name] = themeColors[name];
    }
    return result as Record<T, string>;
  }
}
