import type { MouseEvent } from 'react';
import { useLocation, useNavigate } from 'react-router';

/* Props for a plain anchor that navigates client-side on an ordinary click
   but still behaves as a real link (new-tab modifiers, middle click, copy). */
export function useLinkProps(path: string) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return {
    href: path,
    active: pathname === path,
    onClick: (event: MouseEvent<HTMLElement>) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      navigate(path);
    },
  };
}
