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
    icon: '#fff', // Medium brown
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
    divider: '#D3D3D3', // Light grey for dividers
  },
  dark: {
    text: "#FFFFFF", // Pure white for high contrast
    background: '#262626', // Dark slate grey base
    tint: tintColorDark, // Keep existing green accent
    icon: '#fff', // White icons
    tabIconDefault: "#A0A0A0", // Muted grey for inactive tabs
    tabIconSelected: tintColorDark, // Keep green accent for selected tab
    secondary: "#404040", // Slightly lighter grey for secondary elements
    accent: "#FF6B61", // Keep coral red accent for now
    backgroundGradientStart: "#1C1C1C", // Darker slate for gradient start
    backgroundGradientEnd: "#262626", // Base slate for gradient end
    buttonText: "#fff", // Keep white
    captureBackground: '#000', // Keep black
    captureButtonBackground: '#333', // Keep dark grey
    captureButtonBorder: '#888', // Keep medium grey
    shadow: '#000', // Keep black
    imagePlaceholder: '#383838', // Slightly different dark grey
    loadingText: '#FFFFFF', // White text
    infoText: '#B0B0B0', // Lighter grey for info text
    divider: '#555555', // Darker grey for dividers in dark mode
    link: tintColorDark, // Added link color using tint
  },
};
