import { IconWrapper } from "../icon-wrapper";
import type { IconProps } from "../types";

export const MagnifyingGlass = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <circle cx="8" cy="8" r="5.25" transform="rotate(180 8 8)" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14.1161 15.8839C14.6043 16.372 15.3957 16.372 15.8839 15.8839C16.372 15.3957 16.372 14.6043 15.8839 14.1161L15 15L14.1161 15.8839ZM12 12L11.1161 12.8839L14.1161 15.8839L15 15L15.8839 14.1161L12.8839 11.1161L12 12Z" fill="currentColor" />
    </IconWrapper>
  );
};
