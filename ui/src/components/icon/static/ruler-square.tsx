import { IconWrapper } from "../icon-wrapper";
import type { IconProps } from "../types";

export const RulerSquare = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <rect x="2.75" y="2.75" width="12.5" height="12.5" rx="2.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 7L3 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 15L7 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </IconWrapper>
  );
};
