/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#2A5C33'; // Darker mint green from app icon
const tintColorDark = '#5A9E64'; // Darker green for dark mode tint

export const Colors = {
  light: {
    text: '#4D2C0A', // Brown from app icon outlines
    background: '#fff',
    tint: tintColorLight,
    icon: '#6B4226', // Medium brown
    tabIconDefault: "#6B4226",
    tabIconSelected: tintColorLight,
    secondary: "#F2D06B", // Gold from app icon
    accent: "#FF6B61", // Coral red from heart
    backgroundGradientStart: "#5A9E64",
    backgroundGradientEnd: "#fff",
    buttonText: "#fff",
  },
  dark: {
    text: "#F8F0E3", // Light cream
    background: '#2A5C33', // Dark brown
    tint: tintColorDark,
    icon: '#F8F0E3', // Light brown
    tabIconDefault: "#D9B88F",
    tabIconSelected: tintColorDark,
    secondary: "#7BC47F", // Darker mint green for secondary in dark mode
    accent: "#FF6B61", // Coral red from heart
    backgroundGradientStart: "#1A3A1F", // Very dark green for gradient start
    backgroundGradientEnd: "#2A5C33", // Dark green for gradient end
    buttonText: "#fff",
  },
};
