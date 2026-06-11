import { Slot as SlotPrimitive } from "radix-ui";

export const Slot = SlotPrimitive.Root;
export const Slottable: React.FC<{ children: React.ReactNode }> =
  SlotPrimitive.Slottable;
export type SlotProps = SlotPrimitive.SlotProps;
