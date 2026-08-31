/** Named glyph point sizes shared by Icon and SFSymbol. */
export const iconSizes = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 18,
  xl: 22,
} as const;

export type IconSize = keyof typeof iconSizes;
