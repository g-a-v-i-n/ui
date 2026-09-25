import { IconWrapper } from "../icon-wrapper";
import type { IconProps } from "../types";

export const SliderHorizontal = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <path d="M7.5 13L13 13M5 5L10.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="13" cy="5" r="2.25" transform="rotate(-90 13 5)" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="5" cy="13" r="2.25" transform="rotate(-90 5 13)" stroke="currentColor" strokeWidth="1.5" />
    </IconWrapper>
  );
};
