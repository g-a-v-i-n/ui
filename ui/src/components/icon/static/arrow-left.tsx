import { IconWrapper } from "../icon-wrapper";
import type { IconProps } from "../types";

export const ArrowLeft = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <path d="M7.5 14.5L2.5 9.5L7.5 4.5M2.5 9.5L15.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </IconWrapper>
  );
};
