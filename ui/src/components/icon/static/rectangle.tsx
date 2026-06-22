import { IconWrapper } from "../icon-wrapper";
import type { IconProps } from "../types";

export const Rectangle = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <rect x="2.75" y="3.75" width="12.5" height="10.5" rx="1.25" stroke="currentColor" strokeWidth="1.5" />
    </IconWrapper>
  );
};
