import { useEffect, useRef, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router';
import { Theme, type GrayTone } from 'ui/components/theme';
import { TooltipProvider } from 'ui/components/tooltip';
import { ToastProvider, ToastViewport } from 'ui/components/toast';

import { TestDropdownMenuProvider } from './TestDropdownMenuProvider';
import { ComponentPage } from './docs/ComponentPage';
import { DocsSidebar } from './docs/DocsSidebar';
import { Overview } from './docs/Overview';
import { pages } from './docs/registry';
import styles from './docs/docs.module.css';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [gray, setGray] = useState<GrayTone>('gray');

  // The main column scrolls, not the window, so reset it on navigation.
  const mainRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  useEffect(() => {
    mainRef.current?.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Theme theme={theme} gray={gray} setResolvedTheme={setResolvedTheme}>
      <TooltipProvider delayDuration={200}>
        <ToastProvider swipeDirection="right">
          <TestDropdownMenuProvider>
            <div className={styles.shell}>
              <DocsSidebar
                theme={theme}
                onThemeChange={setTheme}
                resolvedTheme={resolvedTheme}
                gray={gray}
                onGrayChange={setGray}
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
