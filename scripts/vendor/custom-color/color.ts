import { lum, darkLum, lightAlpha, darkAlpha } from "./curves.ts";
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
