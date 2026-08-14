import { IconWrapper } from "../../icon-wrapper";
import type { IconProps } from "../../types";

export const Pause = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <rect x="4" y="4" width="3" height="10" rx="1" stroke="currentColor" strokeWidth="2" />
      <rect x="11" y="4" width="3" height="10" rx="1" stroke="currentColor" strokeWidth="2" />
    </IconWrapper>
  );
};
