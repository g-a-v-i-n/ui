import { IconWrapper } from "../../icon-wrapper";
import type { IconProps } from "../../types";

export const SliderVertical = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <path d="M5 7.5V13M13 5V10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="13" cy="13" r="2" stroke="currentColor" strokeWidth="2" />
      <circle cx="5" cy="5" r="2" stroke="currentColor" strokeWidth="2" />
    </IconWrapper>
  );
};
