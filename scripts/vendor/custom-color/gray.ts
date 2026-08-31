import { lum, darkLum, lightAlpha, darkAlpha } from "./curves.ts";
import { makeScale } from "./make-scale.ts";
import { writeScaleCss } from "./write-scale-css.ts";

// Neutral grays: L* from the 12 luminance steps, zero chroma.
export const grayScale = makeScale(lum);
export const grayScaleDark = makeScale(darkLum);

await writeScaleCss(
    "gray",
    "gray.ts",
    { scale: grayScale, alphaOpacity: lightAlpha },
    { scale: grayScaleDark, alphaOpacity: darkAlpha },
);
