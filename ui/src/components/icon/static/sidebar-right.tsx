import { IconWrapper } from "../icon-wrapper";
import type { IconProps } from "../types";

export const SidebarRight = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <rect x="2.75" y="3.75" width="12.5" height="10.5" rx="2.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 4V14" stroke="currentColor" strokeWidth="1.5" />
    </IconWrapper>
  );
};
