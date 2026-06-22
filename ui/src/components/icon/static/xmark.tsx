import { IconWrapper } from "../icon-wrapper";
import type { IconProps } from "../types";

export const Xmark = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <path d="M4.75747 4.75722L13.2427 13.2425" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.75747 13.2425L13.2427 4.75723" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </IconWrapper>
  );
};
