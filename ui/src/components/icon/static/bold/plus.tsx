import { IconWrapper } from "../../icon-wrapper";
import type { IconProps } from "../../types";

export const Plus = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <path d="M9 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 9L15 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </IconWrapper>
  );
};
