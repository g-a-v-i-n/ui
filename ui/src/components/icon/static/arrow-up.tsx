import { IconWrapper } from "../icon-wrapper";
import type { IconProps } from "../types";

export const ArrowUp = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <path d="M4 8L9 3L14 8M9 3L9 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </IconWrapper>
  );
};
