const tintColorLight = '#2A5C33'; // Darker mint green from app icon
const tintColorDark = '#5A9E64'; // Darker green for dark mode tint

// Common Colors
const white = '#fff';
const black = '#000';
const coralRed = '#FF6B61';
const brown = '#4D2C0A';
const mediumBrown = '#6B4226';
const pureWhite = '#FFFFFF';
const lightGrey = '#D3D3D3';
const mediumGrey = '#888';
const darkGrey = '#333';
const darkerGrey = '#555555';
const placeholderGrey = '#E0E0E0';
const darkPlaceholderGrey = '#383838';
const inactiveTabGrey = '#A0A0A0';
const darkSlateGrey = '#262626';
const darkerSlateGrey = '#1C1C1C';
const secondaryGrey = '#404040';


export const Colors = {
  light: {
    text: brown, // Brown from app icon outlines
    background: white,
    tint: tintColorLight,
    icon: white, // White icons
    tabIconDefault: mediumBrown,
    tabIconSelected: tintColorLight,
    secondary: "#F2D06B", // Gold from app icon - Unique
    accent: coralRed, // Coral red from heart
    backgroundGradientStart: tintColorDark, // Re-using dark tint for consistency
    backgroundGradientEnd: white,
    buttonText: white,
    captureBackground: black, // Black for capture screen background
    captureButtonBackground: white, // White button on black bg
    captureButtonBorder: "#bbb", // Light grey border for button - Unique
    shadow: black, // Standard shadow color
    imagePlaceholder: placeholderGrey, // Light grey placeholder
    loadingText: brown, // Use main text color
    infoText: mediumBrown, // Medium brown for info text
    divider: lightGrey, // Light grey for dividers
  },
  dark: {
    text: pureWhite, // Pure white for high contrast
    background: darkSlateGrey, // Dark slate grey base
    tint: tintColorDark, // Keep existing green accent
    icon: white, // White icons
    tabIconDefault: inactiveTabGrey, // Muted grey for inactive tabs
    tabIconSelected: tintColorDark, // Keep green accent for selected tab
    secondary: secondaryGrey, // Slightly lighter grey for secondary elements
    accent: coralRed, // Keep coral red accent
    backgroundGradientStart: darkerSlateGrey, // Darker slate for gradient start
    backgroundGradientEnd: darkSlateGrey, // Base slate for gradient end
    buttonText: white, // Keep white
    captureBackground: black, // Keep black
    captureButtonBackground: darkGrey, // Keep dark grey
    captureButtonBorder: mediumGrey, // Keep medium grey
    shadow: black, // Keep black
    imagePlaceholder: darkPlaceholderGrey, // Slightly different dark grey
    loadingText: pureWhite, // White text
    infoText: "#B0B0B0", // Lighter grey for info text - Unique
    divider: darkerGrey, // Darker grey for dividers in dark mode
    link: tintColorDark, // Added link color using tint
  },
};
