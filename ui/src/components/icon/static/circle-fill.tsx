import { IconWrapper } from "../icon-wrapper";
import type { IconProps } from "../types";

export const CircleFill = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <circle cx="9" cy="9" r="7" fill="currentColor" />
    </IconWrapper>
  );
};
