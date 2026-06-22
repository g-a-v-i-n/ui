import { IconWrapper } from "../icon-wrapper";
import type { IconProps } from "../types";

export const Pause = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <rect x="3.75" y="3.75" width="3.5" height="10.5" rx="1.25" stroke="currentColor" strokeWidth="1.5" />
      <rect x="10.75" y="3.75" width="3.5" height="10.5" rx="1.25" stroke="currentColor" strokeWidth="1.5" />
    </IconWrapper>
  );
};
