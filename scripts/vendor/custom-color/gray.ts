import * as RadixColors from "@radix-ui/colors";
import Color from "colorjs.io";
import BezierEasing from "bezier-easing";

import { makeScale } from "./make-scale.ts";
import { writeScaleCss } from "./write-scale-css.ts";

// 12 step scales
const lum = [
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

// Dark mode runs the same ramp reversed: step 1 dark, step 12 light.
const darkLum = [...lum].reverse();

// Alpha opacities follow each ramp's distance from its background:
// light = distance below white, dark = distance above black.
const lightAlpha = lum.map((l) => 1 - l);
const darkAlpha = [...darkLum];

// Neutral grays: L* from the 12 luminance steps, zero chroma.
export const grayScale = makeScale(lum);
export const grayScaleDark = makeScale(darkLum);

await writeScaleCss(
    "gray",
    "gray.ts",
    { scale: grayScale, alphaOpacity: lightAlpha },
    { scale: grayScaleDark, alphaOpacity: darkAlpha },
);
