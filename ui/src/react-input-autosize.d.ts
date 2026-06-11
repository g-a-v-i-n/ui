declare module "react-input-autosize" {
  import { Component, CSSProperties, InputHTMLAttributes } from "react";

  export interface AutosizeInputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "ref"> {
    inputClassName?: string;
    inputId?: string;
    inputRef?: (ref: HTMLInputElement | null) => void;
    inputStyle?: CSSProperties;
    minWidth?: number | string;
    onAutosize?: (newWidth: number) => void;
    placeholderIsMinWidth?: boolean;
    extraWidth?: number | string;
    injectStyles?: boolean;
  }

  export default class AutosizeInput extends Component<AutosizeInputProps> {}
}
