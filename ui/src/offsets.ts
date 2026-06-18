/**
 * Global offsets (in px) between a floating element and its trigger/anchor,
 * passed to Radix's `sideOffset`. Centralized here so spacing stays consistent
 * across the library and can be tuned in one place.
 */

/** Tooltips sit close to their trigger. */
export const TOOLTIP_OFFSET = 4;

/**
 * Menus & popovers. Shared by `Popover`, `DropdownMenu`, and the `Toolbar`
 * split-button dropdown (which inherits the `DropdownMenu` default).
 */
export const POPOVER_OFFSET = 8;
