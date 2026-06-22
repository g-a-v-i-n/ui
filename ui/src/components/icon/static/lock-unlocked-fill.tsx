import { IconWrapper } from "../icon-wrapper";
import type { IconProps } from "../types";

export const LockUnlockedFill = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <rect x="3" y="7" width="12" height="9" rx="2" fill="currentColor" />
      <path d="M6 5C6 3.34315 7.34315 2 9 2C10.6569 2 12 3.34315 12 5L12 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </IconWrapper>
  );
};
