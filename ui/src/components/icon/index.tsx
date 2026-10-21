/**
 * The icon set as named components — `import { CheckIcon } from "ui/components/icon"`.
 * Each glyph is its own module, so a consumer's bundle carries only the icons
 * it renders. Every icon takes `IconProps` (size, aria-*, className, style).
 *
 * To pick an icon by name at runtime (`<Icon icon="check" />`, `iconNames`),
 * import from `ui/components/icon/registry` instead; that entry references
 * every glyph by nature, so it is kept out of this one.
 */
export type { IconProps, IconWrapperProps, IconSize } from "./types";
export { IconWrapper } from "./icon-wrapper";
export * from "./names";
