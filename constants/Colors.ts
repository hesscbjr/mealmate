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
    captureBackground: '#000', // Black for capture screen background
    captureButtonBackground: '#fff', // White button on black bg
    captureButtonBorder: '#bbb', // Light grey border for button
    shadow: '#000', // Standard shadow color
    imagePlaceholder: '#E0E0E0', // Light grey placeholder
    loadingText: '#4D2C0A', // Use main text color
    infoText: '#6B4226', // Medium brown for info text
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
    captureBackground: '#000', // Black for capture screen background
    captureButtonBackground: '#333', // Dark grey button on black bg
    captureButtonBorder: '#888', // Medium grey border for button
    shadow: '#000', // Standard shadow color (often still dark in dark mode)
    imagePlaceholder: '#424242', // Dark grey placeholder
    loadingText: '#F8F0E3', // Use main text color
    infoText: '#D9B88F', // Lighter brown for info text in dark mode
  },
};
