import { useEffect } from "react";

export function Theme({
  theme,
  setResolvedTheme,
  children,
}: {
  theme: "light" | "dark" | "system";
  setResolvedTheme: (theme: "light" | "dark") => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "light") {
      root.classList.remove("dark");
      root.classList.add("light");
      setResolvedTheme("light");
    } else if (theme === "dark") {
      root.classList.remove("light");
      root.classList.add("dark");
      setResolvedTheme("dark");
    } else {
      // System theme
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const setSystemTheme = (e?: MediaQueryListEvent) => {
        const matchesDarkMode = e ? e.matches : mediaQuery.matches;
        if (matchesDarkMode) {
          root.classList.remove("light");
          root.classList.add("dark");
          setResolvedTheme("dark");
        } else {
          root.classList.remove("dark");
          root.classList.add("light");
          setResolvedTheme("light");
        }
      };

      setSystemTheme();
      mediaQuery.addEventListener("change", setSystemTheme);

      return () => {
        mediaQuery.removeEventListener("change", setSystemTheme);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);
  return <>{children}</>;
}
