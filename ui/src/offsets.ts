/**
 * Global offsets (in px) between a floating element and its trigger/anchor,
 * passed to Radix's `sideOffset`. Centralized here so spacing stays consistent
 * across the library and can be tuned in one place.
 */

/** Tooltips sit close to their trigger. */
export const TOOLTIP_OFFSET = 2;

/** Popovers. */
export const POPOVER_OFFSET = 3;

/**
 * Menus. Used by `DropdownMenu` and the `Toolbar` split-button dropdown
 * (which inherits the `DropdownMenu` default).
 */
export const MENU_OFFSET = 4;
