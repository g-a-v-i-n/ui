import { IconWrapper } from "../icon-wrapper";
import type { IconProps } from "../types";

export const Circle = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <circle cx="9" cy="9" r="6.125" stroke="currentColor" strokeWidth="1.75" />
    </IconWrapper>
  );
};
