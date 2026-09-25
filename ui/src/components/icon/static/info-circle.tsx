import { IconWrapper } from "../icon-wrapper";
import type { IconProps } from "../types";

export const InfoCircle = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <circle cx="9" cy="9" r="6.25" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="1" cy="1" r="0.5" transform="matrix(0 1 1 0 8 5)" fill="currentColor" stroke="currentColor" />
      <path d="M9 12V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </IconWrapper>
  );
};
