import { IconWrapper } from "../icon-wrapper";
import type { IconProps } from "../types";

export const Check = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <path d="M4.5 9.5L8 13.5L14.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </IconWrapper>
  );
};
