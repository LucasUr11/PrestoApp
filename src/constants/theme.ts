export const Colors = {
  primary: '#6E45F5',
  primaryDark: '#5A36D6',
  primaryLight: '#EEE9FE',
  primarySoft: '#F6F3FF',

  background: '#F7F7FB',
  surface: '#FFFFFF',
  surfaceMuted: '#F2F2F7',
  surfaceAlt: '#FBFBFD',

  inputBackground: '#F3F4F8',
  inputBackgroundFocused: '#FFFFFF',
  border: '#E5E7EF',
  borderStrong: '#D1D5E0',
  divider: '#ECEEF4',

  textPrimary: '#17171F',
  textSecondary: '#5F6272',
  textMuted: '#8C8FA1',
  textOnPrimary: '#FFFFFF',

  danger: '#E5484D',
  dangerLight: '#FFF1F2',
  success: '#1A9B5C',
  successLight: '#ECFDF3',

  overlay: 'rgba(23, 23, 31, 0.45)',
  placeholder: '#9A9CA7',
  shadow: '#17171F',
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
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
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
