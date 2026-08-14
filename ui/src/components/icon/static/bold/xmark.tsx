import { IconWrapper } from "../../icon-wrapper";
import type { IconProps } from "../../types";

export const Xmark = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <path d="M4.75747 4.75723L13.2427 13.2425" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.75747 13.2425L13.2427 4.75721" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </IconWrapper>
  );
};
