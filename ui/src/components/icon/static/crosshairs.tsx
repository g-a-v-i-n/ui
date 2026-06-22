import { IconWrapper } from "../icon-wrapper";
import type { IconProps } from "../types";

export const Crosshairs = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <path d="M9 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 9L12 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 12V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 9L2 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="9" r="5.25" stroke="currentColor" strokeWidth="1.5" />
    </IconWrapper>
  );
};
