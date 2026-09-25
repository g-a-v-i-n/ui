import { IconWrapper } from "../icon-wrapper";
import type { IconProps } from "../types";

export const ArrowDown = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <path d="M14 11L9 16L4 11M9 16V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </IconWrapper>
  );
};
