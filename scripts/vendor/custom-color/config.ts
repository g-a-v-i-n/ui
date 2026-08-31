/**
 * Config for the custom-color scale scripts.
 *
 * space — the colorspace scales are interpolated in:
 *   "lab":   CIELAB. Constant a/b from the seed. Exact L* lightness; hue can
 *            drift across steps (blue is the worst offender).
 *   "oklch": constant perceived hue from the seed. Each step's lightness is
 *            derived from the same L* ramp, so switching spaces never changes
 *            a step's lightness — only its hue/chroma path.
 */
export type Space = "lab" | "oklch";

export const space: Space = "oklch";
