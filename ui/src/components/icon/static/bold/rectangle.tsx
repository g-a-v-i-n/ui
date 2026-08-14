import { IconWrapper } from "../../icon-wrapper";
import type { IconProps } from "../../types";

export const Rectangle = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <rect x="3" y="4" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="2" />
    </IconWrapper>
  );
};
