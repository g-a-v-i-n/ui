import { IconWrapper } from "../../icon-wrapper";
import type { IconProps } from "../../types";

export const LockLocked = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <rect x="4" y="8" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
      <path d="M6 8L6 5C6 3.34315 7.34315 2 9 2C10.6569 2 12 3.34315 12 5L12 8" stroke="currentColor" strokeWidth="2" />
    </IconWrapper>
  );
};
