/**
 * Custom Radix color scales for the ui lib.
 *
 * Each entry in `scales` seeds a full 12-step scale (solid + alpha, sRGB +
 * wide-gamut P3/OKLCH) via the official Radix custom-palette algorithm —
 * the same output as https://www.radix-ui.com/colors/custom.
 *
 * Regenerate the CSS with: pnpm generate-colors
 */
type ColorsConfig = {
  /** Output CSS file, relative to the repo root. */
  out: string;
  /** Gray seed fed to the generator (only shapes pure-white/black accents). */
  gray: string;
  /** Page background per appearance; scale lightness is eased toward these. */
  background: { light: string; dark: string };
  /** Scale name → accent seed color (any CSS color: hex, oklch(), display-p3). */
  scales: Record<string, string>;
};

export default {
  out: "ui/src/css/color-custom.css",
  gray: "#8b8d98",
  background: { light: "#ffffff", dark: "#0a0a0a" },
  scales: {
    orange: "#ff6108",
    // Enabling these overrides the stock Radix scales imported in color.css:
    // blue: "#0fa7ff",
    // lime: "#61d902",
  },
} satisfies ColorsConfig;
