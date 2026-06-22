import { IconWrapper } from "../icon-wrapper";
import type { IconProps } from "../types";

export const RectangleFill = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <rect x="2" y="3" width="14" height="12" rx="2" fill="currentColor" />
    </IconWrapper>
  );
};
