import * as RadixColors from "@radix-ui/colors";
import Color from "colorjs.io";
import BezierEasing from "bezier-easing";

import { makeScale } from "./make-scale.ts";
import { writeScaleCss } from "./write-scale-css.ts";

const scaleNames = {
    //color(display-p3 R G B )
    tomato: 'color(display-p3 1 0.325 0.1)',
    blue: 'color(display-p3 0 0.65 1)',
    lime: 'color(display-p3 0.4875 0.875 0.125)',
    amber: 'color(display-p3 1 0.7451 0.0941)',
}

const sat = 0.85;

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

// Dark mode runs the same ramp reversed: step 1 dark, step 12 light. The
// anchor still bends each ramp through the seed's lightness at step 9.
const darkLum = [...lum].reverse();

// Alpha opacities follow each ramp's distance from its background:
// light = distance below white, dark = distance above black.
const lightAlpha = lum.map((l) => 1 - l);
const darkAlpha = [...darkLum];

// Neutral grays in LAB: L* from the 12 luminance steps, a = b = 0.
// export const redScale = lum.map((l) => new Color("lab", [l * 100, 0, 0]));

// Named scales: chroma from each seed (scaled by sat), L* from the 12
// luminance steps, interpolated in the space set in config.ts.
export const scales = Object.fromEntries(
    Object.entries(scaleNames).map(([name, seed]) => [
        name,
        {
            light: makeScale(lum, seed, sat),
            dark: makeScale(darkLum, seed, sat),
        },
    ]),
);

for (const [name, { light, dark }] of Object.entries(scales)) {
    await writeScaleCss(
        name,
        "color.ts",
        { scale: light, alphaOpacity: lightAlpha },
        { scale: dark, alphaOpacity: darkAlpha },
    );
}
