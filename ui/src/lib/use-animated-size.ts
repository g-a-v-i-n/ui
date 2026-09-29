import { useCallback, type RefCallback } from "react";
import { animate } from "motion/react";

type Size = { width: number; height: number };

const transition = {
  duration: 0.18,
  ease: [0.25, 0.46, 0.45, 0.94] as const,
};

/**
 * Tween a wrapper between its content's sizes. Render the returned ref on an
 * inner element that sits in a plain wrapper div:
 *
 *   <div><div ref={inner}>{children}</div></div>
 *
 * Both stay `auto`-sized until the inner's layout box changes (content
 * swapped, text reflowed, a section expanded). The wrapper is then pinned at
 * the old size and animated to the new one while the inner is held at its
 * final width so nothing reflows mid-flight; afterwards both release back to
 * `auto`, so shrink-to-fit widths and explicit sizes set on the surrounding
 * surface behave exactly as if the wrappers weren't there. Sizes are read
 * from layout boxes, not bounding rects, so a scale transform on the surface
 * (the dialog enter animation) doesn't skew them. Reduced motion snaps.
 *
 * A callback ref rather than an effect: dialog content mounts and unmounts
 * with the open state, long after the component holding the hook rendered.
 */
export function useAnimatedSize(): RefCallback<HTMLElement> {
  return useCallback((content: HTMLElement | null) => {
    const box = content?.parentElement;
    if (!content || !box) return;

    let last: Size | undefined;
    let running: ReturnType<typeof animate> | undefined;

    const release = () => {
      running = undefined;
      box.style.width = "";
      box.style.height = "";
      box.style.overflow = "";
      content.style.width = "";
    };

    const observer = new ResizeObserver(([entry]) => {
      const border = entry.borderBoxSize?.[0];
      const next: Size = border
        ? { width: border.inlineSize, height: border.blockSize }
        : { width: content.offsetWidth, height: content.offsetHeight };
      // Interrupted mid-flight, continue from wherever the box is now.
      const from = running ? { width: box.offsetWidth, height: box.offsetHeight } : last;
      last = next;
      if (!from || (from.width === next.width && from.height === next.height)) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      running?.stop();
      content.style.width = `${next.width}px`;
      box.style.overflow = "hidden";
      box.style.width = `${from.width}px`;
      box.style.height = `${from.height}px`;
      const controls = animate(box, { width: next.width, height: next.height }, transition);
      running = controls;
      controls.then(() => {
        if (running === controls) release();
      });
    });
    observer.observe(content);

    return () => {
      observer.disconnect();
      running?.stop();
      release();
    };
  }, []);
}
