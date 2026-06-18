import React from "react";
import { SFSymbol } from "../sf-symbol";
import styles from "./styles.module.css";

type CarouselProps = {
  /** Each direct child is one slide. */
  children: React.ReactNode;
  /** Loop seamlessly past the last/first slide. */
  infinite?: boolean;
  /** Show an Instagram-style row of dots below the slides. */
  dots?: boolean;
  /** Show prev/next arrow buttons. */
  arrows?: boolean;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
};

// Swipe must travel this fraction of the viewport width to advance a slide.
const SWIPE_THRESHOLD = 0.2;

export const Carousel = ({
  children,
  infinite = false,
  dots = false,
  arrows = true,
  className = "",
  ref,
}: CarouselProps) => {
  const real = React.Children.toArray(children);
  const count = real.length;
  const loop = infinite && count > 1;

  // For infinite, sandwich clones of the last/first slide so a step past either
  // end animates smoothly, then we jump (no transition) back to the real slide.
  const slides = loop ? [real[count - 1], ...real, real[0]] : real;
  const startIndex = loop ? 1 : 0;

  const [index, setIndex] = React.useState(startIndex);
  const [animate, setAnimate] = React.useState(true); // false only during the clone jump
  const [dragging, setDragging] = React.useState(false);
  const [dragPct, setDragPct] = React.useState(0);

  const viewportRef = React.useRef<HTMLDivElement>(null);
  const dragStart = React.useRef<{ x: number; width: number } | null>(null);
  // Ignore new moves while one is in flight, so fast clicks can't outrun the
  // transition and skip past the clones into empty space.
  const animating = React.useRef(false);

  const realIndex = loop ? (index - 1 + count) % count : index;

  // A move always animates; the clone-jump (below) turns animation off so the
  // reposition is instant, and it stays off — harmlessly, since nothing moves —
  // until the next move turns it back on.
  const go = (target: number) => {
    if (animating.current) return;
    const t = loop ? target : Math.max(0, Math.min(target, count - 1));
    if (t === index) return; // no-op move — don't arm the guard
    animating.current = true;
    setAnimate(true);
    setIndex(t);
  };
  const next = () => go(index + 1);
  const prev = () => go(index - 1);
  const goTo = (r: number) => go(loop ? r + 1 : r);

  // After sliding onto a clone, jump (no transition) to the matching real slide.
  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (e.target !== e.currentTarget) return; // ignore bubbled slide transitions
    if (loop && index === 0) {
      setAnimate(false);
      setIndex(count);
    } else if (loop && index === count + 1) {
      setAnimate(false);
      setIndex(1);
    }
    animating.current = false;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const width = viewportRef.current?.offsetWidth ?? 1;
    dragStart.current = { x: e.clientX, width };
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragStart.current) return;
    const { x, width } = dragStart.current;
    setDragPct(((e.clientX - x) / width) * 100);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragStart.current) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    const moved = dragPct / 100;
    dragStart.current = null;
    setDragging(false);
    setDragPct(0);
    if (moved <= -SWIPE_THRESHOLD) next();
    else if (moved >= SWIPE_THRESHOLD) prev();
  };

  const atStart = !loop && index === 0;
  const atEnd = !loop && index === count - 1;

  return (
    <div
      ref={ref}
      className={`${styles.root} ${className}`}
      role="region"
      aria-roledescription="carousel"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") prev();
        else if (e.key === "ArrowRight") next();
      }}
    >
      <div className={styles.viewport} ref={viewportRef}>
        <div
          className={styles.track}
          style={{
            transform: `translateX(calc(${-index * 100}% + ${dragPct}%))`,
            transition: dragging || !animate ? "none" : undefined,
          }}
          onTransitionEnd={handleTransitionEnd}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className={styles.slide}
              aria-hidden={i !== index}
            >
              {slide}
            </div>
          ))}
        </div>

        {arrows && count > 1 && (
          <>
            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowPrev}`}
              aria-label="Previous slide"
              onClick={prev}
              disabled={atStart}
            >
              <SFSymbol symbol="􀆉" size="sm" weight="semibold" />
            </button>
            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowNext}`}
              aria-label="Next slide"
              onClick={next}
              disabled={atEnd}
            >
              <SFSymbol symbol="􀆊" size="sm" weight="semibold" />
            </button>
          </>
        )}
      </div>

      {dots && count > 1 && (
        <div className={styles.dots} role="tablist" aria-label="Slides">
          {real.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === realIndex}
              aria-label={`Go to slide ${i + 1}`}
              className={styles.dot}
              data-active={i === realIndex || undefined}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
