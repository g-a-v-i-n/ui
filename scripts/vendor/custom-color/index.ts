/**
 * Run every custom-color scale script — each writes its own one-color file(s)
 * to ui/src/css/custom/. Add an import line here when adding a new script.
 *
 * Run all: pnpm generate-custom-colors
 * Run one: node scripts/vendor/custom-color/<script>.ts
 */
import "./gray.ts";
import "./color.ts";
