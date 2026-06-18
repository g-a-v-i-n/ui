/**
 * Escape hatch: the raw Radix `radix-ui` primitives, re-exported so consumers
 * compose them against the SAME instance this library ships — avoiding a second
 * copy of `radix-ui` (which would break Radix's React-context wiring).
 *
 * This is the advanced path. Prefer the styled `ui/components/*` wrappers; reach
 * for these only when a wrapper doesn't expose what you need.
 *
 * Note: includes Radix's `unstable_*` exports (e.g. OneTimePasswordField) — they
 * are experimental and may change between Radix versions.
 *
 *   import { Dialog, Popover } from "ui/primitives";
 */
export * from "radix-ui";
