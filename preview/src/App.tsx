import { useEffect, useRef, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router';
import {
  FONT_SCALES,
  GRAY_TONES,
  THEME_MODES,
  Theme,
  type FontScale,
  type GrayTone,
  type ThemeMode,
} from 'ui/components/theme';
import { TooltipProvider } from 'ui/components/tooltip';
import { ToastProvider, ToastViewport } from 'ui/components/toast';

import { TestDropdownMenuProvider } from './TestDropdownMenuProvider';
import { ComponentPage } from './docs/ComponentPage';
import { DocsSidebar } from './docs/DocsSidebar';
import { Overview } from './docs/Overview';
import { pages } from './docs/registry';
import styles from './docs/docs.module.css';

/* The three theme choices persist in localStorage under the keys the inline
   script in index.html reads, so a reload paints the saved theme before React
   runs (see themeInitScript in ui/components/theme). */
function usePersisted<T extends string>(key: string, values: readonly T[], fallback: T) {
  const [value, setValue] = useState<T>(() => {
    const saved = localStorage.getItem(key);
    return values.find((v) => v === saved) ?? fallback;
  });
  useEffect(() => {
    if (value === fallback) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  }, [key, value, fallback]);
  return [value, setValue] as const;
}

function App() {
  const [theme, setTheme] = usePersisted<ThemeMode>('theme', THEME_MODES, 'system');
  const [gray, setGray] = usePersisted<GrayTone>('gray', GRAY_TONES, 'gray');
  const [fontScale, setFontScale] = usePersisted<FontScale>('font-scale', FONT_SCALES, 'default');

  // The main column scrolls, not the window, so reset it on navigation.
  const mainRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  useEffect(() => {
    mainRef.current?.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Theme theme={theme} gray={gray} fontScale={fontScale}>
      <TooltipProvider delayDuration={200}>
        <ToastProvider swipeDirection="right">
          <TestDropdownMenuProvider>
            <div className={styles.shell}>
              <DocsSidebar
                theme={theme}
                onThemeChange={setTheme}
                gray={gray}
                onGrayChange={setGray}
                fontScale={fontScale}
                onFontScaleChange={setFontScale}
              />
              <main ref={mainRef} className={styles.main}>
                <Routes>
                  <Route path="/" element={<Overview />} />
                  {pages.map((page) => (
                    <Route key={page.path} path={page.path} element={<ComponentPage page={page} />} />
                  ))}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
            </div>
          </TestDropdownMenuProvider>
          <ToastViewport />
        </ToastProvider>
      </TooltipProvider>
    </Theme>
  );
}

export default App;
