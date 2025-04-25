/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#7BC47F'; // Darker mint green from app icon
const tintColorDark = '#7BC47F'; // Gold from app icon

export const Colors = {
  light: {
    text: '#4D2C0A', // Brown from app icon outlines
    background: '#fff',
    tint: tintColorLight,
    icon: '#6B4226', // Medium brown
    tabIconDefault: '#6B4226',
    tabIconSelected: tintColorLight,
    secondary: '#F2D06B', // Gold from app icon
    accent: '#FF6B61', // Coral red from heart
  },
  dark: {
    text: '#F8F0E3', // Light cream
    background: '#2C1A09', // Dark brown
    tint: tintColorDark,
    icon: '#D9B88F', // Light brown
    tabIconDefault: '#D9B88F',
    tabIconSelected: tintColorDark,
    secondary: '#7BC47F', // Darker mint green for secondary in dark mode
    accent: '#FF6B61', // Coral red from heart
  },
};
