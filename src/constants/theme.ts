export const Colors = {
  primary: '#6E45F5',
  primaryLight: '#EEE9FE',

  background: '#FAFAFC',
  surface: '#FFFFFF',
  surfaceMuted: '#F2F2F7',
  inputBackground: '#EDEDF5',
  border: '#E4E4EC',
  placeholder: '#2a2a2a53',

  textPrimary: '#17171F',
  textSecondary: '#6B6D7C',
  textMuted: '#9A9CA7',
  textOnPrimary: '#FFFFFF',
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 999,
} as const;

export const FontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
  '2xl': 28,
  '3xl': 32,
} as const;

export const FontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export type ThemeColors = typeof Colors;
export type ThemeSpacing = typeof Spacing;
