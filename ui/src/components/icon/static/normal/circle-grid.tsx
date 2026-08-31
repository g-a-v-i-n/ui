import { IconWrapper } from "../../icon-wrapper";
import type { IconProps } from "../../types";

export const CircleGrid = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <rect x="2" y="2" width="6" height="6" rx="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="2" y="10" width="6" height="6" rx="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="10" y="2" width="6" height="6" rx="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="10" y="10" width="6" height="6" rx="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </IconWrapper>
  );
};
