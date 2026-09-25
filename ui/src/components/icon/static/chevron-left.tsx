import { IconWrapper } from "../icon-wrapper";
import type { IconProps } from "../types";

export const ChevronLeft = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <path d="M11 15L5.35355 9.35355C5.15829 9.15829 5.15829 8.84171 5.35355 8.64645L11 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </IconWrapper>
  );
};
