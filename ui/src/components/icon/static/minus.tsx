import { IconWrapper } from "../icon-wrapper";
import type { IconProps } from "../types";

export const MinusIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <path d="M3 9L15 9" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </IconWrapper>
  );
};
