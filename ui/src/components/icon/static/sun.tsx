import { IconWrapper } from "../icon-wrapper";
import type { IconProps } from "../types";

export const Sun = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 2.51538V3.95641" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4.41468 4.41473L5.43364 5.43369" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15.4846 9L14.0436 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13.5853 4.41473L12.5664 5.43369" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 14.0436V15.4846" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12.5664 12.5663L13.5853 13.5853" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3.95641 9L2.51538 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5.43364 12.5663L4.41468 13.5853" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </IconWrapper>
  );
};
