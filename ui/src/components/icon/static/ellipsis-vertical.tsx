import { IconWrapper } from "../icon-wrapper";
import type { IconProps } from "../types";

export const EllipsisVertical = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <circle cx="9" cy="9" r="1.5" transform="rotate(-90 9 9)" fill="currentColor" />
      <circle cx="9" cy="4" r="1.5" transform="rotate(-90 9 4)" fill="currentColor" />
      <circle cx="9" cy="14" r="1.5" transform="rotate(-90 9 14)" fill="currentColor" />
    </IconWrapper>
  );
};
