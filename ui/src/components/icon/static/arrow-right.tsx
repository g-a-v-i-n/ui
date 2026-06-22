import { IconWrapper } from "../icon-wrapper";
import type { IconProps } from "../types";

export const ArrowRight = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <path d="M10.5 4.5L15.5 9.5L10.5 14.5M15.5 9.5H2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </IconWrapper>
  );
};
