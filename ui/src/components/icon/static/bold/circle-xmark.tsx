import { IconWrapper } from "../../icon-wrapper";
import type { IconProps } from "../../types";

export const CircleXmark = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2" />
      <path d="M7 7L10.9999 10.9999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.00014 10.9998L11 6.99999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </IconWrapper>
  );
};
