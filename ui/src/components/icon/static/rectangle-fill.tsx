import { IconWrapper } from "../icon-wrapper";
import type { IconProps } from "../types";

export const RectangleFillIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <rect x="2" y="3" width="14" height="12" rx="3" fill="currentColor" />
    </IconWrapper>
  );
};
