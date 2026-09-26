import { useEffect, useRef } from "react";

/* Gray tones from @radix-ui/colors. "gray" is the neutral default; the rest
   are tinted and swapped in for --gray-* by css/gray-tone.css via the
   data-gray attribute this component sets on <html>. */
export const GRAY_TONES = ["gray", "mauve", "slate", "sage", "olive", "sand"] as const;
export type GrayTone = (typeof GRAY_TONES)[number];

/* Apply a change to the root with color transitions suppressed (see
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

export function Theme({
  theme,
  gray = "gray",
  setResolvedTheme,
  children,
}: {
  theme: "light" | "dark" | "system";
  /** Which gray scale --gray-* resolves to. Defaults to the neutral gray. */
  gray?: GrayTone;
  setResolvedTheme: (theme: "light" | "dark") => void;
  children: React.ReactNode;
}) {
  // Latest callback for the media-query listener, so a new function identity
  // never re-runs the theme effect (and re-applies the theme) on its own.
  const setResolvedThemeRef = useRef(setResolvedTheme);
  useEffect(() => {
    setResolvedThemeRef.current = setResolvedTheme;
  });

  useEffect(() => {
    const root = document.documentElement;
    const applyTheme = (resolved: "light" | "dark") => {
      withoutTransitions(root, () => {
        root.classList.remove(resolved === "dark" ? "light" : "dark");
        root.classList.add(resolved);
      });
      setResolvedThemeRef.current(resolved);
    };

    if (theme === "light" || theme === "dark") {
      applyTheme(theme);
      return;
    }

    // System theme
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const setSystemTheme = (e?: MediaQueryListEvent) => {
      const matchesDarkMode = e ? e.matches : mediaQuery.matches;
      applyTheme(matchesDarkMode ? "dark" : "light");
    };

    setSystemTheme();
    mediaQuery.addEventListener("change", setSystemTheme);
    return () => {
      mediaQuery.removeEventListener("change", setSystemTheme);
    };
  }, [theme]);

  // The neutral gray is what --gray-* already is with no attribute, so only
  // the tinted tones leave a data-gray on the root.
  useEffect(() => {
    const root = document.documentElement;
    withoutTransitions(root, () => {
      if (gray === "gray") {
        root.removeAttribute("data-gray");
      } else {
        root.setAttribute("data-gray", gray);
      }
    });
  }, [gray]);

  return <>{children}</>;
}
