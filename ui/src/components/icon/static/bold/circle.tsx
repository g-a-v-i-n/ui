import { IconWrapper } from "../../icon-wrapper";
import type { IconProps } from "../../types";

export const Circle = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2" />
    </IconWrapper>
  );
};
