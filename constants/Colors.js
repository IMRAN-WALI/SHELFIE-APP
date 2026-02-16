// constants/Colors.js
export const Colors = {
  // Primary colors
  primary: "#6849a7",
  primaryLight: "#8a6fc9",
  primaryDark: "#4a2f7a",
  primaryTransparent: "rgba(104, 73, 167, 0.1)",

  // Secondary colors
  secondary: "#9d7ed9",
  secondaryLight: "#b89ef0",
  secondaryDark: "#7a5eb3",

  // Accent colors
  accent: "#ff6b6b",
  accentLight: "#ff8e8e",
  accentDark: "#e04a4a",

  // Status colors
  success: "#4caf50",
  successLight: "#80e27e",
  successDark: "#087f23",

  warning: "#cc475a",
  warningLight: "#e06a7b",
  warningDark: "#a83245",

  error: "#d32f2f",
  errorLight: "#ef5350",
  errorDark: "#b71c1c",

  info: "#2196f3",
  infoLight: "#64b5f6",
  infoDark: "#1976d2",

  // Neutral colors
  white: "#ffffff",
  black: "#000000",

  gray: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#eeeeee",
    300: "#e0e0e0",
    400: "#bdbdbd",
    500: "#9e9e9e",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    900: "#212121",
  },

  // Transparent variants
  transparent: "transparent",
  overlay: "rgba(0, 0, 0, 0.5)",
  overlayLight: "rgba(0, 0, 0, 0.3)",
  overlayDark: "rgba(0, 0, 0, 0.7)",

  // Dark theme (updated with more colors)
  dark: {
    // Text colors
    text: "#d4d4d4",
    textSecondary: "#a8a8b8",
    textMuted: "#787889",
    textDisabled: "#5a5a6e",
    title: "#ffffff",
    titleSecondary: "#e8e8e8",

    // Background colors
    background: "#252231",
    backgroundSecondary: "#2f2b3d",
    backgroundTertiary: "#3a354a",
    backgroundElevated: "#342f43",

    // Navigation & UI
    navBackground: "#201e2b",
    navBackgroundSecondary: "#2a2636",
    uiBackground: "#2f2b3d",
    uiBackgroundSecondary: "#3a354a",
    uiBackgroundTertiary: "#453f57",

    // Icons
    iconColor: "#9591a5",
    iconColorFocused: "#ffffff",
    iconColorSecondary: "#b5b1c5",
    iconColorDisabled: "#5d5a6f",

    // Borders
    border: "#3d394c",
    borderLight: "#4a455a",
    borderDark: "#2e2b3b",

    // Cards & surfaces
    cardBackground: "#2f2b3d",
    cardBackgroundPressed: "#3a354a",
    cardBorder: "#3d394c",

    // Input fields
    inputBackground: "#2a2636",
    inputBorder: "#3d394c",
    inputBorderFocused: "#6849a7",
    inputPlaceholder: "#6a667b",
    inputText: "#d4d4d4",

    // Buttons
    buttonPrimary: "#6849a7",
    buttonPrimaryPressed: "#4a2f7a",
    buttonPrimaryDisabled: "#5a4a7a",

    buttonSecondary: "#2f2b3d",
    buttonSecondaryPressed: "#3a354a",
    buttonSecondaryBorder: "#4a455a",

    // Shadows
    shadow: "#000000",
    shadowLight: "rgba(0, 0, 0, 0.3)",

    // Status bar
    statusBar: "light",

    // Gradients
    gradientStart: "#6849a7",
    gradientEnd: "#8a6fc9",
  },

  // Light theme (updated with more colors)
  light: {
    // Text colors
    text: "#625f72",
    textSecondary: "#7a778b",
    textMuted: "#9591a5",
    textDisabled: "#b8b5c8",
    title: "#201e2b",
    titleSecondary: "#3a354a",

    // Background colors
    background: "#e0dfe8",
    backgroundSecondary: "#d6d5e1",
    backgroundTertiary: "#cbc9d9",
    backgroundElevated: "#ffffff",

    // Navigation & UI
    navBackground: "#e8e7ef",
    navBackgroundSecondary: "#dcdae6",
    uiBackground: "#d6d5e1",
    uiBackgroundSecondary: "#cbc9d9",
    uiBackgroundTertiary: "#c0bdd0",

    // Icons
    iconColor: "#686477",
    iconColorFocused: "#201e2b",
    iconColorSecondary: "#8a869b",
    iconColorDisabled: "#b0acbf",

    // Borders
    border: "#c5c2d4",
    borderLight: "#d2cfdf",
    borderDark: "#b8b4c8",

    // Cards & surfaces
    cardBackground: "#ffffff",
    cardBackgroundPressed: "#f5f5f5",
    cardBorder: "#e0e0e0",

    // Input fields
    inputBackground: "#ffffff",
    inputBorder: "#d1cedd",
    inputBorderFocused: "#6849a7",
    inputPlaceholder: "#9a97a9",
    inputText: "#201e2b",

    // Buttons
    buttonPrimary: "#6849a7",
    buttonPrimaryPressed: "#4a2f7a",
    buttonPrimaryDisabled: "#b09fcf",

    buttonSecondary: "#ffffff",
    buttonSecondaryPressed: "#f5f5f5",
    buttonSecondaryBorder: "#d1cedd",

    // Shadows
    shadow: "#000000",
    shadowLight: "rgba(0, 0, 0, 0.1)",

    // Status bar
    statusBar: "dark",

    // Gradients
    gradientStart: "#6849a7",
    gradientEnd: "#9d7ed9",
  },

  // Common gradients
  gradients: {
    primary: ["#6849a7", "#8a6fc9"],
    secondary: ["#9d7ed9", "#b89ef0"],
    accent: ["#ff6b6b", "#ff8e8e"],
    success: ["#4caf50", "#80e27e"],
    warning: ["#cc475a", "#e06a7b"],
    dark: ["#252231", "#2f2b3d"],
    light: ["#e0dfe8", "#f5f5f5"],
  },

  // Typography colors
  typography: {
    heading: "#201e2b",
    body: "#625f72",
    caption: "#9591a5",
    link: "#6849a7",
    linkVisited: "#4a2f7a",
    error: "#d32f2f",
    success: "#4caf50",
    warning: "#cc475a",
    info: "#2196f3",
  },

  // Component specific
  components: {
    header: {
      background: "#6849a7",
      text: "#ffffff",
      icon: "#ffffff",
    },
    tabBar: {
      active: "#6849a7",
      inactive: "#9591a5",
      background: "#ffffff",
    },
    badge: {
      background: "#cc475a",
      text: "#ffffff",
    },
  },

  // Animation colors
  animation: {
    shimmer: ["#f0f0f0", "#e0e0e0", "#f0f0f0"],
    pulse: ["#6849a7", "#8a6fc9", "#6849a7"],
  },
};

// Helper function to get theme colors
export const getThemeColors = (theme = "dark") => {
  return {
    ...Colors,
    ...Colors[theme],
    theme: theme,
    isDark: theme === "dark",
  };
};

// Helper function to get color with opacity
export const withOpacity = (color, opacity) => {
  // Handle hex colors
  if (color.startsWith("#")) {
    const hex = color.replace("#", "");
    const r = Number.parseInt(hex.substring(0, 2), 16);
    const g = Number.parseInt(hex.substring(2, 4), 16);
    const b = Number.parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  // Handle rgb/rgba colors
  if (color.startsWith("rgb")) {
    const rgb = color.match(/\d+/g);
    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
  }
  return color;
};

// Theme context helper (optional)
export const theme = {
  light: Colors.light,
  dark: Colors.dark,
};

export default Colors;
