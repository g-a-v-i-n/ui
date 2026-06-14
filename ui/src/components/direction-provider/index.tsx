import { Direction as DirectionPrimitive } from "radix-ui";

type Direction = "ltr" | "rtl";

export const DirectionProvider = ({
  dir,
  children,
}: {
  dir: Direction;
  children?: React.ReactNode;
}) => (
  <DirectionPrimitive.Provider dir={dir}>{children}</DirectionPrimitive.Provider>
);

export const useDirection: (localDir?: Direction) => Direction =
  DirectionPrimitive.useDirection;
