import { IconWrapper } from "../icon-wrapper";
import type { IconProps } from "../types";

export const EllipsisHorizontal = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <circle cx="9" cy="9" r="1.5" fill="currentColor" />
      <circle cx="14" cy="9" r="1.5" fill="currentColor" />
      <circle cx="4" cy="9" r="1.5" fill="currentColor" />
    </IconWrapper>
  );
};
