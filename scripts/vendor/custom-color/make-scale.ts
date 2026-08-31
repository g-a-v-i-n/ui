import Color from "colorjs.io";

import { space } from "./config.ts";

// OKLab lightness of a neutral gray at the given CIELAB L*, so oklch mode
// starts from the same lightness ramp as lab mode.
const toOkL = (lStar: number) => new Color("lab", [lStar, 0, 0]).to("oklch").coords[0];

// Fit a step into P3 while keeping its CIELAB L* exact. colorjs's own gamut
// mapping trades lightness for chroma (its JND clip shifts L* by up to ~0.2),
// so instead bisect the largest chroma that fits P3 at the pinned L*,
// desaturating along the LAB a/b ray.
function fitP3(color: Color, lStar: number): Color {
    color.set("lab.l", lStar);
    if (color.inGamut("p3")) return color;
    const [, a, b] = color.to("lab").coords;
    const candidate = (t: number) => new Color("lab", [lStar, a * t, b * t]);
    let lo = 0;
    let hi = 1;
    for (let i = 0; i < 30; i++) {
        const mid = (lo + hi) / 2;
        if (candidate(mid).inGamut("p3")) lo = mid;
        else hi = mid;
    }
    return candidate(lo);
}

// Step 9 (index 8) is the solid color: the seed appears there verbatim when
// sat = 1; with any other sat it is chroma-scaled like every other step.
const ANCHOR = 8;

// Bend the L* ramp so it passes through the seed's own lightness at ANCHOR
// while keeping both endpoints: each side of the anchor is rescaled
// proportionally, so the ramp stays monotonic for any seed lightness that
// lies between the ramp's ends.
function anchorRamp(lum: number[], seedLum: number): number[] {
    const first = lum[0];
    const last = lum[lum.length - 1];
    const at = lum[ANCHOR];
    return lum.map((l, i) => {
        if (i === ANCHOR) return seedLum;
        if (i < ANCHOR) return first - ((first - l) / (first - at)) * (first - seedLum);
        return last + ((l - last) / (at - last)) * (seedLum - last);
    });
}

/**
 * Build a scale along the L* ramp, holding the seed's chroma constant in the
 * configured space, then fitting each step into P3 at its exact L*.
 * The seed anchors the scale: the ramp is bent through the seed's lightness
 * at step 9, and at sat = 1 that step is the seed color itself (no round-trip
 * drift). No seed → neutral gray. `sat` scales the chroma of every step,
 * step 9 included.
 */
export function makeScale(lum: number[], seed?: string, sat = 1): Color[] {
    const seedColor = seed ? new Color(seed) : undefined;
    const ramp = seedColor
        ? anchorRamp(lum, seedColor.to("lab").coords[0] / 100)
        : lum;
    let steps: Color[];
    if (space === "oklch") {
        const [, c, h] = seedColor ? seedColor.to("oklch").coords : [0, 0, 0];
        steps = ramp.map((l) => fitP3(new Color("oklch", [toOkL(l * 100), c * sat, h]), l * 100));
    } else {
        const [, a, b] = seedColor ? seedColor.to("lab").coords : [0, 0, 0];
        steps = ramp.map((l) => fitP3(new Color("lab", [l * 100, a * sat, b * sat]), l * 100));
    }
    if (seedColor && sat === 1) steps[ANCHOR] = seedColor;
    return steps;
}
