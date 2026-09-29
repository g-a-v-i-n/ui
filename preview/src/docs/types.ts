import type { ReactNode } from 'react';

export type SelectControl = {
  type: 'select';
  options: readonly string[];
  default: string;
  label?: string;
};
export type SegmentedControl = {
  type: 'segmented';
  options: readonly string[];
  default: string;
  label?: string;
};
export type BooleanControl = { type: 'boolean'; default: boolean; label?: string };
export type TextControl = { type: 'text'; default: string; label?: string; placeholder?: string };
export type NumberControl = {
  type: 'number';
  default: number;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
};

export type ControlDef =
  | SelectControl
  | SegmentedControl
  | BooleanControl
  | TextControl
  | NumberControl;

export type Controls = Record<string, ControlDef>;

export type ControlValue<C extends ControlDef> = C extends { options: readonly (infer O)[] }
  ? O
  : C extends BooleanControl
    ? boolean
    : C extends TextControl
      ? string
      : C extends NumberControl
        ? number
        : never;

export type ControlValues<C extends Controls> = { [K in keyof C]: ControlValue<C[K]> };

/** A component page's hero: its controls and how to render the example from their values. */
export type Doc = {
  /** Display name and sidebar label. Defaults to the page file's name, spaced. */
  name?: string;
  description?: string;
  /** The `ui/components/<module>` folders the props tables come from. Defaults to the page slug. */
  modules?: string[];
  /** Exported components to show props for, in order. Defaults to every export of the module. */
  propsFor?: string[];
  controls: Controls;
  /* A method rather than a function property: method parameters are checked
     bivariantly, so a `render` typed to its own controls still fits here. */
  render(values: Record<string, unknown>): ReactNode;
};

export function defineDoc<const C extends Controls>(doc: {
  name?: string;
  description?: string;
  modules?: string[];
  propsFor?: string[];
  controls: C;
  render(values: ControlValues<C>): ReactNode;
}): Doc {
  return doc;
}

export function initialValues(controls: Controls): Record<string, unknown> {
  return Object.fromEntries(Object.entries(controls).map(([key, def]) => [key, def.default]));
}
