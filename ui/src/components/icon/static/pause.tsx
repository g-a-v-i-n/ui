import { IconWrapper } from "../icon-wrapper";
import type { IconProps } from "../types";

export const Pause = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <rect x="3.875" y="3.875" width="3.25" height="10.25" rx="1.125" stroke="currentColor" strokeWidth="1.75" />
      <rect x="10.875" y="3.875" width="3.25" height="10.25" rx="1.125" stroke="currentColor" strokeWidth="1.75" />
    </IconWrapper>
  );
};
