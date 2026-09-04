import { useEffect, useRef } from "react";

export function Theme({
  theme,
  setResolvedTheme,
  children,
}: {
  theme: "light" | "dark" | "system";
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
    const setResolved = (resolved: "light" | "dark") =>
      setResolvedThemeRef.current(resolved);

    if (theme === "light") {
      root.classList.remove("dark");
      root.classList.add("light");
      setResolved("light");
    } else if (theme === "dark") {
      root.classList.remove("light");
      root.classList.add("dark");
      setResolved("dark");
    } else {
      // System theme
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const setSystemTheme = (e?: MediaQueryListEvent) => {
        const matchesDarkMode = e ? e.matches : mediaQuery.matches;
        if (matchesDarkMode) {
          root.classList.remove("light");
          root.classList.add("dark");
          setResolved("dark");
        } else {
          root.classList.remove("dark");
          root.classList.add("light");
          setResolved("light");
        }
      };

      setSystemTheme();
      mediaQuery.addEventListener("change", setSystemTheme);

      return () => {
        mediaQuery.removeEventListener("change", setSystemTheme);
      };
    }
  }, [theme]);
  return <>{children}</>;
}
