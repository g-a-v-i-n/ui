import { IconWrapper } from "../icon-wrapper";
import type { IconProps } from "../types";

export const InfoCircleXmark = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <circle cx="9" cy="9" r="6.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 7L10.9999 10.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.00014 10.9998L11 6.99996" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </IconWrapper>
  );
};
