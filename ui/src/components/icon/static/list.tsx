import { IconWrapper } from "../icon-wrapper";
import type { IconProps } from "../types";

export const List = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <path d="M7 9L15 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 4H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 14L15 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="3.5" cy="9" r="1.5" transform="rotate(-90 3.5 9)" fill="currentColor" />
      <circle cx="3.5" cy="4" r="1.5" transform="rotate(-90 3.5 4)" fill="currentColor" />
      <circle cx="3.5" cy="14" r="1.5" transform="rotate(-90 3.5 14)" fill="currentColor" />
    </IconWrapper>
  );
};
