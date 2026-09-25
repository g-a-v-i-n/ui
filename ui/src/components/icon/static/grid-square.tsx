import { IconWrapper } from "../icon-wrapper";
import type { IconProps } from "../types";

export const GridSquare = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <rect x="2.75" y="2.75" width="12.5" height="12.5" rx="2.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.875 3V15M11.125 3V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 6.875L3 6.875M15 11.125L3 11.125" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </IconWrapper>
  );
};
