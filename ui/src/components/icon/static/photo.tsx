import { IconWrapper } from "../icon-wrapper";
import type { IconProps } from "../types";

export const Photo = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <rect x="2.75" y="3.75" width="12.5" height="10.5" rx="1.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11.7543 9.44288L15 13.5V14H3V13.5L5.29723 10.8199C5.67632 10.3776 6.35169 10.3517 6.76359 10.7636L8 12L10.2142 9.41679C10.6222 8.94075 11.3626 8.95329 11.7543 9.44288Z" fill="currentColor" />
      <circle cx="7" cy="7" r="1.5" fill="currentColor" />
    </IconWrapper>
  );
};
