// 12 step scales
export const lum = [
    0.99,
    0.97,
    0.95,
    0.93,
    0.91,
    0.89,
    0.86,
    0.78,
    0.56,
    0.52,
    0.44,
    0.09,
];

// Dark mode runs the same ramp reversed: step 1 dark, step 12 light. The
// anchor still bends each ramp through the seed's lightness at step 9.
export const darkLum = [...lum].reverse();

// Alpha opacities follow each ramp's distance from its background:
// light = distance below white, dark = distance above black.
export const lightAlpha = lum.map((l) => 1 - l);
export const darkAlpha = [...darkLum];
