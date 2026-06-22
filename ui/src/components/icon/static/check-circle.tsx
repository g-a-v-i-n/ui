import { IconWrapper } from "../icon-wrapper";
import type { IconProps } from "../types";

export const CheckCircle = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <path d="M7 9.22222L8.4 11L11 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="9" r="6.25" stroke="currentColor" strokeWidth="1.5" />
    </IconWrapper>
  );
};
