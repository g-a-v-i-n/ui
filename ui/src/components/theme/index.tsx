import React, { useEffect, useSyncExternalStore } from "react";

/* Theme state lives in three attributes on <html> (or on any element, for a
   themed subtree) that the CSS reads:

     data-theme       "light" | "dark" | "system"   css/color.css → color-scheme
     data-gray        "mauve" | "slate" | …          css/gray-tone.css → --gray-*
     data-font-scale  "compact"                      css/font.css → --font-size-*

   No attribute means the default: follow the OS for the theme, neutral gray,
   the default type ramp. Every color token is a light-dark() pair, so with
   the attributes absent the page already renders correctly before any script
   runs — the only time an inline script is needed is to restore a choice the
   app persisted (see themeInitScript). */

export const THEME_MODES = ["light", "dark", "system"] as const;
export type ThemeMode = (typeof THEME_MODES)[number];
export type ResolvedTheme = "light" | "dark";

/* Gray tones from @radix-ui/colors. "gray" is the neutral default; the rest
   are tinted and swapped in for --gray-* by css/gray-tone.css. */
export const GRAY_TONES = ["gray", "mauve", "slate", "sage", "olive", "sand"] as const;
export type GrayTone = (typeof GRAY_TONES)[number];

/* Font scales from css/font.css. "default" is the 13/15/18 body ramp;
   "compact" is one step smaller (12/14/16). */
export const FONT_SCALES = ["default", "compact"] as const;
export type FontScale = (typeof FONT_SCALES)[number];

export type ThemeAttributes = {
  /** Color mode. "system" (the default) leaves it to the OS preference. */
  theme?: ThemeMode;
  /** Which gray scale --gray-* resolves to. Defaults to the neutral gray. */
  gray?: GrayTone;
  /** Which font-size ramp --font-size-* resolves to. */
  fontScale?: FontScale;
};

/* The attribute values for a set of choices; the default of each is "no
   attribute", so a plain <html> is a valid, fully themed root. */
function attributesFor({ theme = "system", gray = "gray", fontScale = "default" }: ThemeAttributes) {
  return {
    "data-theme": theme === "system" ? undefined : theme,
    "data-gray": gray === "gray" ? undefined : gray,
    "data-font-scale": fontScale === "default" ? undefined : fontScale,
  };
}

/* Apply a change to an element with transitions suppressed (see
   .no-transitions in css/motion.css). The class comes off after the next
   frame has rendered with the change — the first rAF fires before that
   frame's style pass, the second after it — so restoring transitions never
   coincides with the color change itself. A new change cancels the pending
   release so the class stays on until its own frame has rendered. */
let releaseFrame = 0;
function withoutTransitions(root: HTMLElement, apply: () => void) {
  root.classList.add("no-transitions");
  apply();
  cancelAnimationFrame(releaseFrame);
  releaseFrame = requestAnimationFrame(() => {
    releaseFrame = requestAnimationFrame(() => {
      root.classList.remove("no-transitions");
    });
  });
}

function setAttribute(element: HTMLElement, name: string, value: string | undefined) {
  if (value === undefined) element.removeAttribute(name);
  else element.setAttribute(name, value);
}

export type ThemeProps = ThemeAttributes & {
  children?: React.ReactNode;
};

/**
 * Theme the whole document: writes the theme attributes to <html>, with
 * transitions suppressed so the page recolors at once rather than each
 * component cross-fading at its own pace. Every prop is optional and defaults
 * to "no attribute"; render it only when the app lets the user choose. Apps
 * that already manage <html data-theme> themselves (next-themes and the like)
 * can skip it — the CSS only needs the attribute. The current mode is read
 * back with `useResolvedTheme`.
 */
export function Theme({ theme, gray, fontScale, children }: ThemeProps) {
  useEffect(() => {
    const root = document.documentElement;
    const attributes = attributesFor({ theme, gray, fontScale });
    withoutTransitions(root, () => {
      for (const [name, value] of Object.entries(attributes)) {
        setAttribute(root, name, value);
      }
    });
  }, [theme, gray, fontScale]);

  return <>{children}</>;
}

export type ThemeScopeProps = ThemeAttributes & Omit<React.ComponentProps<"div">, "data-theme">;

/**
 * Theme a subtree: a <div> carrying the theme attributes, so its contents
 * resolve every color token against their own color-scheme (a dark panel on
 * a light page, a preview of the other mode). Portaled content (menus,
 * dialogs) renders under <body> and follows the document theme instead.
 */
export function ThemeScope({ theme, gray, fontScale, ...props }: ThemeScopeProps) {
  return <div {...attributesFor({ theme, gray, fontScale })} {...props} />;
}

/* Resolved-theme store: the document's data-theme, falling back to the OS
   preference, kept in sync through an attribute observer and the media query. */
const darkQuery = () => window.matchMedia("(prefers-color-scheme: dark)");

function resolveTheme(): ResolvedTheme {
  const explicit = document.documentElement.getAttribute("data-theme");
  if (explicit === "light" || explicit === "dark") return explicit;
  return darkQuery().matches ? "dark" : "light";
}

function subscribeToTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  const query = darkQuery();
  query.addEventListener("change", onChange);
  return () => {
    observer.disconnect();
    query.removeEventListener("change", onChange);
  };
}

/** The mode the document is actually rendering in: its data-theme, or the OS
    preference when that is absent or "system". "light" during server render. */
export function useResolvedTheme(): ResolvedTheme {
  return useSyncExternalStore(subscribeToTheme, resolveTheme, () => "light");
}

/**
 * Source for an inline <script> that restores persisted theme choices before
 * first paint, for apps that remember the user's pick. Each key is read from
 * localStorage and, when it holds a valid value, written to the matching
 * attribute on <html>; the OS-following default needs no script at all.
 *
 *   <script dangerouslySetInnerHTML={{ __html: themeInitScript() }} />
 */
export function themeInitScript({
  themeKey = "theme",
  grayKey = "gray",
  fontScaleKey = "font-scale",
}: { themeKey?: string; grayKey?: string; fontScaleKey?: string } = {}): string {
  const entries: [string, string, readonly string[]][] = [
    [themeKey, "data-theme", ["light", "dark"]],
    [grayKey, "data-gray", GRAY_TONES.filter((tone) => tone !== "gray")],
    [fontScaleKey, "data-font-scale", FONT_SCALES.filter((scale) => scale !== "default")],
  ];
  return `(function(){try{var d=document.documentElement,s=localStorage;${entries
    .map(
      ([key, attribute, values]) =>
        `var v=s.getItem(${JSON.stringify(key)});if(${JSON.stringify(values)}.indexOf(v)>-1)d.setAttribute(${JSON.stringify(attribute)},v);`
    )
    .join("")}}catch(e){}})();`;
}
