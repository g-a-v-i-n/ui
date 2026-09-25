import { IconWrapper } from "../icon-wrapper";
import type { IconProps } from "../types";

export const PauseFill = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <rect x="3" y="3" width="5" height="12" rx="2" fill="currentColor" />
      <rect x="10" y="3" width="5" height="12" rx="2" fill="currentColor" />
    </IconWrapper>
  );
};
